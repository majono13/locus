namespace Locus.Domain.Security.Tokens
{
    public interface IAccessTokenGenerator
    {
        public string GenerateToken(Guid token);
    }
}
