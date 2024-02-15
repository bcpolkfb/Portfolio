﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Comments
{
    public class CommentUpdateRequest
    {
        [Required]
        [MinLength(2), MaxLength(50)]
        public string Subject { get; set; }
        [Required]
        [MinLength(2), MaxLength(3000)]
        public string Text { get; set; }
        [Required]
        [Range(1, int.MaxValue)]
        public int Id { get; set; }
    }
}
