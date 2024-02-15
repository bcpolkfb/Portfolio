using Sabio.Models.Domain.Comments;
using Sabio.Models.Requests.Comments;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Interfaces
{
    public interface ICommentService
    {
        public int Create(CommentAddRequest model, int userId);
        public List<Comment> GetByEntityId(int entityTypeId, int entityId);
        public void Update(CommentUpdateRequest model, int userId);
        public void Delete(int id);
    }
}
