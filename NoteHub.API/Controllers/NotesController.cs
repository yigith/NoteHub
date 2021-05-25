using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NoteHub.API.Data;
using NoteHub.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace NoteHub.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class NotesController : ControllerBase
    {
        private readonly NoteHubDbContext _db;

        public string UserId => User.FindFirstValue(ClaimTypes.NameIdentifier);

        public NotesController(NoteHubDbContext context)
        {
            _db = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Note>> GetNotes()
        {
            return await _db.Notes
                            .Where(x => x.ApplicationUserId == UserId)
                            .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<Note> GetNote(int id)
        {
            return await _db.Notes
                            .FirstOrDefaultAsync(x => x.ApplicationUserId == UserId && x.Id == id);
        }

        [HttpPost]
        public async Task<ActionResult<Note>> PostNote(NewNoteModel model)
        {
            if (ModelState.IsValid)
            {
                var note = new Note()
                {
                    ApplicationUserId = UserId,
                    Title = model.Title,
                    Content = model.Content
                };
                _db.Notes.Add(note);
                await _db.SaveChangesAsync();
                return CreatedAtAction("GetNote", new { Id = note.Id }, note);
            }

            return BadRequest(ModelState);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutNote(int id, PutNoteModel model)
        {
            if (id != model.Id)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var note = await _db.Notes.FirstOrDefaultAsync(x => x.ApplicationUserId == UserId && x.Id == id);

            if (note == null)
                return NotFound();

            note.Title = model.Title;
            note.Content = model.Content;
            note.ModifiedTime = DateTime.Now;
            _db.Update(note);
            await _db.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNote(int id)
        {
            var note = await _db.Notes.FirstOrDefaultAsync(x => x.ApplicationUserId == UserId && x.Id == id);

            if (note == null)
                return NotFound();

            _db.Remove(note);
            await _db.SaveChangesAsync();
            return NoContent();
        }

    }
}
