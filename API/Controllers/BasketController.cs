using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;
using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BasketController : ControllerBase
    {
        private readonly IBasketRepository _basketRepository;
        public BasketController(IBasketRepository basketRepository)
        {
            _basketRepository = basketRepository;
        }

        [HttpGet]
        public async Task<ActionResult<CustomerBasket>> getBasket(string basketID)
        {
            var basket = await _basketRepository.getBasketAsync(basketID);
            return Ok(basket ?? new CustomerBasket(basketID));
        }

        [HttpPost]
        public async Task<ActionResult<CustomerBasket>> updateBasket(CustomerBasket basket)
        {
            var updatedBasktet = await _basketRepository.updateBasketAsync(basket);
            // Console.WriteLine(basket);
            return Ok(updatedBasktet);
        }

         [HttpDelete]
        public async Task DeleteBasket(string basketID)
        {
            await _basketRepository.deleteBasketAsync(basketID);
        }
    }
}