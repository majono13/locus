using Communication.Requests.User;
using Communication.Responses.User;
using Locus.API.Attributes;
using Locus.Application.Services.User;
using Microsoft.AspNetCore.Mvc;

namespace Locus.API.Controllers
{
    public class UserController : LocusControlerBase
    {
        [HttpPost]
        [ProducesResponseType(typeof(ResponseRegisteredUserJson), StatusCodes.Status201Created)]
        public async Task<IActionResult> Register([FromServices] IUserService userService, [FromBody] RequestUserJson request)
        {
            var result = await userService.Register(request);
            return Created("User created", result);
        }

        [HttpPost("login")]
        [ProducesResponseType(typeof(ResponseRegisteredUserJson), StatusCodes.Status200OK)]
        public async Task<IActionResult> Login([FromServices] IUserService userService, [FromBody] RequestLoginJson request)
        {
            var result = await userService.Login(request);
            return Ok(result);
        }

        [HttpPut]
        [ProducesResponseType(typeof(ResponseUserJson), StatusCodes.Status200OK)]
        [AuthenticatedUser]
        public async Task<IActionResult> Update([FromServices] IUserService userService, [FromBody] RequestUserJson request)
        {
            var result = await userService.Update(request);
            return Ok(result);
        }

        [HttpPut("update-password")]
        [ProducesResponseType(typeof(ResponseUserJson), StatusCodes.Status200OK)]
        [AuthenticatedUser]
        public async Task<IActionResult> UpdatePassword([FromServices] IUserService userService, [FromBody] UpdatePasswordJson request)
        {
            var result = await userService.UpdatePassword(request);
            return Ok(result);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(ResponseUserJson), StatusCodes.Status200OK)]
        [AuthenticatedUser]
        public async Task<IActionResult> GetById([FromServices] IUserService userService, [FromRoute] string id)
        {
            var result = await userService.GetById(Guid.Parse(id));
            return Ok(result);
        }
    }
}
