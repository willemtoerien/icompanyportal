using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace iCompanyPortal.Api.Shared.Data
{
    public abstract class EntityBuilder
    {
        public abstract Type Type { get; }

        public abstract void Build(EntityTypeBuilder builder);
    }
}
