using Sabio.Data.Providers;
using Sabio.Models.Requests.Comments;
using Sabio.Services.Interfaces;
using Sabio.Models.Domain.Comments;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Data;
using Sabio.Models.Domain.Users;
using Amazon.Runtime.Internal.Util;

namespace Sabio.Services
{
    public class CommentService : ICommentService
    {
        private IDataProvider _dataProvider;
        private ILookUpService _lookUpService;
        public CommentService(IDataProvider dataProvider, ILookUpService lookUpService)
        {
            _dataProvider = dataProvider;
            _lookUpService = lookUpService;
        }

        public int Create(CommentAddRequest model, int userId)
        {
            int id = 0;

            string procName = "[dbo].[Comments_Insert]";

            _dataProvider.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Subject", model.Subject);
                col.AddWithValue("@Text", model.Text);
                col.AddWithValue("@ParentId", model.ParentId);
                col.AddWithValue("@EntityTypeId", model.EntityTypeId);
                col.AddWithValue("@EntityId", model.EntityId);
                col.AddWithValue("@CreatedBy", userId);
                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;
                col.Add(idOut);
            }, returnParameters: delegate (SqlParameterCollection returnCol)
            {
                object outId = returnCol["@Id"].Value;
                Int32.TryParse(outId.ToString(), out id);
            });
            return id;
        }

        public List<Comment> GetByEntityId(int entityTypeId, int entityId)
        {
            List<Comment> list = null;

            Dictionary<int, List<Comment>> repliesByParentId = null;

            string procName = "[dbo].[Comments_Select_ByEntityId]";

            _dataProvider.ExecuteCmd(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@EntityTypeId", entityTypeId);
                col.AddWithValue("@EntityId", entityId);
            }, delegate (IDataReader reader, short set)
            {
                if (set == 0) 
                {
                    Comment root = MapSingleComment(reader);

                    if ( list == null)
                    {
                        list = new List<Comment>();
                    }

                    list.Add(root);
                }
                else if (set == 1)
                {
                    int parentId = reader.GetSafeInt32(3);

                    if (repliesByParentId == null)
                    {
                        repliesByParentId= new Dictionary<int, List<Comment>>();
                    }

                    if (!repliesByParentId.ContainsKey(parentId))
                    {
                        repliesByParentId[parentId] = new List<Comment>();
                    }
                    Comment reply = MapSingleComment(reader);
                    repliesByParentId[parentId].Add(reply);
                }

            });

            if (list != null)
            {
                foreach (Comment root in list) 
                {
                    int currentRoot = root.Id;

                    if (repliesByParentId == null)
                    {
                        repliesByParentId = new Dictionary<int, List<Comment>>();
                    }
                    if (repliesByParentId.ContainsKey(currentRoot))
                    {
                        root.Replies = repliesByParentId[currentRoot];
                    }
                }
            }

            return list;
        }

        public void Update(CommentUpdateRequest model, int userId)
        {
            string procName = "[dbo].[Comments_Update]";

            _dataProvider.ExecuteNonQuery(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Subject", model.Subject);
                col.AddWithValue("@Text", model.Text);
                col.AddWithValue("@Id", model.Id);
            }, returnParameters: null);
        }

        public void Delete(int id)
        {
            string procName = "[dbo].[Comments_Delete_ById]";

            _dataProvider.ExecuteNonQuery(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
            }, returnParameters: null);
        }

        private  Comment MapSingleComment(IDataReader reader)
        {
            Comment comment = new Comment();
            int startingIndex = 0;

            comment.Id = reader.GetSafeInt32(startingIndex++);
            comment.Subject = reader.GetSafeString(startingIndex++);
            comment.Text = reader.GetSafeString(startingIndex++);
            comment.ParentId = reader.GetSafeInt32(startingIndex++);
            comment.EntityType = _lookUpService.MapSingleLookUp(reader , ref startingIndex);
            comment.EntityId = reader.GetSafeInt32(startingIndex++);
            comment.DateCreated = reader.GetSafeDateTime(startingIndex++);
            comment.DateModified = reader.GetSafeDateTime(startingIndex++);
            comment.CreatedBy = reader.DeserializeObject<BaseUser>(startingIndex++);
            comment.IsDeleted = reader.GetSafeBool(startingIndex++);

            return comment;
        }
    }
}
