using API.DTO;
using API.Errors;
using API.Interfaces;
using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class UserController : BaseController
    {
        private readonly IUserRepository _user;
        public UserController(IUserRepository user)
        {
            this._user = user;
        }

        [HttpPost("/register")]
        [ProducesResponseType(400)]
        public async Task<ActionResult<RegisterDTO>> registerUser(user user)
        {
            RegisterDTO rg = await _user.registerUserAsync(user);
            if (rg == null)
            {
                return BadRequest(new ApiResponses(400));
            }

            return rg;
        }

        [HttpPost("/login")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<loginDTO>> loginUser(login user)
        {
            loginDTO lg = await _user.loginUserAsync(user);
            if (lg == null)
            {
                return Unauthorized(new ApiResponses(401));
            }
            return Ok(lg);
        }

        [HttpPost("/resetPassword")]
        public async Task<ActionResult> addOrUpdateAddress(reset rs)
        {
            bool res = await _user.reserPassword(rs);
            if(res){
                return BadRequest(new ApiResponses(400));
            }
            return Ok();
            
        }

        [HttpGet("/address/{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<adressDTO>> getAddress(int id)
        {
            adressDTO lg = await _user.GetAdressAsync(id);
            if (lg == null)
            {
                return new adressDTO();
            }
            return Ok(lg);
        }

        [HttpPost("/addOrUpdateAddress/{id}")]
        public async Task addOrUpdateAddress(adressDTO ad, int id)
        {
            await _user.updateOrAddAddressAsync(ad, id);
            return;
        }
    }
}