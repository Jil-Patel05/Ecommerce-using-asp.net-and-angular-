using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class EnumProductType
    {
        [Required]
        public int productTypeID { get; set; }
        [Required]
        [MaxLength(100)]
        public string typeName { get; set; }
    }
}