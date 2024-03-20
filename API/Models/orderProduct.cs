using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class orderProduct
    {
        [Required]
        public int productID { get; set; }
        [Required]
        [MaxLength(100)]
        public string ProductName { get; set; }
        [Required]
        public decimal price { get; set; }
        [Required]
        public int numberOfProduct { get; set; }
        [Required]
        public string productUrl { get; set; }

    }
}