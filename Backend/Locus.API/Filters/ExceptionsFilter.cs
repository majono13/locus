using FluentMigrator.Infrastructure;
using System.Net;
using Locus.Application.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Communication.Responses;
using Communication.Exceptions;

namespace Locus.API.Filters
{
    public class ExceptionsFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            if (context.Exception is LocusException locusException)
                HandleProjectException(context, locusException);
            else
                ThrowUnknowException(context);
        }

        private static void HandleProjectException(ExceptionContext context, LocusException locusException)
        {
            context.HttpContext.Response.StatusCode = (int)locusException.GetStatusCode();
            context.Result = new ObjectResult(new ResponseErrorJson(locusException.GetErrorMessages()));
        }

        private static void ThrowUnknowException(ExceptionContext context)
        {
            context.HttpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            context.Result = new ObjectResult(new ResponseErrorJson(ExceptionsMessages.UNKNOW_ERRROR));
        }
    }
}
