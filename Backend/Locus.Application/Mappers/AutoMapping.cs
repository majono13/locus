using AutoMapper;
using Communication.Requests.User;
using Communication.Responses.User;

namespace Locus.Application.Mappers
{
    public class AutoMapping : Profile
    {
        public AutoMapping()
        {
            CreateMap<RequestUserJson, Domain.Entities.User>()
                .ForMember(dest => dest.Password, opt => opt.Ignore());

            CreateMap<Domain.Entities.User, ResponseUserJson>();
        }
    }
}
