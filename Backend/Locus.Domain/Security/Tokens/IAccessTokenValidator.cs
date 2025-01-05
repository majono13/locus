using Locus.Domain.Entities;

namespace Locus.Domain.Security.Tokens
{
    public interface IAccessTokenValidator
    {
        public Guid ValidateAndGetUserId(string token);
    }
}
