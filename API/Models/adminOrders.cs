using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class adminOrders
    {
        public int orderID { get; set; }
        public decimal total { get; set; }
        public string orderStatus { get; set; }

    }
}