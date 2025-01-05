using Microsoft.Extensions.Configuration;

namespace Locus.Infrastructure.Extensions
{
    public static class ConfigurationExtension
    {
        public static string ConnectionString(this IConfiguration configuration) 
        {
            return configuration.GetConnectionString("Connection")!;
        }
    }
}
