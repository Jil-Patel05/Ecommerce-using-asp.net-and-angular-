using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class orderAddress
    {
        [Required]
        [MinLength(2)]
        public string firstName { get; set; }
        [Required]
        [MinLength(2)]
        public string lastName { get; set; }
        [Required]
        [MinLength(2)]
        public string street { get; set; }
        [Required]
        [MinLength(2)]
        public string city { get; set; }
        [Required]
        [MinLength(2)]
        public string state { get; set; }
        [Required]
        public int zipCode { get; set; }
    }
}