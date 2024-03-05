using API.DTO;
using API.Models;
using API.Repository;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _product;
        public ProductController(IProductRepository product)
        {
            this._product = product;
        }

         [HttpGet("getAllProducts")]
        public async Task<ActionResult<IEnumerable<Product>>>  GetProducts(){
            IEnumerable<Product> pr = await _product.GetProductsAsync();
            return pr.ToList();
        }
        [HttpGet("getProduct/{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id){
            Product pr =await _product.GetProductByIdAsync(id);
            return pr;
        }
        [HttpGet("getProductEnumData")]
        public async Task<ActionResult<enumProductDataDTO>> enumProduct(){
            enumProductDataDTO e = await _product.GetProductEnumData();
            return e;
        }
    }
}