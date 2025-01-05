using System.Net;
using Communication.Exceptions;

namespace Locus.Application.Exceptions
{
    public class InvalidLoginException : LocusException
    {
        public InvalidLoginException() : base (ExceptionsMessages.INVALID_LOGIN)
        {
            
        }
        public override IList<string> GetErrorMessages() => [Message];

        public override HttpStatusCode GetStatusCode() => HttpStatusCode.Unauthorized;
    }
}
