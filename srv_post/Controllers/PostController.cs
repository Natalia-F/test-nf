using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using srv_post.Models;
using srv_post.Services;

namespace srv_post.Controllers
{
    [ApiController]
    [Route("post")]
    public class PostController: Controller
    {
        private readonly PostService postService = new PostService();

        [HttpGet]
        public async Task<IActionResult> GetPost()
        {
            try
            {
                var result = await postService.GetPost();
                return Ok(result);
            }
            catch (Exception e)
            {
                return StatusCode(500, new { message = "Internal Server Error : " + e.Message });
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddPost([FromBody] PostModel request)
        {
            try
            {
                var result = await postService.AddPost(request.NamePost, request.Description);
                return Created("", result);
            }
            catch (Exception e)
            {
                return StatusCode(500, new { message = "Internal Server Error : " + e.Message });
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeletePost([FromQuery] int id)
        {
            try
            {
                var result = await postService.DeletePost(id);
                return Accepted(result);
            }
            catch (Exception e)
            {
                return StatusCode(500, new { message = "Internal Server Error : " + e.Message });
            }
        }
    }
}
