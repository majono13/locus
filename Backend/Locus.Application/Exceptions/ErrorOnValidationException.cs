using System.Net;

namespace Locus.Application.Exceptions
{
    public class ErrorOnValidationException : LocusException
    {
        private readonly IList<string> _errors;

        public ErrorOnValidationException(IList<string> errors) : base(string.Empty)
        {
            _errors = errors;
        }

        public override IList<string> GetErrorMessages() => _errors;

        public override HttpStatusCode GetStatusCode() => HttpStatusCode.BadRequest;
    }
}
