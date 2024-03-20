using API.DTO;
using API.Models;
using Dapper;
using Microsoft.Data.SqlClient;
using MySql.Data.MySqlClient;

namespace API.Repository
{

    public class ProductRepository : IProductRepository
    {
        private readonly MySqlConnection _conn;
        private readonly IConfiguration _config;
        public ProductRepository(MySqlConnection conn, IConfiguration config)
        {
            _conn = conn;
            _config = config;
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            string singleProduct = "select p.productID,p.productName,p.productDescription,p.price,p.numberOfProduct,et.typeName,p.productTypeID,eb.brandName,p.productBrandID from productinfo as p inner join enumproductbrand as eb on p.productBrandID=eb.productBrandID inner join enumproducttype as et on p.productTypeID=et.productTypeID where p.productID=@id";
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

        public async Task<productWithPageDTO> GetProductsAsync(string? sort, int? brandID, int? typeID,string? search, int pageNumber, int pageSize)
        {
            
        
            string products = "select p.productID,p.productName,p.productDescription,p.price,p.numberOfProduct,et.typeName,p.productTypeID,eb.brandName,p.productBrandID,p.noOfReviews,p.productRating from productinfo as p inner join enumproductbrand as eb on p.productBrandID=eb.productBrandID inner join enumproducttype as et on p.productTypeID=et.productTypeID";

            bool isBrandOrTypePresent = false;
            if (brandID != null && typeID != null)
            {
                products += " where p.productBrandID=@brandID and p.productTypeID=@typeID";
                isBrandOrTypePresent = true;
            }
            else if (typeID != null)
            {
                products += " where p.productTypeID=@typeID";
                isBrandOrTypePresent = true;
            }
            else if (brandID != null)
            {
                products += " where p.productBrandID=@brandID";
                isBrandOrTypePresent = true;
            }

            if(search!=null){
                  if(isBrandOrTypePresent){
                    products += " and p.productName Like @search";
                  }
                  else{
                    products += " where productName Like @search";
                  }
            }
            if(sort=="priceAsc"){
                products += " order by p.price";
            }
            else if(sort=="priceDesc"){
                products += " order by p.price desc";
            }
            else{
                products += " order by p.productName";
            }
            string searchKey = "%" + search + "%";
            
            List<Product> pr = await _conn.QueryAsync<Product>(products, new { brandID = brandID, typeID = typeID, take = pageSize, skip = (pageNumber-1)*pageSize,search=searchKey }) as List<Product>;
            List<Product> productsToReturn = new List<Product>();
            
            int ind = 1, pages = pageSize, count = pr.Count();
             foreach(var a in pr){
                if(ind>(pageNumber-1)*pageSize && pages>0){
                    productsToReturn.Add(a);
                    pages--;
                }
                ind++;
             }
            _conn.Close();
            _conn.Open();
            string productsUrl = "select productID,productUrl from producturls";
            List<ProductsUrls> url = await _conn.QueryAsync<ProductsUrls>(productsUrl) as List<ProductsUrls>;

            Dictionary<int, int> indexMapping = new Dictionary<int, int>();
            ind = 0;

            foreach (Product a in productsToReturn)
            {
                a.productUrl = [];
                indexMapping[a.productID] = ind;
                ind++;
            }

            foreach (ProductsUrls item in url)
            {
                if (indexMapping.ContainsKey(item.productID))
                {
                    productsToReturn[indexMapping[item.productID]].productUrl.Add(item.productUrl);
                }
            }
             productWithPageDTO prp = new productWithPageDTO()
            {
                pageNumber = pageNumber,
                pageSize = pageSize,
                count=count,
                products = productsToReturn.Select(a => new ProductDTO
                {
                    productID = a.productID,
                    productName = a.ProductName,
                    productDescription = a.productDescription,
                    price = a.price,
                    numberOfProduct=a.numberOfProduct,
                    productUrl = a.productUrl,
                    typeName = a.typeName,
                    brandName = a.brandName
                }).ToList()
            };
            // _conn.Close();
            return prp;
        }

        public async Task<enumProductDataDTO> GetProductEnumData()
        {
            // _conn.Open();

            string typeData = "select * from enumproducttype";
            List<enumType> et = await _conn.QueryAsync<enumType>(typeData) as List<enumType>;

            string brandData = "select * from enumproductbrand";
            List<enumBrand> eb = await _conn.QueryAsync<enumBrand>(brandData) as List<enumBrand>;

            enumProductDataDTO en = new enumProductDataDTO();

            en.enumType = et;
            en.enumBrand = eb;
            // _conn.Close();
            return en;
        }
    }


}