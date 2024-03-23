using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;
using API.Interfaces;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class OrderController : BaseController
    {
        private readonly IOrderRepository _order;
        public OrderController(IOrderRepository order)
        {
            this._order = order;
        }

        [HttpPost("/createOrder")]
        public async Task<ActionResult<UserOrder>> createOrderAsync(order order)
        {
            UserOrder cr = await _order.createOrderAsync(order);

            return Ok(cr);
        }
        [HttpGet("/OrdereByUserID")]
        public async Task<ActionResult<List<singleUserOrderDTO>>> getOrdersByUserAsync(int userID)
        {
            List<singleUserOrderDTO> uo = await _order.getOrdersByUserAsync(userID);

            return uo;
        }
        [HttpGet("/OrdereByOrderID")]
        public async Task<ActionResult<List<UserOrderDTO>>> getOrderByOrderIDAsync(int orderID)
        {
            List<UserOrderDTO> uo = await _order.getOrdersByOrderIDAsync(orderID);
            return uo;
        }
        [HttpGet("/DeliveryMethod")]
        public async Task<ActionResult<List<Delivery>>> getDeliveryMethodsAsync()
        {
            List<Delivery> d = await _order.getDeliveryMethodsAsync();

            return d;
        }

    }
}