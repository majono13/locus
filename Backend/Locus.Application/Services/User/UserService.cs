using AutoMapper;
using Communication.Exceptions;
using Communication.Requests.User;
using Communication.Responses.User;
using FluentValidation.Results;
using Locus.Application.Exceptions;
using Locus.Application.Services.Cryptography;
using Locus.Application.Services.Validation;
using Locus.Application.Session;
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
        private readonly IUserSession _userSession;

        public UserService(
            IMapper mapper,
            PasswordEncripter passwordEncripter,
            IUserRepository userRepository,
            IUnitOfWork unitOfWork,
            IAccessTokenGenerator accessTokenGenerator,
            IUserSession userSession
            )
        {
            _mapper = mapper;
            _passwordEncripter = passwordEncripter;
            _userRepository = userRepository;
            _unitOfWork = unitOfWork;
            _accessTokenGenerator = accessTokenGenerator;
            _userSession = userSession;
        }

        public async Task<ResponseRegisteredUserJson> Register(RequestUserJson request)
        {
            await ValidateRequest(request, RequestTypeEnum.POST);
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

        private async Task ValidateRequest(RequestUserJson request, RequestTypeEnum type)
        {
            var validator = type == RequestTypeEnum.POST ? new UserCreateValidator() : new BaseUserValidator();

            var result = validator.Validate(request);

            if (type == RequestTypeEnum.POST) await ValidateEmail(request.Email, result);
            else await ValidateUpdate(request, result);

            new OnErrorValidation().throwIfValidationError(result);
        }

        private async Task ValidateUpdate(RequestUserJson request, ValidationResult result)
        {
            if (request.Email != _userSession.User.Email)
            {
                await ValidateEmail(request.Email, result);
            }
        }

        private async Task ValidateEmail(string email, ValidationResult result)
        {
            var user = await _userRepository.GetActiveUserByEmail(email);

            if (user != null)
            {
                result.Errors.Add(new FluentValidation.Results.ValidationFailure("", ExceptionsMessages.EMAIL_REGISTERED));
            }
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

        public async Task<ResponseUserJson> Update(RequestUserJson request)
        {
            await ValidateRequest(request, RequestTypeEnum.PUT);
            var user = _mapper.Map<Domain.Entities.User>(request);

            var newUserInfo = await _userRepository.Update(_userSession.User.Id, user);
            await _unitOfWork.Commit();

            return _mapper.Map<ResponseUserJson>(newUserInfo);
        }

        public async Task<ResponseUserJson> GetById(Guid id)
        {
            var user = await _userRepository.GetById(id);

            return _mapper.Map<ResponseUserJson>(user);
        }
    }
}
