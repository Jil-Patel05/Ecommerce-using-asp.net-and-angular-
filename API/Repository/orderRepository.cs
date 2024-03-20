using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using API.DTO;
using API.Interfaces;
using API.Models;
using Dapper;
using MySql.Data.MySqlClient;

namespace API.Repository
{
    public class orderRepository : IOrderRepository
    {
        private readonly MySqlConnection _conn;
        private readonly IConfiguration _config;
        public orderRepository(MySqlConnection conn, IConfiguration config)
        {
            _conn = conn;
            _config = config;
        }


        public async Task<UserOrder> createOrderAsync(order order)
        {
            int orderId;
            string orderQuery = "insert into userorder(userID,email,subTotal,shippingCost,total,orderStatus,deliveryID)  values(@u,@e,@s,@sh,@t,@o,@d);select last_insert_id();";
            List<int> id = await _conn.QueryAsync<int>(orderQuery, new { u = order.userID, e = order.email, s = order.subTotal,sh=order.shippingCost,t=order.total,o = order.orderStatus, d = order.deliveryID }) as List<int>;
            orderId = id[0];

            string orderAddress = "insert into orderaddress(orderID,firstName,lastName,street,city,state,zipCode)  values(@a,@f,@l,@s,@c,@state,@z)";
            var af1 = await _conn.ExecuteAsync(orderAddress, new { a = orderId, f = order.orderAddress.firstName, l = order.orderAddress.lastName, s = order.orderAddress.street, c = order.orderAddress.city, state = order.orderAddress.state, z = order.orderAddress.zipCode });

            string orderProduct = "insert into orderProduct(orderID,productID,productName,price,numberOfProducts,productUrl) values(@a,@p,@pn,@pr,@nop,@pu)";

            List<Object> p = new List<object>();
            foreach (var a in order.orderProduct)
            {
                p.Add(new { a = orderId, p = a.productID, pn = a.ProductName, pr = a.price, nop = a.numberOfProduct, pu = a.productUrl });
            }
            var af2 = await _conn.ExecuteAsync(orderProduct, p);

            return new UserOrder()
            {
                orderID = orderId
            };
        }

        public async Task<List<singleUserOrderDTO>> getOrdersByUserAsync(int userID)
        {
            string userOrder = "select orderID,orderStatus,subTotal from userorder where userID=@uid";

            List<singleUserOrderDTO> uo = await _conn.QueryAsync<singleUserOrderDTO>(userOrder, new { uid = userID }) as List<singleUserOrderDTO>;
            return uo;
        }

        public async Task<List<UserOrderDTO>> getOrdersByOrderIDAsync(int orderID)
        {
            string userOrder = "select o.orderID,op.productID,op.productUrl,op.productName,op.price,op.numberOfProducts,o.subTotal,o.orderStatus,o.subTotal,o.shippingCost,o.total from userorder as o inner join orderproduct as op on o.orderID=op.orderID where o.orderID=@oid";

            List<UserOrderDTO> uo = await _conn.QueryAsync<UserOrderDTO>(userOrder, new { Oid = orderID }) as List<UserOrderDTO>;

            return uo;
        }

        public async Task<List<Delivery>> getDeliveryMethodsAsync()
        {
            string deliverMethod = "select shortName,deliveryTime,description,price from deliverymethod";

            List<Delivery> uo = await _conn.QueryAsync<Delivery>(deliverMethod) as List<Delivery>;
            return uo;
        }

    }
}