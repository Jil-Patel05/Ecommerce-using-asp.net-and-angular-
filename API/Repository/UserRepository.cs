using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.DTO;
using API.Interfaces;
using API.Models;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MySql.Data.MySqlClient;

namespace API.Repository
{
    public class HashPassword
    {
        public static string EncryptPassword(string password)
        {
            string passwordHash = BCrypt.Net.BCrypt.EnhancedHashPassword(password, 13);
            return passwordHash;
        }
        public static bool DecryptPassword(string password, string encryptPassword)
        {
            return BCrypt.Net.BCrypt.EnhancedVerify(password, encryptPassword);

        }
    }
    public class UserRepository : IUserRepository
    {
        private readonly MySqlConnection _conn;
        private readonly IConfiguration _config;
        public UserRepository(MySqlConnection conn, IConfiguration config)
        {
            _conn = conn;
            _config = config;
        }

        public async Task<RegisterDTO> registerUserAsync(user user)
        {
            string findUser = "select * from user where email=@email";

            var res = await _conn.QueryFirstOrDefaultAsync<dynamic>(findUser, new { email = user.email });
            if (res is null)
            {
                if (user.role == "") user.role = "user";

                string q = "insert into user(firstName,lastName,mobileNumber,email,password,role) values(@firstName,@lastName,@mobileNumber,@email,@password,@role)";

                string password = HashPassword.EncryptPassword(user.password);
                var affectedRaws = await _conn.ExecuteAsync(q, new { firstName = user.firstName, lastName = user.lastName, mobileNumber = user.mobileNumber, email = user.email, password = password, role = user.role });

                RegisterDTO rg = new RegisterDTO()
                {
                    DisplayName = user.firstName + " " + user.lastName,
                    email = user.email
                };
                return rg;
            }
            return null;

        }

        public async Task<loginDTO> loginUserAsync(login user)
        {
            string findUser = "select userID,firstName,lastName,email,password,role from user where email=@email";

            List<dynamic>? res = await _conn.QueryAsync<dynamic>(findUser, new { email = user.email }) as List<dynamic>;
            bool match = HashPassword.DecryptPassword(user.password, res[0].password);
            
            if (!match)
            {
                return null;
            }
            var key = Encoding.ASCII.GetBytes(_config.GetValue<string>("JWTSecretKey"));
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDes = new SecurityTokenDescriptor()
            {
                Subject = new System.Security.Claims.ClaimsIdentity(new Claim[]
                {
                   new Claim(ClaimTypes.Email, user.email)
                }),
                Expires = DateTime.Now.AddDays(30),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)

            };

            var token = tokenHandler.CreateToken(tokenDes);
            loginDTO lg = new loginDTO()
            {
                userID = res[0].userID,
                DisplayName = res[0].firstName + " " + res[0].lastName,
                email = res[0].email,
                role=res[0].role,
                token = tokenHandler.WriteToken(token)
            };
            return lg;
        }

        public async Task<bool> reserPassword(reset rs)
        {
            string s = "select password from user where email=@email";

            var res = await _conn.QueryAsync<dynamic>(s, new { email = rs.email, pass = rs.password }) as List<dynamic>;
            bool match = HashPassword.DecryptPassword(rs.password, res[0].password);
            if (!match)
            {
                return true;
            }
            string password = HashPassword.EncryptPassword(rs.nwPassword);
            string upAddress = "UPDATE user SET password=@password WHERE email=@email";
            var af1 = await _conn.ExecuteAsync(upAddress, new { password = password, email = rs.email });
            return false;
        }


        public async Task<adressDTO> GetAdressAsync(int id)
        {

            string s = "select u.firstName,u.lastName,a.street,a.city,a.state,a.zipCode from user as u inner join address as a on u.userID=a.userID where a.userID=@id";

            var res = await _conn.QueryAsync<adress>(s, new { id = id }) as List<adress>;

            if (res.Count == 0)
            {
                return null;
            }
            return new adressDTO()
            {
                firstName = res[0].firstName,
                lastName = res[0].lastName,
                street = res[0].street,
                city = res[0].city,
                state = res[0].state,
                zipCode = res[0].zipCode
            };
        }

        public async Task updateOrAddAddressAsync(adressDTO ad, int id)
        {

            string s = "select street from address where userID=@id";

            var res = await _conn.QueryAsync<adress>(s, new { id = id }) as List<adress>;

            if (res.Count == 0)
            {
                string addAddress = "insert into address(userID,street,city,state,zipCode) values (@id,@street,@city,@state,@zipCode)";
                var af = await _conn.ExecuteAsync(addAddress, new { id = id, street = ad.street, city = ad.city, state = ad.state, zipCode = ad.zipCode });
                return;
            }
            string upAddress = "UPDATE address SET street=@street,city=@city,state=@state,zipCode=@zipCode WHERE userID=@id";
            var af1 = await _conn.ExecuteAsync(upAddress, new { street = ad.street, city = ad.city, state = ad.state, zipCode = ad.zipCode, id = id });
        }

        
        public async Task<bool> fileUplaod(int userID,string dbPath)
        {

            string s = "update user SET userProfileUrl=@dbPath where userID=@userID";

            var res = await _conn.QueryAsync<dynamic>(s, new {dbPath=dbPath, userID = userID });
             
            return true;

        }


    }
}