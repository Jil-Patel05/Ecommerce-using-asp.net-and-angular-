using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class BasketItem
    {
         public int productID { get; set; }
        public string productName { get; set; }
        public decimal price { get; set; }

        public int numberOfProduct { get; set; }
        public string productUrl { get; set; }
        
        public string brandName { get; set; }
        public string typeName { get; set; }
    }
}