using Locus.Application.Mappers;
using Locus.Application.Services.Cryptography;
using Locus.Application.Services.User;
using Locus.Application.Session;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Locus.Application
{
    public static class DependencyInjectionExtension
    {
        public static void AddApplication(this IServiceCollection services, IConfiguration configuration)
        {
            AddServices(services);
            AddAutoMapper(services);
            AddPasswordEncripter(services, configuration);
        }

        private static void AddServices(IServiceCollection services)
        {
            services.AddScoped<IUserSession, UserSession>();

            services.AddScoped<IUserService, UserService>();
        }

        private static void AddAutoMapper(IServiceCollection services)
        {

            services.AddScoped(opt =>
            {
                return new AutoMapper.MapperConfiguration(options =>
                {
                    options.AddProfile(new AutoMapping());
                }).CreateMapper();
            });
        }

        private static void AddPasswordEncripter(IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped(opt =>
            {
                return new PasswordEncripter();
            });
        }
    }
}
