using Communication.Exceptions;
using Communication.Requests.User;
using FluentValidation;

namespace Locus.Application.Services.User
{
    public class PasswordValidator : AbstractValidator<UpdatePasswordJson>
    {
        public PasswordValidator()
        {
            RuleFor(password => password.NewPassword)
            .MinimumLength(5).WithMessage(ExceptionsMessages.PASSWORD_MIN_LENGTH)
            .NotEqual(password => password.CurrentPassword).WithMessage(ExceptionsMessages.SAME_PASSWORD);
        }
    }
}
