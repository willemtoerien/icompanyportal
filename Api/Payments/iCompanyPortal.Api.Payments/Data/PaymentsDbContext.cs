using iCompanyPortal.Api.Shared.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iCompanyPortal.Api.Payments.Data
{
    public class PaymentsDbContext : ProjectDbContext
    {
        public PaymentsDbContext(DbContextOptions options, IEnumerable<EntityBuilder> builders) : base(options, builders)
        {
        }
    }
}
