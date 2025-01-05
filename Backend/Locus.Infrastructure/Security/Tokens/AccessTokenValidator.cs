using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Locus.Domain.Security.Tokens;
using Microsoft.IdentityModel.Tokens;

namespace Locus.Infrastructure.Security.Tokens
{
    public class AccessTokenValidator : IAccessTokenValidator
    {
        private readonly string _signingKey;

        public AccessTokenValidator(string signingKey)
        {
            _signingKey = signingKey;
        }

        public Guid ValidateAndGetUserId(string token)
        {
            var validationParameters = new TokenValidationParameters
            {
                ClockSkew = new TimeSpan(0),
                ValidateIssuer = false,
                ValidateAudience = false,
                IssuerSigningKey = SecurityKey()
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(token, validationParameters, out _);
            var userId = principal.Claims.First(c => c.Type == ClaimTypes.Sid).Value;

            return Guid.Parse(userId);
        }

        private SymmetricSecurityKey SecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_signingKey));
        }
    }
}
