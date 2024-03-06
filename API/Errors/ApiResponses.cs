using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Errors
{
    public class ApiResponses
    {
        public ApiResponses(int statusCode,string? errorMessagge=null)
        {
            this.statusCode = statusCode;
            this.errorMessagge = errorMessagge ?? getDefaultMessage(statusCode);
        }

        public int statusCode { get; set; }
        public string errorMessagge { get; set; }
         private string? getDefaultMessage(int statusCode)
        {
            return statusCode switch
            {
                400 => "A bad request you have made",
                401 => "You are not authorized",
                404 => "Resource not found",
                500 => "Internal Error,please try again later",
                _ => null
            };
        }
    }
}