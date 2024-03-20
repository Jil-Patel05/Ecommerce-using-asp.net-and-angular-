using System.Runtime.Serialization;

namespace API.enums
{
    public enum status
    {
        [EnumMember(Value ="pending")]
        Pending,
        [EnumMember(Value ="Shipped")]
        Shipped,
        [EnumMember(Value ="paymentRecieved")]
        PaymentRecieved,
        [EnumMember(Value ="paymentfailed")]
        Paymentfailed,
        [EnumMember(Value ="Delivered")]
        Delivered
    }
}