using System;
using System.Collections.Generic;
using System.Net;
using System.Text;

namespace iCompanyPortal.Api.HttpHelpers
{
    public class GetQuery
    {
        public int Page { get; set; }
        
        public int PageSize { get; set; }

        public string Search { get; set; }

        public string ToQueryParams()
        {
            var result = $"?page={Page}&PageSize={PageSize}";
            if (!string.IsNullOrWhiteSpace(Search))
            {
                result += $"&Search={WebUtility.UrlEncode(Search)}";
            }
            return result;
        }
    }
}
