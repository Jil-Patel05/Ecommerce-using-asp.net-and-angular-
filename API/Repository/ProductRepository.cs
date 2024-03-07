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

            if (pr == null)
            {
                return null;
            }

            string productsUrl = "select productID,productUrl from producturls where productID=@id";
            List<ProductsUrls>? url = await _conn.QueryAsync<ProductsUrls>(productsUrl, new { id = id }) as List<ProductsUrls>;

            pr.productUrl = [];

            foreach (ProductsUrls item in url)
            {
                pr.productUrl.Add(item.productUrl);
            }
            return pr;
        }

        public async Task<IEnumerable<Product>> GetProductsAsync(string sort,int? brandID,int? typeID,int? take,int? skip)
        {
            string products = "select p.productID,p.productName,p.productDescription,p.price,et.typeName,p.productTypeID,eb.brandName,p.productBrandID from productinfo as p inner join enumproductbrand as eb on p.productBrandID=eb.productBrandID inner join enumproducttype as et on p.productTypeID=et.productTypeID order by p.productName";
            if (sort == "priceAsc")
            {
                products = "select p.productID,p.productName,p.productDescription,p.price,et.typeName,p.productTypeID,eb.brandName,p.productBrandID from productinfo as p inner join enumproductbrand as eb on p.productBrandID=eb.productBrandID inner join enumproducttype as et on p.productTypeID=et.productTypeID order by p.price";
            }
            else if (sort == "priceDesc"){
                products = "select p.productID,p.productName,p.productDescription,p.price,et.typeName,p.productTypeID,eb.brandName,p.productBrandID from productinfo as p inner join enumproductbrand as eb on p.productBrandID=eb.productBrandID inner join enumproducttype as et on p.productTypeID=et.productTypeID order by p.price desc";
            }

            if(brandID!=null && typeID!=null){
                products = "select p.productID,p.productName,p.productDescription,p.price,et.typeName,p.productTypeID,eb.brandName,p.productBrandID from productinfo as p inner join enumproductbrand as eb on p.productBrandID=eb.productBrandID inner join enumproducttype as et on p.productTypeID=et.productTypeID where p.productBrandID>=@brandID and p.productTypeID>=@typeID order by p.price desc";
            }
            else if(typeID!=null){
                products = "select p.productID,p.productName,p.productDescription,p.price,et.typeName,p.productTypeID,eb.brandName,p.productBrandID from productinfo as p inner join enumproductbrand as eb on p.productBrandID=eb.productBrandID inner join enumproducttype as et on p.productTypeID=et.productTypeID where p.productTypeID=@typeID order by p.price desc";
            }
            else if(brandID!=null){
                products = "select p.productID,p.productName,p.productDescription,p.price,et.typeName,p.productTypeID,eb.brandName,p.productBrandID from productinfo as p inner join enumproductbrand as eb on p.productBrandID=eb.productBrandID inner join enumproducttype as et on p.productTypeID=et.productTypeID where p.productBrandID=@brandID  order by p.price desc";
            }

            if (skip != null && take!=null){
                products += " LIMIT @take OFFSET @skip;";

            }

            Console.WriteLine(products);
            // Console.WriteLine(products);
            List<Product> pr = await _conn.QueryAsync<Product>(products,new {brandID=brandID,typeID=typeID,take=take,skip=skip}) as List<Product>;

            string productsUrl = "select productID,productUrl from producturls";
            List<ProductsUrls> url = await _conn.QueryAsync<ProductsUrls>(productsUrl) as List<ProductsUrls>;

            Dictionary<int, int> indexMapping = new Dictionary<int, int>();
            int ind = 0;

            foreach (Product a in pr)
            {
                a.productUrl = [];
                indexMapping[a.productID] = ind;
                ind++;
            }

            foreach (ProductsUrls item in url)
            {   
                if(indexMapping.ContainsKey(item.productID)){
                  pr[indexMapping[item.productID]].productUrl.Add(item.productUrl);
                }
            }

            return pr;
        }

        public async Task<enumProductDataDTO> GetProductEnumData()
        {

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