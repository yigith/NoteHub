using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NoteHub.API.Data
{
    public class NoteHubDbContext : IdentityDbContext<ApplicationUser>
    {
        public NoteHubDbContext(DbContextOptions<NoteHubDbContext> options) : base(options)
        {

        }
    }
}
