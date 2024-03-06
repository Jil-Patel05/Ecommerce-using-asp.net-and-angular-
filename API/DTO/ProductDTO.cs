using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTO
{
    public class ProductDTO
    {
        public int productID { get; set; }
        public string productName { get; set; }
        public string productDescription { get; set; }
        public decimal price { get; set; }
        public List<string>? productUrl { get; set; }
        public string typeName { get; set; }
        public string brandName { get; set; }
    }
}