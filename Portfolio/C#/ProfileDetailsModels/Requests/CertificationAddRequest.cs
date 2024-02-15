﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.ProfileDetails
{
    public class CertificationAddRequest
    {
        [Required]
        [MinLength(2), MaxLength(100)]
        public string Name {  get; set; }
        [Required]
        [MinLength(2), MaxLength(500)]
        public string Description { get; set; }
        [Required]
        public DateOnly ExpireDate { get; set; }
        [Required]
        public DateOnly IssueDate { get; set; }
        [Required]
        [Range(1, int.MaxValue)]
        public int FileId { get; set; }
    }
}
