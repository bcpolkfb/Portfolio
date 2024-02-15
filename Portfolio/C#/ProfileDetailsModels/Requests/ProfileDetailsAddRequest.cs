using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.ProfileDetails
{
    public class ProfileDetailsAddRequest
    {
        [Required]
        public List<EducationDetailsAddRequest> EducationDetails { get; set; }
        [Required]
        public List<ExperienceDetailsAddRequest> ExperienceDetails { get; set; }
        [Required]
        public List<CertificationAddRequest> Certifications { get; set; }
        [Required]
        public Profile Profile { get; set; }
        [Required]
        public List<int> Skills { get; set; }
        [Required]
        public List<int> Tools { get; set; }
    }
}
