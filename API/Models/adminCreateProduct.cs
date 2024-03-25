using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class adminCreateProduct
    {
        public string productName { get; set; }
        public decimal price { get; set; }
        public string productDescription { get; set; }
        public int numberOfProduct { get; set; }
        public int productBrandID { get; set; }
        public int productTypeID { get; set; }
        public List<string> urls { get; set; }
    }
}