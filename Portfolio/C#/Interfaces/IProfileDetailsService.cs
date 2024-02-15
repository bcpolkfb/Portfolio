using Sabio.Models.Domain.Users;
using Sabio.Models.Requests.ProfileDetails;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Interfaces
{
    public interface IProfileDetailsService
    {
        public int Add(ProfileDetailsAddRequest model, int userId);
        public bool Check(int userId);
        public UserProfile Get(int userId);
        public void UpdateExperience(List<ExperienceDetailsUpdateRequest> model);
        public void UpdateProfileDetails(ProfileDetailsUpdateRequest model);
        public void UpdateEducationDetails(List<EducationDetailsUpdateRequest> model);
        public void UpdateCertification(List<CertificationUpdateRequest> model);
        public void UpdateSkills(List<int> model, int UserId);
        public void UpdateTools(List<int> model, int UserId);
    }
}
