using Communication.Exceptions;
using Communication.Requests.User;
using FluentValidation;
using Locus.Domain.Enums;

namespace Locus.Application.Services.User
{
    public class UserValidator : AbstractValidator<RequestUserJson>
    {
        public UserValidator()
        {
            RuleFor(user => user.Name)
                .NotEmpty().WithMessage(ExceptionsMessages.NAME_EMPTY)
                .MaximumLength(250).WithMessage(ExceptionsMessages.NAME_MAXIMUM_CHARACTERS);

            RuleFor(user => user.Email)
                .NotEmpty().WithMessage(ExceptionsMessages.EMAIL_EMPTY)
                .EmailAddress().WithMessage(ExceptionsMessages.EMAIL_INVALID)
                .MaximumLength(250).WithMessage(ExceptionsMessages.EMAIL_MAXIMUM_CHARACTERS);

            RuleFor(user => user.Password.Length)
                .GreaterThanOrEqualTo(6).WithMessage(ExceptionsMessages.PASSWORD_MIN_LENGTH);

            RuleFor(user => user.Type)
                .NotEmpty().WithMessage(ExceptionsMessages.TYPE_EMPTY)
                .Must(user => Enum.TryParse<UserTypeEnum>(user, true, out _))
                .WithMessage(ExceptionsMessages.TYPE_USER_INVALID);
        }
    }
}
