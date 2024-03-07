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

        [HttpGet("getAllProducts")]
        public async Task<ActionResult<IEnumerable<ProductDTO>>> GetProducts(string? sort,int? brandID,int? typeID,int? take,int? skip)
        {
            IEnumerable<Product> pr = await _product.GetProductsAsync(sort,brandID,typeID,take,skip);

            // you can store images in your server than use this images to send it to frontend
            // if you store images in your server then path is images/products/photos
            // in this case you have serverUrl/images/products/photos


            // I can use auto mapper here to auto map following property
            return pr.Select(a => new ProductDTO
            {
                productID = a.productID,
                productName = a.ProductName,
                productDescription = a.productDescription,
                price = a.price,
                productUrl = a.productUrl,
                typeName = a.typeName,
                brandName = a.brandName
            }).ToList();

        }
        [HttpGet("getProduct/{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(typeof(ApiResponses),400)]
        [ProducesResponseType(typeof(ApiResponses),404)]
        [ProducesResponseType(typeof(ApiException),500)]
        public async Task<ActionResult<ProductDTO>> GetProduct(int id)
        {
            Product pr = await _product.GetProductByIdAsync(id);
            if(pr==null){
                return NotFound(new ApiResponses(404));
            }
            return new ProductDTO()
            {
                productID = pr.productID,
                productName = pr.ProductName,
                productDescription = pr.productDescription,
                price = pr.price,
                productUrl = pr.productUrl,
                typeName = pr.typeName,
                brandName = pr.brandName
            };
        }
        [HttpGet("getProductEnumData")]
        public async Task<ActionResult<enumProductDataDTO>> enumProduct()
        {
            enumProductDataDTO e = await _product.GetProductEnumData();
            return e;
        }
    }
}