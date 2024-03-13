using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class user
    {
        [Required]
        [MinLength(2)]
        public string firstName { get; set; }
        [Required]
        [MinLength(2)]
        public string lastName { get; set; }
        [Required]
        public long mobileNumber { get; set; }
        [Required]
        [EmailAddress]
        public string email { get; set; }
        [Required]
        [MinLength(8)]
        public string password { get; set; }
        [Compare("password")]
        public string Confirmpassword { get; set; }
        public string? role { get; set; }
    }
}