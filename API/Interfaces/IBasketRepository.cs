using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;

namespace API.Interfaces
{
    public interface IBasketRepository
    {
        Task<CustomerBasket> getBasketAsync(string basketID);
        Task<CustomerBasket> updateBasketAsync(CustomerBasket basket);
        Task<bool> deleteBasketAsync(string basketID);

    }
}