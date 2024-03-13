using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTO
{
    public class reset
    {
        [Required]
        public int userID { get; set; }
        [Required]
        [MinLength(8)]
        public string password { get; set; }
        [Required]
        [MinLength(8)]
        public string nwPassword { get; set; }
        [Compare("nwPassword")]
        public string ConfirmNwPassword { get; set; }

    }
}