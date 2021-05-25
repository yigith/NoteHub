using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace NoteHub.API.Data
{
    public class Note
    {
        public int Id { get; set; }

        [Required]
        public string ApplicationUserId { get; set; }

        [Required, MaxLength(200)]
        public string Title { get; set; }

        public string Content { get; set; }

        [Required]
        public DateTime? CreatedTime { get; set; } = DateTime.Now;

        [Required]
        public DateTime? ModifiedTime { get; set; } = DateTime.Now;

    }
}
