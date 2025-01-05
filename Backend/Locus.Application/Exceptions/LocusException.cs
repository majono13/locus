using System.Net;

namespace Locus.Application.Exceptions
{
    public abstract class LocusException : SystemException
    {
        public LocusException(string message) : base(message) { }

        public abstract IList<string> GetErrorMessages();
        public abstract HttpStatusCode GetStatusCode();

    }
}
