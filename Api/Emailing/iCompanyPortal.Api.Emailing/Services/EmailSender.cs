using iCompanyPortal.Api.Emailing.Client;
using iCompanyPortal.Api.Emailing.Data;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace iCompanyPortal.Api.Emailing.Services
{
    public class EmailSender
    {
        private readonly IOptions<EmailSettings> options;
        private readonly EmailingDbContext db;
        private readonly ITemplator templator;

        public EmailSender(IOptions<EmailSettings> options, EmailingDbContext db, ITemplator templator)
        {
            this.options = options;
            this.db = db;
            this.templator = templator;
        }

        public async Task SendAsync(EmailRequest request)
        {
            var email = new Email
            {
                CreatedAt = DateTime.Now,
                Data = JsonConvert.SerializeObject(request.Data),
                Subject = request.Subject,
                TemplateKey = request.TemplateKey,
                To = request.To
            };
            db.Add(email);
            await SendAsync(email, request.Data);
        }

        public async Task SendAsync(Email email, Dictionary<string, string> data = null)
        {
            email.ErrorMessage = null;
            email.Body = await templator.CompileAsync(email.TemplateKey,
                data ?? JsonConvert.DeserializeObject<Dictionary<string, string>>(email.Data));

            try
            {
                if (options.Value.IsEnabled)
                {
                    using var smtpClient = new SmtpClient(options.Value.Host, options.Value.Port);
                    smtpClient.UseDefaultCredentials = false;
                    smtpClient.Credentials = new NetworkCredential(options.Value.UserName, options.Value.Password);
                    smtpClient.EnableSsl = options.Value.EnableSsl;
                    var message = new MailMessage(options.Value.From, email.To, email.Subject, email.Body);
                    await smtpClient.SendMailAsync(message);
                    email.SentAt = DateTime.Now;
                }
            }
            catch (Exception ex)
            {
                email.ErrorMessage = ex.Message;
                throw;
            }
            finally
            {
                await db.SaveChangesAsync();
            }
        }
    }
}
