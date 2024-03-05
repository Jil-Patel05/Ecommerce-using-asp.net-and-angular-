using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;
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
        public async Task<ActionResult<IEnumerable<ProductDTO>>>  getProducts(){
            IEnumerable<ProductDTO> pr = await _product.getProducts();
            return pr.ToList();
        }
        [HttpGet("getProduct/{id}")]
        public async Task<ActionResult<ProductDTO>> getProduct(int id){
            ProductDTO pr =await _product.getProduct(id);
            return pr;
        }
    }
}