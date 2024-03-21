using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;

namespace API.DTO
{
    public class productWithPageDTO{
        public int pageNumber { get; set; }
        public int pageSize { get; set; }
        public int count{ get; set; }
        public List<ProductDTO> products { get; set; }

    }
    public class ProductDTO
    {
        public int productID { get; set; }
        public string productName { get; set; }
        public string productDescription { get; set; }
        public decimal price { get; set; }
        public int numberOfProduct { get; set; }

        public List<string>? productUrl { get; set; }
        public string typeName { get; set; }
        public string brandName { get; set; }
        public int noOfReviews { get; set; }
        public decimal productRating { get; set; }
        public List<Reviews> reviewInfo { get; set; }
    }

   
}