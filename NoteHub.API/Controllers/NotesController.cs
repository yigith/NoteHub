using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NoteHub.API.Data;
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

    }
}
