using Microsoft.AspNetCore.Http;
using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Users;
using Sabio.Models.Requests.ProfileDetails;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class ProfileDetailsService : IProfileDetailsService
    {
        IDataProvider _data = null;
        ILookUpService _lookUpService;

        public ProfileDetailsService(IDataProvider data, ILookUpService lookUpService)
        {
            _data = data;
            _lookUpService = lookUpService;
        }

        public int Add(ProfileDetailsAddRequest model, int userId)
        {
            int profileId = 0;
            string procName = "[dbo].[ProfileDetails_Insert]";
            DataTable educationTable = new DataTable();
            educationTable.Columns.Add("UserId", typeof(int));
            educationTable.Columns.Add("DegreeTypeId", typeof(int));
            educationTable.Columns.Add("Major", typeof(string));
            educationTable.Columns.Add("InstituteName", typeof(string));
            educationTable.Columns.Add("StartDate", typeof(string));
            educationTable.Columns.Add("EndDate", typeof(string));
            educationTable.Columns.Add("GPA", typeof(decimal));
            educationTable.Columns.Add("Percentage", typeof(decimal));

            if (model.EducationDetails != null && model.EducationDetails.Count > 0) 
            {
                foreach (var education in model.EducationDetails)
                {
                    DataRow educationRow = educationTable.NewRow();
                    educationRow["UserId"] = userId;
                    educationRow["DegreeTypeId"] = education.DegreeTypeId;
                    educationRow["Major"] = education.Major;
                    educationRow["InstituteName"] = education.InstituteName;
                    educationRow["StartDate"] = education.StartDate;
                    educationRow["EndDate"] = education.EndDate;
                    educationRow["GPA"] = education.GPA;
                    educationRow["Percentage"] = education.Percentage;
                    educationTable.Rows.Add(educationRow);
                }
            }
            DataTable experienceTable = new DataTable();
            experienceTable.Columns.Add("UserId", typeof(int));
            experienceTable.Columns.Add("IsCurrent", typeof(bool));
            experienceTable.Columns.Add("StartDate", typeof(string));
            experienceTable.Columns.Add("EndDate", typeof(string));
            experienceTable.Columns.Add("JobTitle", typeof(string));
            experienceTable.Columns.Add("CompanyName", typeof(string));
            experienceTable.Columns.Add("City", typeof(string));
            experienceTable.Columns.Add("State", typeof(string));
            experienceTable.Columns.Add("Country", typeof(string));
            experienceTable.Columns.Add("Description", typeof(string));

            if (model.ExperienceDetails != null && model.ExperienceDetails.Count > 0)
            {
                foreach (var experience in model.ExperienceDetails)
                {
                    DataRow experienceRow = experienceTable.NewRow();
                    experienceRow["UserId"] = userId;
                    experienceRow["IsCurrent"] = experience.IsCurrent;
                    experienceRow["StartDate"] = experience.StartDate;
                    experienceRow["EndDate"] = experience.EndDate;
                    experienceRow["JobTitle"] = experience.JobTitle;
                    experienceRow["CompanyName"] = experience.CompanyName;
                    experienceRow["City"] = experience.City;
                    experienceRow["State"] = experience.StateId;
                    experienceRow["Country"] = experience.Country;
                    experienceRow["Description"] = experience.Description;
                    experienceTable.Rows.Add(experienceRow);
                }
            }
            DataTable certTable = new DataTable();
            certTable.Columns.Add("UserId", typeof(int));
            certTable.Columns.Add("Name", typeof(string));
            certTable.Columns.Add("Description", typeof(string));
            certTable.Columns.Add("ExpireDate", typeof(string));
            certTable.Columns.Add("IssueDate", typeof(string));
            certTable.Columns.Add("FileId", typeof(int));

            if (model.Certifications != null && model.Certifications.Count > 0)
            {
                foreach (var certification in model.Certifications)
                {
                    DataRow certRow = certTable.NewRow();
                    certRow["UserId"] = userId;
                    certRow["Name"] = certification.Name;
                    certRow["Description"] = certification.Description;
                    certRow["ExpireDate"] = certification.ExpireDate;
                    certRow["IssueDate"] = certification.IssueDate;
                    certRow["FileId"] = certification.FileId;
                    certTable.Rows.Add(certRow);
                }
            }
            DataTable skillTable = new DataTable();
            skillTable.Columns.Add("SkillId", typeof(int));

            if (model.Skills != null && model.Skills.Count > 0)
            {
                foreach (var skill in model.Skills)
                {
                    DataRow skillRow = skillTable.NewRow();
                    skillRow["SkillId"] = skill;
                    skillTable.Rows.Add(skillRow);
                }
            }
            DataTable toolTable = new DataTable();
            toolTable.Columns.Add("ToolsUtilizedId", typeof(int));

            if (model.Tools != null && model.Tools.Count > 0)
            {
                foreach (var tool in model.Tools)
                {
                    DataRow toolRow = toolTable.NewRow();
                    toolRow["ToolsUtilizedId"] = tool;
                    toolTable.Rows.Add(toolRow);
                }
            }
            _data.ExecuteNonQuery(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@UserId", userId);
                col.AddWithValue("@Education", educationTable);
                col.AddWithValue("@Experience", experienceTable);
                col.AddWithValue("@Certifications", certTable);
                col.AddWithValue("@TitleTypeId", model.Profile.TitleTypeId);
                col.AddWithValue("@GenderTypeId", model.Profile.GenderTypeId);
                col.AddWithValue("@Phone", model.Profile.Phone);
                col.AddWithValue("@Fax", model.Profile.Fax);
                col.AddWithValue("@IsSearchable", model.Profile.IsSearchable);
                col.AddWithValue("@HasActiveEmailNotification", model.Profile.HasActiveEmailNotification);
                col.AddWithValue("@CurrentSalary", model.Profile.CurrentSalary);
                col.AddWithValue("@Currency", model.Profile.Currency);
                col.AddWithValue("@TargetSalary", model.Profile.TargetSalary);
                col.AddWithValue("@Skills", skillTable);
                col.AddWithValue("@Tools", toolTable);
                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;
                col.Add(idOut);
            }, delegate (SqlParameterCollection returnCol)
            {
                object outId = returnCol["@Id"].Value;
                Int32.TryParse(outId.ToString(), out profileId);
            });
            return profileId;
        }

        public bool Check(int userId)
        {
            bool hasProfile = true;
            string procName = "[dbo].[ProfileDetails_CheckUserId]";
            _data.ExecuteCmd(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@UserId", userId);
            }, delegate (IDataReader reader, short set)
            {
                int result = reader.GetSafeInt32(0);
                if (result == 0)
                {
                    hasProfile = false;
                }
            });
            return hasProfile;
        }

        public UserProfile Get(int userId)
        {
            UserProfile profile = null;
            ProfileDetails details = null;
            List<UserCertification> certifications = null;
            List<UserEducation> education = null;
            List<UserExperience> experience = null;
            List<LookUp> skills = null;
            List<LookUp> tools = null;

            string procName = "[dbo].[ProfileDetails_Select_ByUserId]";
            _data.ExecuteCmd(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@UserId", userId);
            }, delegate (IDataReader reader, short set)
            {
                profile = new UserProfile();
                if (set == 0)
                {
                    details = new ProfileDetails();
                    int startingIndex = 0;
                    details.Id = reader.GetSafeInt32(startingIndex++);
                    details.TitleTypeId = reader.GetSafeInt32(startingIndex++);
                    details.GenderTypeId = reader.GetSafeInt32(startingIndex++);
                    details.Phone = reader.GetSafeString(startingIndex++);
                    details.Fax = reader.GetSafeString(startingIndex++);
                    details.IsSearchable = reader.GetSafeBool(startingIndex++);
                    details.HasActiveEmailNotification = reader.GetSafeBool(startingIndex++);
                    details.CurrentSalary = reader.GetSafeDecimal(startingIndex++);
                    details.Currency = reader.GetSafeString(startingIndex++);
                    details.TargetSalary = reader.GetSafeDecimal(startingIndex++);
                    profile.ProfileDetails = details;
                }

                if (set == 1)
                {
                    UserCertification cert = new UserCertification(); 
                    int startingIndex = 0;
                    cert.Id = reader.GetSafeInt32(startingIndex++);
                    cert.Name = reader.GetSafeString(startingIndex++);
                    cert.Description = reader.GetSafeString(startingIndex++);
                    cert.ExpireDate = reader.GetSafeDateTime(startingIndex++).ToString().Substring(0, 10);
                    cert.IssueDate = reader.GetSafeDateTime(startingIndex++).ToString().Substring(0, 10);
                    cert.FileId = reader.GetSafeInt32(startingIndex++);
                    certifications ??= new List<UserCertification>();
                    certifications.Add(cert);
                }

                if (set == 2)
                {
                    UserEducation edu = new UserEducation();
                    int startingIndex = 0;
                    edu.Id = reader.GetSafeInt32(startingIndex++);
                    edu.DegreeTypeId = reader.GetSafeInt32(startingIndex++);
                    edu.Major = reader.GetSafeString(startingIndex++);
                    edu.InstituteName = reader.GetSafeString(startingIndex++);
                    edu.StartDate = reader.GetSafeDateTime(startingIndex++).ToString().Substring(0, 10);
                    edu.EndDate = reader.GetSafeDateTime(startingIndex++).ToString().Substring(0, 10);
                    edu.GPA = reader.GetSafeDecimal(startingIndex++);
                    edu.Percentage = reader.GetSafeDecimal(startingIndex++);
                    education ??= new List<UserEducation>();
                    education.Add(edu);
                }

                if (set == 3)
                {
                    UserExperience exp = new UserExperience();
                    LookUp state = new LookUp();
                    int startingIndex = 0;
                    exp.Id = reader.GetSafeInt32(startingIndex++);
                    exp.IsCurrent = reader.GetSafeBool(startingIndex++);
                    exp.StartDate = reader.GetSafeDateTime(startingIndex++).ToString().Substring(0, 10);
                    exp.EndDate = reader.GetSafeDateTime(startingIndex++).ToString().Substring(0, 10);
                    exp.JobTitle = reader.GetSafeString(startingIndex++);
                    exp.CompanyName = reader.GetSafeString(startingIndex++);
                    exp.City = reader.GetSafeString(startingIndex++);
                    exp.StateId = reader.GetSafeInt32(startingIndex++);
                    exp.Country = reader.GetSafeString(startingIndex++);
                    exp.Description = reader.GetSafeString(startingIndex++);
                    experience ??= new List<UserExperience>();
                    experience.Add(exp);
                }

                if (set == 4)
                {
                    LookUp skill;
                    int startingIndex = 0;
                    skill = _lookUpService.MapSingleLookUp(reader, ref startingIndex);
                    skills ??= new List<LookUp>();
                    skills.Add(skill);
                }

                if (set == 5)
                {
                    LookUp tool;
                    int startingIndex = 0;
                    tool = _lookUpService.MapSingleLookUp(reader, ref startingIndex);
                    tools ??= new List<LookUp>();
                    tools.Add(tool);
                }
                profile.ProfileDetails = details;
                profile.Certifications = certifications;
                profile.EducationDetails = education;
                profile.ExperienceDetails = experience;
                profile.Skills = skills;
                profile.Tools = tools;
            });
            return profile;
        }

        public void UpdateExperience(List<ExperienceDetailsUpdateRequest> model)
        {
            string procName = "[dbo].[ExperienceDetails_Update]";

            DataTable experienceTable = new DataTable();
            experienceTable.Columns.Add("Id", typeof(int));
            experienceTable.Columns.Add("IsCurrent", typeof(bool));
            experienceTable.Columns.Add("StartDate", typeof(string));
            experienceTable.Columns.Add("EndDate", typeof(string));
            experienceTable.Columns.Add("JobTitle", typeof(string));
            experienceTable.Columns.Add("CompanyName", typeof(string));
            experienceTable.Columns.Add("City", typeof(string));
            experienceTable.Columns.Add("State", typeof(string));
            experienceTable.Columns.Add("Country", typeof(string));
            experienceTable.Columns.Add("Description", typeof(string));

            if (model != null && model.Count > 0)
            {
                foreach (var experience in model)
                {
                    DataRow experienceRow = experienceTable.NewRow();
                    experienceRow["Id"] = experience.Id;
                    experienceRow["IsCurrent"] = experience.IsCurrent;
                    experienceRow["StartDate"] = experience.StartDate;
                    experienceRow["EndDate"] = experience.EndDate;
                    experienceRow["JobTitle"] = experience.JobTitle;
                    experienceRow["CompanyName"] = experience.CompanyName;
                    experienceRow["City"] = experience.City;
                    experienceRow["State"] = experience.StateId;
                    experienceRow["Country"] = experience.Country;
                    experienceRow["Description"] = experience.Description;
                    experienceTable.Rows.Add(experienceRow);
                }
            }

            _data.ExecuteNonQuery(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@BatchExperience", experienceTable);
            }, null);
        }

        public void UpdateProfileDetails(ProfileDetailsUpdateRequest model)
        {
            string procName = "[dbo].[ProfileDetails_Update]";

            _data.ExecuteNonQuery(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", model.Id);
                col.AddWithValue("@TitleTypeId", model.TitleTypeId);
                col.AddWithValue("@GenderTypeId", model.GenderTypeId);
                col.AddWithValue("@Phone", model.Phone);
                col.AddWithValue("@Fax", model.Fax);
                col.AddWithValue("@IsSearchable", model.IsSearchable);
                col.AddWithValue("@HasActiveEmailNotification", model.HasActiveEmailNotification);
                col.AddWithValue("@CurrentSalary", model.CurrentSalary);
                col.AddWithValue("@Currency", model.Currency);
                col.AddWithValue("@TargetSalary", model.TargetSalary);
            }, null);
        }

        public void UpdateEducationDetails(List<EducationDetailsUpdateRequest> model)
        {
            string procName = "[dbo].[EducationDetails_Update]";

            DataTable educationTable = new DataTable();
            educationTable.Columns.Add("Id", typeof(int));
            educationTable.Columns.Add("DegreeTypeId", typeof(int));
            educationTable.Columns.Add("Major", typeof(string));
            educationTable.Columns.Add("InstituteName", typeof(string));
            educationTable.Columns.Add("StartDate", typeof(string));
            educationTable.Columns.Add("EndDate", typeof(string));
            educationTable.Columns.Add("GPA", typeof(decimal));
            educationTable.Columns.Add("Percentage", typeof(decimal));

            if (model != null && model.Count > 0)
            {
                foreach (var education in model)
                {
                    DataRow educationRow = educationTable.NewRow();
                    educationRow["Id"] = education.Id;
                    educationRow["DegreeTypeId"] = education.DegreeTypeId;
                    educationRow["Major"] = education.Major;
                    educationRow["InstituteName"] = education.InstituteName;
                    educationRow["StartDate"] = education.StartDate;
                    educationRow["EndDate"] = education.EndDate;
                    educationRow["GPA"] = education.GPA;
                    educationRow["Percentage"] = education.Percentage;
                    educationTable.Rows.Add(educationRow);
                }
            }
            _data.ExecuteNonQuery(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@BatchEducation", educationTable);
            }, null);
        }

        public void UpdateCertification(List<CertificationUpdateRequest> model)
        {
            string procName = "[dbo].[Certifications_Update]";

            DataTable certTable = new DataTable();
            certTable.Columns.Add("Id", typeof(int));
            certTable.Columns.Add("Name", typeof(string));
            certTable.Columns.Add("Description", typeof(string));
            certTable.Columns.Add("ExpireDate", typeof(string));
            certTable.Columns.Add("IssueDate", typeof(string));
            certTable.Columns.Add("FileId", typeof(int));

            if (model != null && model.Count > 0)
            {
                foreach (CertificationUpdateRequest certification in model)
                {
                    DataRow certRow = certTable.NewRow();
                    certRow["Id"] = certification.Id;
                    certRow["Name"] = certification.Name;
                    certRow["Description"] = certification.Description;
                    certRow["ExpireDate"] = certification.ExpireDate;
                    certRow["IssueDate"] = certification.IssueDate;
                    certRow["FileId"] = certification.FileId;
                    certTable.Rows.Add(certRow);
                }
            }
            _data.ExecuteNonQuery(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@BatchCertifications", certTable);
            }, null);
        }

        public void UpdateSkills(List<int> model, int UserId)
        {
            string procName = "[dbo].[UserSkills_Insert]";

            DataTable skillTable = new DataTable();
            skillTable.Columns.Add("SkillId", typeof(int));

            if (model != null && model.Count > 0)
            {
                foreach (int skillId in model)
                {
                    DataRow skillRow = skillTable.NewRow();
                    skillRow["SkillId"] = skillId;
                    skillTable.Rows.Add(skillRow);
                }
            }
            _data.ExecuteNonQuery(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@BatchSkills", skillTable);
                col.AddWithValue("@UserId", UserId);
            }, null);
        }

        public void UpdateTools(List<int> model, int UserId)
        {
            string procName = "[dbo].[UserTools_Insert]";

            DataTable toolTable = new DataTable();
            toolTable.Columns.Add("ToolsUtilizedId", typeof(int));

            if (model != null && model.Count > 0)
            {
                foreach (int toolId in model)
                {
                    DataRow toolRow = toolTable.NewRow();
                    toolRow["ToolsUtilizedId"] = toolId;
                    toolTable.Rows.Add(toolRow);
                }
            }
            _data.ExecuteNonQuery(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@BatchTools", toolTable);
                col.AddWithValue("@UserId", UserId);
            }, null);
        }
    }
}
