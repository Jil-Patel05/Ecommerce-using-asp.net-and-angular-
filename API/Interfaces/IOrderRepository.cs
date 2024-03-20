using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;
using API.Models;

namespace API.Interfaces
{
    public interface IOrderRepository
    {
        public Task<UserOrder> createOrderAsync(order order);
        public Task<List<singleUserOrderDTO>> getOrdersByUserAsync(int userID);
        public Task<List<UserOrderDTO>> getOrdersByOrderIDAsync(int orderID);
        public Task<List<Delivery>> getDeliveryMethodsAsync();
        
    }
}