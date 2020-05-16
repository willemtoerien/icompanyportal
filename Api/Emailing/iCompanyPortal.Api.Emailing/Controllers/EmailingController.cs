﻿using iCompanyPortal.Api.Emailing.Client;
using iCompanyPortal.Api.Emailing.Services;
using iCompanyPortal.Api.Shared.Filters;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iCompanyPortal.Api.Emailing.Controllers
{
    [Route("")]
    public class EmailingController : ControllerBase
    {
        private readonly EmailSender sender;

        public EmailingController(EmailSender sender)
        {
            this.sender = sender;
        }


        [HttpGet("is-alive")]
        public bool IsAlive() => true;

        [HttpPost]
        [ValidateModel]
        public async Task Send([FromBody] EmailRequest request)
        {
            await sender.SendAsync(request);
        }
    }
}
