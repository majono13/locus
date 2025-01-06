using Locus.Infrastructure.Extensions;
using Locus.Infrastructure.Migrations;
using Locus.Infrastructure;
using Locus.Application;
using Locus.API.Filters;
using Locus.API.Converters;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(opt =>
{
    opt.AddPolicy("AllowLocalhost", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});


builder.Services.AddControllers().AddJsonOptions(opt => opt.JsonSerializerOptions.Converters.Add(new StringConverter()));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddRouting(opt => opt.LowercaseUrls = true);

builder.Services.AddApplication(builder.Configuration);
builder.Services.AddInfrastructure(builder.Configuration);

builder.Services.AddMvc(opt => opt.Filters.Add(typeof(ExceptionsFilter)));

var app = builder.Build();

app.UseCors("AllowLocalhost");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

MigrateDatabase();

app.Run();

void MigrateDatabase()
{
    var service = app.Services.GetRequiredService<IServiceScopeFactory>().CreateScope();
    var connectionString = builder.Configuration.ConnectionString();
    DatabaseMigration.Migrate(connectionString, service.ServiceProvider);
}
