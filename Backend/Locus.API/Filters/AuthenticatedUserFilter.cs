using AutoMapper;
using Communication.Exceptions;
using Communication.Responses.User;
using Locus.Application.Exceptions;
using Locus.Application.Session;
using Locus.Domain.Repositories;
using Locus.Domain.Security.Tokens;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Locus.API.Filters
{
    public class AuthenticatedUserFilter : IAsyncAuthorizationFilter
    {
        private readonly IAccessTokenValidator _accessTokenValidator;
        private readonly IUserRepository _userRepository;
        private readonly IUserSession _userSession;
        private readonly IMapper _mapper;

        public AuthenticatedUserFilter(IAccessTokenValidator accessTokenValidator,
            IUserRepository userRepository,
            IUserSession userSession,
            IMapper mapper
            )
        {
            _accessTokenValidator = accessTokenValidator;
            _userRepository = userRepository;
            _userSession = userSession;
            _mapper = mapper;
        }

        public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
        {
            try
            {
                var token = TokenOnRequest(context);
                var userId = _accessTokenValidator.ValidateAndGetUserId(token);

                var user = await _userRepository.GetById(userId) ?? throw new InvalidTokenException(ExceptionsMessages.UNAUTHORIZED_USER);
                _userSession.User = _mapper.Map<ResponseUserJson>(user);

            }
            catch (LocusException e)
            {
                throw new InvalidTokenException(e.Message);
            }
            catch (Exception e) 
            {
                throw new InvalidTokenException(ExceptionsMessages.INVALID_TOKEN);
            }
        }

        private static string TokenOnRequest(AuthorizationFilterContext context)
        {
            var token = context.HttpContext.Request.Headers.Authorization.ToString();

            if (string.IsNullOrEmpty(token))
            {
                throw new InvalidTokenException(ExceptionsMessages.INVALID_TOKEN);
            }

            return token["Bearer ".Length..].Trim();
        }
    }
}
