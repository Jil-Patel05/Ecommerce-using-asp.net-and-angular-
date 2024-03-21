using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTO
{
    public class UserReview
    {
        [Required]
        public int productID { get; set; }
        [Required]
        public int userID { get; set; }
        [Required]
        public string userFullName { get; set; }
        [Required]
        public string userReview { get; set; }
        [Required]
        public decimal userRating { get; set; }

    }
}