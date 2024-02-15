using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.ProfileDetails
{
    public class ExperienceDetailsUpdateRequest
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int Id { get; set; }
        [Required]
        public bool IsCurrent { get; set; }
        [Required]
        public string StartDate { get; set; }
        [Required]
        public string EndDate { get; set;}
        [Required]
        [MinLength(2), MaxLength(50)]
        public string JobTitle { get; set; }
        [Required]
        [MinLength(2), MaxLength(100)]
        public string CompanyName { get; set; }
        [Required]
        [MinLength(2), MaxLength(50)]
        public string City {  get; set; }
        [Required]
        [Range(1,51)]
        public int StateId { get; set; }
        [Required]
        [MinLength(2), MaxLength(50)]
        public string Country { get; set; }
        [Required]
        [MinLength(2), MaxLength(4000)]
        public string Description { get; set; }
    }
}
