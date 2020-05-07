using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iCompanyPortal.Api.Notifications.Hubs
{
    [Authorize]
    public class NotificationsHub : Hub
    {
    }
}
