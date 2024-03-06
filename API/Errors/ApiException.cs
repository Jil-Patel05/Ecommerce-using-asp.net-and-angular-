using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Errors
{
    public class ApiException : ApiResponses
    {
        public ApiException(int statusCode, string? errorMessagge = null,string details=null) : base(statusCode, errorMessagge)
        {
            this.details = details;
        }

        public string details { get; set; }
    }
}