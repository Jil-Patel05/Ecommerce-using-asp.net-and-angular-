using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;
using API.Models;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        public Task<RegisterDTO> registerUserAsync(user user);
        public Task<loginDTO> loginUserAsync(login user);
        public Task<adressDTO> GetAdressAsync(int id);
        public Task updateOrAddAddressAsync(adressDTO ad, int id);
        public Task<bool> reserPassword(reset rs);

        public Task<bool> fileUplaod(int userID, string dpPath);
    }
}