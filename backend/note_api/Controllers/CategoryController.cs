using Microsoft.AspNetCore.Mvc;
using note_api.Models;

namespace note_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAll")]
    public class CategoryController : Controller
    {
        private readonly NotesContext _context;
        public CategoryController(NotesContext context) { _context = context; }

        [HttpGet]
        [Route("List")]
        public IActionResult List()
        {
            List<Category> category = new List<Category>();
            try
            {
                category = _context.Categories.ToList();
                return StatusCode(StatusCodes.Status200OK, new { message = "ok", response = category });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status200OK, new { message = ex.Message, response = category });
            }
        }
    }
}
