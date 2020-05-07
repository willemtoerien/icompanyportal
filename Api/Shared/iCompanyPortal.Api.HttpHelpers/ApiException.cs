using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;

namespace iCompanyPortal.Api.HttpHelpers
{
    public class ApiException : Exception
    {
        public HttpResponseMessage Response { get; }

        public ApiException(HttpResponseMessage response)
        {
            Response = response;
        }
    }
}
