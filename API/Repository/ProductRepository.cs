using API.DTO;
using API.Models;
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

        public async Task<Product> GetProductByIdAsync(int id)
        {
            string singleProduct = "select p.productID,p.productName,p.productDescription,p.price,et.typeName,p.productTypeID,eb.brandName,p.productBrandID from productinfo as p inner join enumproductbrand as eb on p.productBrandID=eb.productBrandID inner join enumproducttype as et on p.productTypeID=et.productTypeID where p.productID=@id";
            Product? pr = await _conn.QueryFirstOrDefaultAsync<Product>(singleProduct, new { id = id });

            if(pr==null){
                return null;
            }

            string productsUrl = "select productID,productUrl from producturls where productID=@id";
            List<ProductsUrls>? url = await _conn.QueryAsync<ProductsUrls>(productsUrl, new { id = id }) as List<ProductsUrls>;

            pr.productUrl = [];

            foreach(ProductsUrls item in url){
                pr.productUrl.Add(item.productUrl);
            }
            return pr;
        }

        public async Task<IEnumerable<Product>> GetProductsAsync()
        {
            string products ="select p.productID,p.productName,p.productDescription,p.price,et.typeName,p.productTypeID,eb.brandName,p.productBrandID from productinfo as p inner join enumproductbrand as eb on p.productBrandID=eb.productBrandID inner join enumproducttype as et on p.productTypeID=et.productTypeID";
            List<Product> pr = await _conn.QueryAsync<Product>(products) as List<Product>;

            string productsUrl = "select productID,productUrl from producturls";
            List<ProductsUrls> url = await _conn.QueryAsync<ProductsUrls>(productsUrl) as List<ProductsUrls>;

            foreach(Product a in pr){
                a.productUrl = [];
            }

            foreach(ProductsUrls item in url){
                pr[item.productID - 1].productUrl.Add(item.productUrl);
            }

            return pr;
        }

        public async Task<enumProductDataDTO> GetProductEnumData(){

            string typeData = "select * from enumproducttype";
            List<enumType> et = await _conn.QueryAsync<enumType>(typeData) as List<enumType>;

            string brandData = "select * from enumproductbrand";
            List<enumBrand> eb = await _conn.QueryAsync<enumBrand>(brandData) as List<enumBrand>;

            enumProductDataDTO e = new enumProductDataDTO();

            e.enumType = et;
            e.enumBrand = eb;

            return e;
        }
    }


}