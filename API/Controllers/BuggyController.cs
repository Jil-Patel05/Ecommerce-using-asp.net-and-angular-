using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    public class BuggyController : BaseController
    {
        [HttpGet("ServerError")]
        public IActionResult getInternalError(){

            string? s = null;
            string f = s.ToLower();

            return Ok();
        }
        
        [HttpGet("validationError/{id}")]
        public IActionResult getVlidationError(int id){
            
            return Ok();
        }
    }
}