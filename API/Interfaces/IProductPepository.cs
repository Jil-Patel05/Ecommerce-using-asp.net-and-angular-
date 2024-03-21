using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;
using API.Models;

namespace API.Repository
{
    public interface IProductRepository
    {
        Task<productWithPageDTO> GetProductsAsync(string? sort,int? brandID,int? typeID,string? search,int pageNumber,int pageSize);
        Task<Product> GetProductByIdAsync(int id);
        Task<enumProductDataDTO> GetProductEnumData();
        public Task<bool> addProductReviewAsync(UserReview ur);
        public Task<List<HomeProduct>> getInitialProduct();

    }
}