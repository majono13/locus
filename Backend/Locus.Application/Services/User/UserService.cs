using AutoMapper;
using Communication.Exceptions;
using Communication.Requests.User;
using Communication.Responses.User;
using Locus.Application.Exceptions;
using Locus.Application.Services.Cryptography;
using Locus.Application.Services.Validation;
using Locus.Domain.Enums;
using Locus.Domain.Repositories;
using Locus.Domain.Security.Tokens;

namespace Locus.Application.Services.User
{
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly PasswordEncripter _passwordEncripter;
        private readonly IUserRepository _userRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAccessTokenGenerator _accessTokenGenerator;

        public UserService(
            IMapper mapper,
            PasswordEncripter passwordEncripter,
            IUserRepository userRepository,
            IUnitOfWork unitOfWork,
            IAccessTokenGenerator accessTokenGenerator
            )
        {
            _mapper = mapper;
            _passwordEncripter = passwordEncripter;
            _userRepository = userRepository;
            _unitOfWork = unitOfWork;
            _accessTokenGenerator = accessTokenGenerator;
        }

        public async Task<ResponseRegisteredUserJson> Register(RequestUserJson request)
        {
            await ValidateRequest(request);
            var user = _mapper.Map<Domain.Entities.User>(request);
            user.Password = _passwordEncripter.Encrypt(request.Password);

            await _userRepository.Create(user);
            await _unitOfWork.Commit();

            var token = _accessTokenGenerator.GenerateToken(user.Id);
            return new ResponseRegisteredUserJson
            {
                Id = user.Id,
                Token = token
            };
        }

        private async Task ValidateRequest(RequestUserJson request)
        {
            var validator = new UserValidator();
            var result = validator.Validate(request);

            var user = await _userRepository.GetActiveUserByEmail(request.Email);

            if (user != null)
            {
                result.Errors.Add(new FluentValidation.Results.ValidationFailure("", ExceptionsMessages.EMAIL_REGISTERED));
            }

            new OnErrorValidation().throwIfValidationError(result);
        }

        public async Task<ResponseRegisteredUserJson> Login(RequestLoginJson request)
        {
            var encriptedPassword = _passwordEncripter.Encrypt(request.Password);
            var user = await _userRepository.GetUserByEmailAndPassword(request.Email, encriptedPassword) ?? throw new InvalidLoginException();
            var token = _accessTokenGenerator.GenerateToken(user.Id);

            return new ResponseRegisteredUserJson
            {
                Id = user.Id,
                Token = token
            };
        }
    }
}
