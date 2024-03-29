using System.Text.Json;
using API.DTO;
using API.Errors;
using API.Models;
using API.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StackExchange.Redis;

namespace API.Controllers
{

    [Authorize]
    public class ProductController : BaseController
    {
        private readonly IProductRepository _product;
        private readonly IDatabase _database;

        public ProductController(IProductRepository product, IConnectionMultiplexer redis)
        {
            this._product = product;
            _database = redis.GetDatabase();

        }
        [HttpGet("getinitialproduct")]
        [AllowAnonymous]
        public async Task<ActionResult<List<HomeProduct>>> getInitialProduct()
        {
            string masterKey = "master$master$";
            var res = await _database.StringGetAsync(masterKey);
            List<HomeProduct> lp = new List<HomeProduct>();
            if (res.IsNullOrEmpty)
            {
                lp = await _product.getInitialProduct();
                var data = await _database.StringSetAsync(masterKey, JsonSerializer.Serialize(lp), TimeSpan.FromDays(30));
            }
            else
            {
                lp = JsonSerializer.Deserialize<List<HomeProduct>>(res);
            }

            return lp;
        }


        [HttpGet("getAllProducts")]
        [AllowAnonymous]
        public async Task<ActionResult<productWithPageDTO>> GetProducts(string? sort, int? brandID, int? typeID, string? search, int pageNumber = 1, int pageSize = 6)
        {
            productWithPageDTO pr = await _product.GetProductsAsync(sort, brandID, typeID, search, pageNumber, pageSize);


            // you can store images in your server than use this images to send it to frontend
            // if you store images in your server then path is images/products/photos
            // in this case you have serverUrl/images/products/photos


            // I can use auto mapper here to auto map following property
            // productWithPageDTO prp = new productWithPageDTO()
            // {
            //     pageNumber = pageNumber,
            //     pageSize = pageSize,
            //     products = pr.Select(a => new ProductDTO
            //     {
            //         productID = a.productID,
            //         productName = a.ProductName,
            //         productDescription = a.productDescription,
            //         price = a.price,
            //         productUrl = a.productUrl,
            //         typeName = a.typeName,
            //         brandName = a.brandName
            //     }).ToList()
            // };
            return pr;

        }
        [HttpGet("getProduct/{id}")]
        [AllowAnonymous]
        [ProducesResponseType(200)]
        [ProducesResponseType(typeof(ApiResponses), 400)]
        [ProducesResponseType(typeof(ApiResponses), 404)]
        [ProducesResponseType(typeof(ApiException), 500)]
        public async Task<ActionResult<ProductDTO>> GetProduct(int id)
        {
            // return NotFound(new ApiResponses(404));

            Product pr = await _product.GetProductByIdAsync(id);
            if (pr == null)
            {
                return NotFound(new ApiResponses(404));
            }
            return new ProductDTO()
            {
                productID = pr.productID,
                productName = pr.ProductName,
                productDescription = pr.productDescription,
                price = pr.price,
                numberOfProduct = pr.numberOfProduct,
                productUrl = pr.productUrl,
                typeName = pr.typeName,
                brandName = pr.brandName,
                noOfReviews = pr.noOfReviews,
                productRating = pr.productRating,
                reviewInfo = pr.reviewsInfo
            };
        }
        [HttpPost("addreviews")]
        [AllowAnonymous]
        public async Task<ActionResult<bool>> addProductReview(UserReview ur)
        {
            string masterKey = "master$master$";
            await _database.KeyDeleteAsync(masterKey);
            bool res = await _product.addProductReviewAsync(ur);

            return res;
        }
        [HttpGet("getProductEnumData")]
        [AllowAnonymous]
        public async Task<ActionResult<enumProductDataDTO>> enumProduct()
        {
            string masterKey = "enumMaterKey$";
            var res = await _database.StringGetAsync(masterKey);
            enumProductDataDTO e = new enumProductDataDTO();
            if (res.IsNullOrEmpty)
            {
                e = await _product.GetProductEnumData();
                var data = await _database.StringSetAsync(masterKey, JsonSerializer.Serialize(e), TimeSpan.FromDays(30));
            }
            else
            {
                e = JsonSerializer.Deserialize<enumProductDataDTO>(res);
            }

            return e;
        }

    }
}