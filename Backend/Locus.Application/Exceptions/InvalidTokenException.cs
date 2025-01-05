using System.Net;
using Communication.Exceptions;

namespace Locus.Application.Exceptions
{
    public class InvalidTokenException : LocusException
    {
        public InvalidTokenException(string message) : base(message) { }

        public override IList<string> GetErrorMessages() => [Message];

        public override HttpStatusCode GetStatusCode() => HttpStatusCode.Unauthorized;
    }
}
