using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;

namespace API.Repository
{
    public interface IProductRepository
    {
       Task<IEnumerable<ProductDTO>> getProducts();
       Task<ProductDTO> getProduct(int id);

    }
}