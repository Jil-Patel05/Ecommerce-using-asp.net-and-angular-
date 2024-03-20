using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTO
{
    public class singleUserOrderDTO
    {
        public int orderID { get; set; }
        public string orderStatus { get; set; }
        public int subTotal { get; set; }
    }
}