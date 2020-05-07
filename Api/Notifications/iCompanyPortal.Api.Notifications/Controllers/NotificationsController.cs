using iCompanyPortal.Api.Notifications.Client;
using iCompanyPortal.Api.Notifications.Data;
using iCompanyPortal.Api.Notifications.Hubs;
using iCompanyPortal.Api.Users.Client;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iCompanyPortal.Api.Notifications.Controllers
{
    [Route("")]
    [Authorize]
    public class NotificationsController : ControllerBase
    {
        public const string UserDoesNotExist = "The user with id {0} does not exist.";

        private readonly NotificationsDbContext db;
        private readonly IHubContext<NotificationsHub> hub;
        private readonly IUsersClient usersClient;

        public NotificationsController(NotificationsDbContext db, IHubContext<NotificationsHub> hub, IUsersClient usersClient)
        {
            this.db = db;
            this.hub = hub;
            this.usersClient = usersClient;
        }

        [HttpGet("{pageSize}/{page}")]
        public async Task<IActionResult> Get(int pageSize, int page, [FromQuery] string search = "")
        {
            var userId = this.GetUserId();
            var notifications = await db.Notifications
                .Where(x => x.UserId == userId && (x.Subject.Contains(search) || x.Message.Contains(search)))
                .OrderByDescending(x => x.CreatedAt)
                .Skip(pageSize * page)
                .Take(pageSize)
                .ToArrayAsync();
            return Ok(notifications);
        }

        [HttpGet("count")]
        public async Task<IActionResult> GetCount()
        {
            var userId = this.GetUserId();
            return Ok(await db.Notifications.CountAsync(x => x.UserId == userId && !x.ReadAt.HasValue));
        }

        [HttpPost("{userId}")]
        public async Task<IActionResult> Notify(int userId, [FromBody] NotifyRequest request)
        {
            if (!await usersClient.DoesUserExistAsync(userId))
            {
                return BadRequest(string.Format(UserDoesNotExist, userId));
            }
            var notification = new Notification
            {
                CreatedAt = DateTime.Now,
                Message = request.Message,
                Subject = request.Subject,
                UserId = userId
            };
            db.Notifications.Add(notification);
            await db.SaveChangesAsync();

            var proxy = hub.Clients.User(userId.ToString());

            await proxy.SendAsync("notification", notification);

            return Ok(notification.NotificationId);
        }

        [HttpPut()]
        public async Task<IActionResult> MarkAllAsRead()
        {
            var userId = this.GetUserId();
            var notifications = await db.Notifications
                .Where(x => x.UserId == userId)
                .ToArrayAsync();
            foreach (var notification in notifications)
            {
                notification.ReadAt = DateTime.Now;
            }
            await db.SaveChangesAsync();
            return NoContent();
        }
    }
}
