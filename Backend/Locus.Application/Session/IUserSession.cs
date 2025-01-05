using Communication.Responses.User;

namespace Locus.Application.Session
{
    public interface IUserSession
    {
        public ResponseUserJson User { get; set; }
    }
}
