using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;
using API.Models;
using Dapper;
using MySql.Data.MySqlClient;

namespace API.Repository
{
    public class AdminRepository : IAdminRepository
    {
        private readonly MySqlConnection _conn;
        private readonly IConfiguration _config;
        public AdminRepository(MySqlConnection conn, IConfiguration config)
        {
            _conn = conn;
            _config = config;
        }

        public async Task<IEnumerable<adminProducts>> getProductsAsync()
        {
            string q = "select productID,productName,price from productinfo";

            IEnumerable<adminProducts> res = await _conn.QueryAsync<adminProducts>(q);

            return res;
        }
        public async Task<IEnumerable<adminSingleProduct>> GetSingleProductAsync(int id)
        {
            string q = "select productID,productName,productDescription,price,numberOfProduct,productBrandID,productTypeID from productinfo where productID=@id";

            IEnumerable<adminSingleProduct> res = await _conn.QueryAsync<adminSingleProduct>(q, new { id = id });

            return res;
        }
        public async Task<bool> editProductAsync(adminEditProduct ap){

            string q = "update productinfo SET productName=@pn,productDescription=@pd,price=@p,numberOfProduct=@nop,productBrandID=@pb,productTypeID=@pt where productID=@id";
            
            var res = await _conn.ExecuteAsync(q, new { pn = ap.productName, pd = ap.productDescription, p = ap.price, nop = ap.numberOfProduct, pb = ap.productBrandID, pt = ap.productTypeID,id=ap.productID });

            return true;
        }


        public async Task<bool> createProductAsync(adminCreateProduct ap)
        {
            string q = "insert into productinfo(productName,productDescription,price,numberOfProduct,productBrandID,productTypeID) values(@pn,@pd,@p,@nop,@pb,@pt);select last_insert_id()";

            var res = await _conn.QueryFirstOrDefaultAsync<int>(q, new { pn = ap.productName, pd = ap.productDescription, p = ap.price, nop = ap.numberOfProduct, pb = ap.productBrandID, pt = ap.productTypeID });
            int id = res;

            string q1 = "insert into producturls(productID,productUrl) values(@id,@url)";

            foreach (var a in ap.urls)
            {
                var af = await _conn.ExecuteAsync(q1, new { id = id, url = a });
            }

            return true;
        }

        public async Task<bool> deleteProductAsync(int id)
        {
            string q = "delete from producturls where productID=@id";

            var af1 = await _conn.ExecuteAsync(q, new { id = id });

            string q1 = "delete from productinfo where productID=@id";

            var af = await _conn.ExecuteAsync(q1, new { id = id });


            return true;
        }
    }
}