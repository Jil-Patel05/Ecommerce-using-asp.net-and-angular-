using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTO
{
    public class UserOrderDTO
    {
        public int orderID { get; set; }
        public int productID { get; set; }
        public string productUrl { get; set; }
        public string productName { get; set; }
        public decimal price { get; set; }
        public int numberOfProduct { get; set; }
        public string orderStatus { get; set; }
         public decimal subTotal { get; set; }
         public decimal shippingCost { get; set; }
        public decimal total { get; set; }

    }
}