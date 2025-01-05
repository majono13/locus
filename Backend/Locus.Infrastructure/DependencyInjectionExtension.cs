using FluentMigrator.Runner;
using System.Reflection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Locus.Infrastructure.Extensions;
using Locus.Infrastructure.DataAccess.Repositories;
using Locus.Domain.Repositories;
using Locus.Infrastructure.DataAccess;
using Microsoft.EntityFrameworkCore;
using Locus.Domain.Security.Tokens;
using Locus.Infrastructure.Security.Tokens;

namespace Locus.Infrastructure
{
    public static class DependencyInjectionExtension
    {
        public static void AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            AddFluentMigrator(services, configuration);
            AddDbContext(services, configuration);
            AddRepositories(services);
            AddToken(services, configuration);
        }

        private static void AddDbContext(IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<LocusDbContext>(opt =>
            {
                var connectionString = configuration.ConnectionString(); ;
                var serverVersion = new MySqlServerVersion(new Version(8, 0, 40));
                opt.UseMySql(connectionString, serverVersion);
            });
        }

        private static void AddFluentMigrator(IServiceCollection services, IConfiguration configuration)
        {
            services.AddFluentMigratorCore().ConfigureRunner(opt =>
            {
                var connectionString = configuration.ConnectionString();
                opt.AddMySql5()
                .WithGlobalConnectionString(connectionString)
                .ScanIn(Assembly.Load("Locus.Infrastructure")).For.All();
            });
        }

        private static void AddRepositories(IServiceCollection services)
        {
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
        }

        private static void AddToken(IServiceCollection services, IConfiguration configuration)
        {
            var expirationTimeMinutes = int.Parse(configuration.GetSection("Settings:Jwt:ExpirationTimeMinutes").Value!);
            var signingKey = configuration.GetSection("Settings:Jwt:SigningKey").Value;

            services.AddScoped<IAccessTokenGenerator>(opt => new AccessTokenGenerator(expirationTimeMinutes, signingKey!));
            services.AddScoped<IAccessTokenValidator>(opt => new AccessTokenValidator(signingKey!));
        }
    }
}
