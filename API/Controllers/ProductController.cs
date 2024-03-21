using API.DTO;
using API.Errors;
using API.Models;
using API.Repository;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class ProductController : BaseController
    {
        private readonly IProductRepository _product;
        public ProductController(IProductRepository product)
        {
            this._product = product;
        }
        [HttpGet("getinitialproduct")]
        public async Task<ActionResult<List<HomeProduct>>> getInitialProduct(){
            List<HomeProduct> lp = await _product.getInitialProduct();

            return lp;
        }


        [HttpGet("getAllProducts")]
        public async Task<ActionResult<productWithPageDTO>> GetProducts(string? sort, int? brandID, int? typeID,string? search, int pageNumber = 1, int pageSize = 1)
        {
            productWithPageDTO pr = await _product.GetProductsAsync(sort, brandID, typeID,search, pageNumber, pageSize);


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
                numberOfProduct=pr.numberOfProduct,
                productUrl = pr.productUrl,
                typeName = pr.typeName,
                brandName = pr.brandName,
                noOfReviews=pr.noOfReviews,
                productRating=pr.productRating,
                reviewInfo=pr.reviewsInfo
            };
        }
        [HttpPost("addreviews")]
        public async Task<ActionResult<bool>> addProductReview(UserReview ur)
        {
            bool res = await _product.addProductReviewAsync(ur);

            return res;
        }
        [HttpGet("getProductEnumData")]
        public async Task<ActionResult<enumProductDataDTO>> enumProduct()
        {
            enumProductDataDTO e = await _product.GetProductEnumData();
            return e;
        }

    }
}