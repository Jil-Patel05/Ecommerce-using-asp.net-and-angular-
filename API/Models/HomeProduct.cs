using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class HomeProduct
    {
        public int productID { get; set; }
        public string productName { get; set; }
        public decimal price { get; set; }
        public int noOfReviews { get; set; }
        public decimal productRating { get; set; }
        public string? productUrl{ get; set; }
    }
}