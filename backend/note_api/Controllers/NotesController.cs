using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using note_api.Models;
using note_api.ViewModel;

namespace note_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAll")]
    public class NotesController : Controller
    {
        private readonly NotesContext _context;
        public NotesController(NotesContext context) { _context = context; }

        [HttpGet]
        [Route("List")]
        public IActionResult List()
        {
            try
            {
                var notes = _context.Notes
                                    .Include(n => n.NoteCategories) 
                                    .ThenInclude(nc => nc.Category)
                                    .Where(note => !note.Archived)
                                    .ToList();

                return StatusCode(StatusCodes.Status200OK, new { message = "ok", response = notes });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }
        [HttpGet]
        [Route("Notes")]
        public IActionResult Archived()
        {
            try
            {
                var notes = _context.Notes
                                    .Include(n => n.NoteCategories)
                                    .ThenInclude(nc => nc.Category)
                                    .Where(note => note.Archived)
                                    .ToList();

                return StatusCode(StatusCodes.Status200OK, new { message = "ok", response = notes });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }
        [HttpGet]
        [Route("Obtain/{Id:int}")]
        public IActionResult Obtain(int Id)
        {
            try
            {
                var oNote = _context.Notes
                                    .Include(n => n.NoteCategories)
                                    .ThenInclude(nc => nc.Category)
                                    .FirstOrDefault(p => p.Id == Id);

                if (oNote == null)
                {
                    return BadRequest("Note not found");
                }

                return StatusCode(StatusCodes.Status200OK, new { message = "ok", response = oNote });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }
        [HttpPost]
        [Route("Save")]
        public IActionResult Save([FromBody] NoteViewModel noteViewModel)
        {
            try
            {
                var newNote = new Note
                {
                    Title = noteViewModel.Title,
                    Content = noteViewModel.Content,
                    Archived = noteViewModel.Archived,
                    Created = noteViewModel.Created,
                    Updated = noteViewModel.Updated
                };

                foreach (var categoryId in noteViewModel.CategoryIds)
                {
                    var category = _context.Categories.Find(categoryId);
                    if (category != null)
                    {
                        newNote.NoteCategories.Add(new NoteCategory { Note = newNote, Category = category });
                    }
                }

                _context.Notes.Add(newNote);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status200OK, new { message = "ok" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        [HttpPut]
        [Route("Edit")]
        public IActionResult Edit([FromBody] Note note)
        {
            var existingNote = _context.Notes.Include(n => n.NoteCategories).FirstOrDefault(n => n.Id == note.Id);
            if (existingNote == null)
            {
                return BadRequest("Note not found");
            }

            try
            {
                existingNote.Title = note.Title;
                existingNote.Content = note.Content;
                existingNote.Archived = note.Archived;
                existingNote.Created = note.Created;
                existingNote.Updated = note.Updated;

               
                existingNote.NoteCategories.Clear();
                foreach (var noteCategory in note.NoteCategories)
                {
                    existingNote.NoteCategories.Add(new NoteCategory
                    {
                        NoteId = note.Id,
                        CategoryId = noteCategory.CategoryId
                    });
                }

                _context.Notes.Update(existingNote);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status200OK, new { message = "ok" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }
        [HttpDelete]
[Route("Delete/{Id:int}")]
public IActionResult Delete(int Id)
{
    try
    {
        var note = _context.Notes.Include(n => n.NoteCategories).FirstOrDefault(p => p.Id == Id);
        if (note == null)
        {
            return BadRequest("Note not found");
        }

        // Remove the relationships from the NoteCategory table
        var noteCategories = _context.NoteCategories.Where(nc => nc.NoteId == Id).ToList();
        _context.NoteCategories.RemoveRange(noteCategories);

        // Remove the note itself
        _context.Notes.Remove(note);
        _context.SaveChanges();

        return StatusCode(StatusCodes.Status200OK, new { message = "ok" });
    }
    catch (Exception ex)
    {
        return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
    }
}

    }
}
