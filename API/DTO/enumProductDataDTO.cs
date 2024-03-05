using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;

namespace API.DTO
{
    public class enumProductDataDTO
    {
      public List<enumType> enumType { get; set; }
      public List<enumBrand> enumBrand { get; set; }

    }
}