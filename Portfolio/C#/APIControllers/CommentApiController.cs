using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Services.Interfaces;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Models.Requests.Comments;
using Sabio.Web.Models.Responses;
using System;
using Microsoft.AspNetCore.Components.Web.Virtualization;
using Sabio.Models.Domain.Comments;
using System.Data;
using System.Collections.Generic;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/comments")]
    [ApiController]
    public class CommentApiController : BaseApiController
    {
        private ICommentService _service = null;
        private IAuthenticationService<int> _authService = null;
        public CommentApiController(
            ICommentService service,
            ILogger<CommentApiController> logger,
            IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(CommentAddRequest model)
        {
            int code = 201;
            BaseResponse response = null;

            try
            { 
                int userId = _authService.GetCurrentUserId();
                int id = _service.Create(model, userId);
                response = new ItemResponse<int> { Item = id };
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpGet("{entitytypeid:int}/{entityid:int}")]
        public ActionResult<ItemsResponse<Comment>> GetByEntityId(int entityTypeId, int entityId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<Comment> list = _service.GetByEntityId(entityTypeId, entityId);

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Resource Not Found");
                }
                else
                {
                    response = new ItemsResponse<Comment> { Items = list };
                }
            }
            catch (Exception ex)
            {
                code =500;
                response = new ErrorResponse(ex.Message);
                Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(CommentUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.Update(model, userId);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.Delete(id);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }
    }
}
