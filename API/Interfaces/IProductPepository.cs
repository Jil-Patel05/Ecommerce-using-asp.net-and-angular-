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
        Task<IEnumerable<Product>> GetProductsAsync(string sort,int? brandID,int? typeID,int? take,int? skip);
        Task<Product> GetProductByIdAsync(int id);
        Task<enumProductDataDTO> GetProductEnumData();
    }
}