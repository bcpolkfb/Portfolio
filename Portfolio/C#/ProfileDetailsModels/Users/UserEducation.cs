using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Users
{
    public class UserEducation
    {
        public int Id { get; set; }
        public int DegreeTypeId { get; set; }
        public string Major {  get; set; }
        public string InstituteName { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public decimal GPA { get; set; }
        public decimal Percentage { get; set; }
    }
}
