using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Users
{
    public class UserProfile
    {
        public ProfileDetails ProfileDetails {  get; set; }
        public List<UserCertification> Certifications { get; set; }
        public List<UserEducation> EducationDetails { get; set; }
        public List<UserExperience> ExperienceDetails { get; set; }
        public List<LookUp> Skills { get; set; }
        public List<LookUp> Tools { get; set; }
    }
}
