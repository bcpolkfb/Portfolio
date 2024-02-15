using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.ProfileDetails
{
    public class EducationDetailsUpdateRequest
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int Id { get; set; }
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
        public string StartDate {  get; set; }
        [Required]
        public string EndDate { get; set; }
        [Required]
        [Range(1, 6)]
        public decimal GPA { get; set; }
        [Required]
        [Range(1, 100)]
        public decimal Percentage { get; set; }
    }
}
