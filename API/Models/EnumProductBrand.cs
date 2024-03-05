using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class EnumProductBrand
    {
        [Required]
        public int productBrandID { get; set; }
        [Required]
        [MaxLength(100)]
        public string brandName { get; set; }
    }
}