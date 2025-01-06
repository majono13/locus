using Communication.Requests.User;
using Communication.Responses.User;

namespace Locus.Application.Services.User
{
    public interface IUserService
    {
        public Task<ResponseRegisteredUserJson> Register(RequestUserJson request);
        public Task<ResponseRegisteredUserJson> Login(RequestLoginJson request);
        public Task<ResponseUserJson> Update(RequestUserJson request);
        public Task<ResponseUserJson> GetById(Guid id);
    }
}
