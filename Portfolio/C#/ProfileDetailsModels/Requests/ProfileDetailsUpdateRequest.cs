using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.ProfileDetails
{
    public class ProfileDetailsUpdateRequest
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int Id { get; set; }
        [Required]
        [Range(1, int.MaxValue)]
        public int TitleTypeId { get; set; }
        [Required]
        [Range(1, int.MaxValue)]
        public int GenderTypeId { get; set; }
        [Required]
        [MinLength(10), MaxLength(50)]
        public string Phone {  get; set; }
        [Required]
        [MinLength(10), MaxLength(50)]
        public string Fax { get; set; }
        [Required]
        public bool IsSearchable { get; set; }
        [Required]
        public bool HasActiveEmailNotification { get; set; }
        [Range(1, int.MaxValue)]
        public decimal? CurrentSalary { get; set; } = null;
        [MinLength(2), MaxLength(50)]
        public string Currency { get; set; } = null;
        [Range(1, int.MaxValue)]
        public decimal? TargetSalary { get; set; } = null;
    }
}
