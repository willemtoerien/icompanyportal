using iCompanyPortal.Api.Emailing.Client;
using iCompanyPortal.Api.Emailing.Services;
using iCompanyPortal.Api.Shared.Filters;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iCompanyPortal.Api.Emailing.Controllers
{
    [Route("api/emailing")]
    public class EmailingController : ControllerBase
    {
        private readonly EmailSender sender;

        public EmailingController(EmailSender sender)
        {
            this.sender = sender;
        }

        [HttpPost]
        [ValidateModel]
        [SwaggerResponse(204, typeof(void))]
        public async Task Send([FromBody] EmailRequest request)
        {
            await sender.SendAsync(request);
        }
    }
}
