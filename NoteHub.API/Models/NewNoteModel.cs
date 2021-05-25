﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace NoteHub.API.Models
{
    public class NewNoteModel
    {
        [Required, MaxLength(200)]
        public string Title { get; set; }

        public string Content { get; set; }
    }
}
