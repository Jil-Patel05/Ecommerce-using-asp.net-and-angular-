using System.Text;
using API.Errors;
using API.Interfaces;
using API.Middleware;
using API.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using MySql.Data.MySqlClient;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddControllers();
builder.Services.Configure<ApiBehaviorOptions>(options =>
{
  options.InvalidModelStateResponseFactory = actionContext =>
  {
    var errors = actionContext.ModelState.Where(e => e.Value.Errors.Count > 0)
                  .SelectMany(x => x.Value.Errors).Select(x => x.ErrorMessage).ToArray();
    var errorReponse = new ApiValidationError
    {
      Errors = errors
    };
    return new BadRequestObjectResult(errorReponse);
  };
});
builder.Services.AddSwaggerGen();
builder.Services.AddTransient(x =>
  new MySqlConnection(builder.Configuration.GetConnectionString("Default")));
builder.Services.AddSingleton<IProductRepository, ProductRepository>();
builder.Services.AddSingleton<IBasketRepository,BasketRepository>();
builder.Services.AddSingleton<IUserRepository,UserRepository>();
builder.Services.AddSingleton<IOrderRepository,orderRepository>();
builder.Services.AddSingleton<IAdminRepository,AdminRepository>();


builder.Services.AddSingleton<IConnectionMultiplexer>(c=>{
  var config = builder.Configuration.GetConnectionString("Redis");
  return ConnectionMultiplexer.Connect(config);
});

builder.Services.AddAuthentication(options => {
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters() {

        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetValue<string>("JWTSecretKey")))
    };

});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseFileServer(new FileServerOptions
{
    FileProvider = new PhysicalFileProvider("D:\\DatingApp\\API\\Resources\\images"),
    RequestPath = "/uploads",
    EnableDirectoryBrowsing = true
});

// learning thing
app.UseStatusCodePagesWithRedirects("/errors/{0}");
app.UseMiddleware<ExceptionMiddleware>();

app.UseCors(optinons => optinons.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader());
app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseRouting();


app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();

