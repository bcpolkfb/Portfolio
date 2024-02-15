using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.ProfileDetails
{
    public class EducationDetailsAddRequest
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int DegreeTypeId { get; set; }
        [Required]
        [MinLength(2), MaxLength(50)]
        public string Major {  get; set; }
        [Required]
        [MinLength(2), MaxLength(50)]
        public string InstituteName { get; set; }
        [Required]
        public DateOnly StartDate { get; set; }
        [Required]
        public DateOnly EndDate { get; set; }
        [Required]
        [Range(0, 6)]
        public decimal GPA { get; set; }
        [Required]
        [Range (0, 100)]
        public decimal Percentage { get; set; }
    }
}
