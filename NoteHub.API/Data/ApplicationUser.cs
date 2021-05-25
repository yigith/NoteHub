using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NoteHub.API.Data
{
    public class ApplicationUser : IdentityUser
    {
        public List<Note> Notes { get; set; }
    }
}
