using Communication.Responses.User;
using Locus.Domain.Entities;

namespace Locus.Application.Session
{
    public class UserSession : IUserSession
    {
        public ResponseUserJson User { get; set; }
    }
}
