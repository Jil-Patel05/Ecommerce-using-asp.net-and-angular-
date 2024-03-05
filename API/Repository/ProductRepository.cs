using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;
using Dapper;
using MySql.Data.MySqlClient;

namespace API.Repository
{
    
    public class ProductRepository : IProductRepository
    {
        private readonly MySqlConnection _conn;
        public ProductRepository(MySqlConnection conn)
        {
            _conn = conn;
        }

        public async Task<ProductDTO> getProduct(int id)
        {
            string singleProduct = "select * from productinfo where productID=@id";
            ProductDTO pr = await _conn.QueryFirstAsync<ProductDTO>(singleProduct, new { id = id });
            return pr;
        }

        public async Task<IEnumerable<ProductDTO>> getProducts()
        {
            string products = "select * from productinfo";
            IEnumerable<ProductDTO> pr = await _conn.QueryAsync<ProductDTO>(products);
            return pr;
        }
    }
}