using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.Interfaces;
using API.Models;
using StackExchange.Redis;

namespace API.Repository
{
    public class BasketRepository : IBasketRepository
    {
        private readonly IDatabase _database;
        public BasketRepository(IConnectionMultiplexer redis)
        {
            _database = redis.GetDatabase();
        }
        public async Task<bool> deleteBasketAsync(string basketID)
        {
            return await _database.KeyDeleteAsync(basketID);
        }

        public async Task<CustomerBasket> getBasketAsync(string basketID)
        {
            var data = await _database.StringGetAsync(basketID);

            return data.IsNullOrEmpty ? null : JsonSerializer.Deserialize<CustomerBasket>(data);
        }

        public async Task<CustomerBasket> updateBasketAsync(CustomerBasket basket)
        {
            Console.WriteLine(basket);
            var data = await _database.StringSetAsync(basket.Id, JsonSerializer.Serialize(basket), TimeSpan.FromDays(30));
            
            if (!data) return null;

            return await getBasketAsync(basket.Id);
        }
    }
}