using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Locus.Domain.Security.Tokens;
using Microsoft.IdentityModel.Tokens;

namespace Locus.Infrastructure.Security.Tokens
{
    public class AccessTokenGenerator : IAccessTokenGenerator
    {
        private readonly int _expirationTimeMinutes;
        private readonly string _signingKey;

        public AccessTokenGenerator(int expirationTimeMinutes, string signingKey)
        {
            _expirationTimeMinutes = expirationTimeMinutes;
            _signingKey = signingKey;
        }
        public string GenerateToken(Guid id)
        {
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Sid, id.ToString())
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(_expirationTimeMinutes),
                SigningCredentials = new SigningCredentials(SecurityKey(), SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var securityToken = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(securityToken);
        }

        private SymmetricSecurityKey SecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_signingKey));
        }
    }
}
