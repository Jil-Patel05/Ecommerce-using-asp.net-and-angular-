using API.Errors;
using API.Middleware;
using API.Repository;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

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

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

// learning thing
app.UseStatusCodePagesWithRedirects("/errors/{0}");
app.UseMiddleware<ExceptionMiddleware>();

app.UseCors(optinons => optinons.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader());

app.UseHttpsRedirection();

app.UseRouting();

app.UseStaticFiles();

app.UseAuthorization();

app.MapControllers();

app.Run();

