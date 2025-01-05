using Locus.API.Filters;
using Microsoft.AspNetCore.Mvc;

namespace Locus.API.Attributes
{
    public class AuthenticatedUserAttribute : TypeFilterAttribute
    {
        public AuthenticatedUserAttribute() : base(typeof(AuthenticatedUserFilter))
        {
        }
    }
}
