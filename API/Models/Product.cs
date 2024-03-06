using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class Product
    {
        [Required]
        public int productID { get; set; }
        [Required]
        [MaxLength(100)]
        public string ProductName { get; set; }
        [Required]
        [MaxLength(200)]
        public string productDescription { get; set; }
        [Required]
        public decimal price { get; set; }
        public List<string>? productUrl { get; set; }
        [Required]
        public string typeName { get; set; }
        [Required]
        public int productTypeID{ get; set; }
        [Required]
        public string brandName { get; set; }
        [Required]
        public int productBrandID{ get; set; }

    }
    
}