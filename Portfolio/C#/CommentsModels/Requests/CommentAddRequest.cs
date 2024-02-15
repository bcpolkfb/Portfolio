using Sabio.Models.Domain.Comments;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Comments
{
    public class CommentAddRequest
    {
        [Required]
        [MinLength(2), MaxLength(50)]
        public string Subject { get; set; }
        [Required]
        [MinLength(2), MaxLength(3000)]
        public string Text { get; set; }
        [Required]
        [Range(0, int.MaxValue)]
        public int ParentId { get; set; }
        [Required]
        [Range(1, int.MaxValue)]
        public int EntityTypeId { get; set; }
        [Required]
        [Range(1, int.MaxValue)]
        public int EntityId { get; set; }
    }
}
