using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using API.enums;
using API.Models;

namespace API.DTO
{
    public class order
    {
        [Required]
        public int userID { get; set; }
        [Required]
        [EmailAddress]
        public string email { get; set; }
        [Required]
        public decimal subTotal { get; set; }

        public decimal shippingCost { get; set; }
        public decimal total { get; set; }

        public string orderStatus { get; set; } = GetEnumMemberAttrValue(status.Pending);

        private static string GetEnumMemberAttrValue<T>(T enumVal)
        {
            var enumType = typeof(T);
            var memInfo = enumType.GetMember(enumVal.ToString());
            var attr = memInfo.FirstOrDefault()?.GetCustomAttributes(false).OfType<EnumMemberAttribute>().FirstOrDefault();
            if (attr != null)
            {
                return attr.Value;
            }

            return null;
        }

        [Required]
        public int deliveryID { get; set; }
        [Required]
        public string paymentID { get; set; }
        public orderAddress orderAddress { get; set; }
        public List<orderProduct> orderProduct { get; set; }


    }
}