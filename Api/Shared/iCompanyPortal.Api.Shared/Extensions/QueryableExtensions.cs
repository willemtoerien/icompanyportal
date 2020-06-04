using iCompanyPortal.Api.HttpHelpers;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace System.Collections.Generic
{
    public static class QueryableExtensions
    {
        public static IQueryable<T> InvokeGetQuery<T>(this IQueryable<T> query, GetQuery getQuery, Expression<Func<T, bool>> searchPredicate = null)
        {
            if (!string.IsNullOrWhiteSpace(getQuery.Search) && searchPredicate != null)
            {
                query = query.Where(searchPredicate);
            }
            return query
                .Skip(getQuery.PageSize * getQuery.Page)
                .Take(getQuery.PageSize);
        }
    }
}
