using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Users
{
    public class UserExperience
    {
        public int Id { get; set; }
        public bool IsCurrent { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string JobTitle { get; set; }
        public string CompanyName { get; set; }
        public string City { get; set; }
        public int StateId { get; set; }
        public string Country { get; set; }
        public string Description { get; set; }
    }
}
