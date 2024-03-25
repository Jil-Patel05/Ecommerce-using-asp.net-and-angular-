using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;

namespace API.Interfaces
{
    public interface IAdminRepository
    {
        public Task<IEnumerable<adminProducts>> getProductsAsync();
        public Task<IEnumerable<adminSingleProduct>> GetSingleProductAsync(int id);
        public Task<bool> editProductAsync(adminEditProduct ap);
        public Task<bool> createProductAsync(adminCreateProduct ap);
        public Task<bool> deleteProductAsync(int id);

        
    }
}