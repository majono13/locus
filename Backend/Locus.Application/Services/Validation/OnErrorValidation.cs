using FluentValidation.Results;
using Locus.Application.Exceptions;

namespace Locus.Application.Services.Validation
{
    public class OnErrorValidation
    {
        public void throwIfValidationError(ValidationResult result)
        {
            if (!result.IsValid)
            {
                var messages = result.Errors.Select(e => e.ErrorMessage).ToList();
                throw new ErrorOnValidationException(messages);
            }
        }
    }
}
