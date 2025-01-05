using Communication.Requests.User;
using Communication.Responses.User;
using Locus.Application.Services.User;
using Microsoft.AspNetCore.Mvc;

namespace Locus.API.Controllers
{
    public class UserController : LocusControlerBase
    {
        [HttpPost]
        [ProducesResponseType(typeof (ResponseRegisteredUserJson), StatusCodes.Status201Created)]
        public async Task<IActionResult> Register([FromServices] IUserService userService, [FromBody] RequestUserJson request)
        {
            var result = await userService.Register(request);
            return Created("User created", result);
        }

        [HttpPost("login")]
        [ProducesResponseType(typeof (ResponseRegisteredUserJson), StatusCodes.Status200OK)]
        public async Task<IActionResult> Login([FromServices] IUserService userService, [FromBody] RequestLoginJson request)
        {
            var result = await userService.Login(request);
            return Ok(result);
        }
    }
}
