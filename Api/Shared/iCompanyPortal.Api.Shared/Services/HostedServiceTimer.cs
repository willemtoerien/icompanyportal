using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace iCompanyPortal.Api.Shared.Services
{
    public abstract class HostedServiceTimer : IHostedService
    {
        private Timer timer;

        public IServiceScopeFactory ScopeFactory { get; }

        public HostedServiceTimer(IServiceScopeFactory scopeFactory)
        {
            ScopeFactory = scopeFactory;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            timer = new Timer(state => { OnIntervalAsync().GetAwaiter().GetResult(); }, null, TimeSpan.Zero, TimeSpan.FromDays(1));
            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            timer.Change(TimeSpan.Zero, TimeSpan.Zero);
            timer.Dispose();
            timer = null;
            return Task.CompletedTask;
        }

        public abstract Task OnIntervalAsync();
    }
}
