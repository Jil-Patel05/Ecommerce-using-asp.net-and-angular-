using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;
using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly IAdminRepository _admin;
        public AdminController(IAdminRepository admin)
        {
            this._admin = admin;
        }

        [HttpGet("getproducts")]
        public async Task<ActionResult<IEnumerable<adminProducts>>> getAdminProductsAsync()
        {
            IEnumerable<adminProducts> res = await _admin.getProductsAsync();
            return res.ToList();
        }
        [HttpGet("getsingleproduct/{id}")]
        public async Task<ActionResult<adminSingleProduct>> getAdminSingleProductsAsync(int id)
        {
            IEnumerable<adminSingleProduct> res = await _admin.GetSingleProductAsync(id);
            return res.ToList()[0];
        }
        [HttpPost("createproduct")]
        public async Task<ActionResult<bool>> createAdminProduct(adminCreateProduct ap)
        {
            bool res = await _admin.createProductAsync(ap);
            return res;
        }
        [HttpPost("editproduct")]
        public async Task<ActionResult<bool>> editAdminProduct(adminEditProduct ap)
        {
            bool res = await _admin.editProductAsync(ap);
            return res;
        }
        [HttpGet("deleteproduct/{id}")]
        public async Task<ActionResult<bool>> deleteAdminProduct(int id)
        {
            bool res = await _admin.deleteProductAsync(id);
            return res;
        }
        [HttpPost("changeorderstatus")]
        public async Task<bool> changeOrderStatus([FromBody] updateOrder uo)
        {
            bool res = await _admin.changeOrderStatus(uo);
            return res;
        }

        [HttpGet("getallorders")]
        public async Task<ActionResult<IEnumerable<adminOrders>>> getAllAdminOrders()
        {
            IEnumerable<adminOrders> res = await _admin.getOrders();
            return res.ToList();
        }
        [HttpGet("getallusers")]
        public async Task<ActionResult<IEnumerable<allUsers>>> getAllUsersAsync()
        {
            IEnumerable<allUsers> res = await _admin.getAllUsersAsync();
            return res.ToList();
        }
        [HttpGet("getsingleuser/{id}")]
        public async Task<ActionResult<singleUser>> getSingleUserAsync(int id)
        {
            IEnumerable<singleUser> res = await _admin.getSingleUserAsync(id);
            return res.ToList()[0];
        }
        [HttpPost("updatesingleuser")]
        public async Task<bool> updateSingleUserAsync(updateUser uo)
        {
            bool res = await _admin.updateSingleUserAsync(uo);
            return res;
        }
    }
}