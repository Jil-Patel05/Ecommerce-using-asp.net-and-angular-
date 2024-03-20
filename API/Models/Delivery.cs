using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class Delivery
    {
        public string shortName { get; set; }
        public string deliveryTime { get; set; }
        public string description { get; set; }
        public decimal price { get; set; }

    }
}