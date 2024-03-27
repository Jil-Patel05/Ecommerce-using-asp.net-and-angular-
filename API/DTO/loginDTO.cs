using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTO
{
    public class loginDTO
    {
        public int userID { get; set; }
        public string role { get; set; }
        public string DisplayName { get; set; }
        public string email { get; set; }
        public string token { get; set; }
    }
}