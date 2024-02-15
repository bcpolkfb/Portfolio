using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Users
{
    public class ProfileDetails
    {
        public int Id { get; set; }
        public int TitleTypeId { get; set; }
        public int GenderTypeId { get; set; }
        public string Phone {  get; set; }
        public string Fax { get; set; }
        public bool IsSearchable { get; set; }
        public bool HasActiveEmailNotification { get; set; }
        public decimal CurrentSalary { get; set; }
        public string Currency {  get; set; }
        public decimal TargetSalary { get; set; }
    }
}
