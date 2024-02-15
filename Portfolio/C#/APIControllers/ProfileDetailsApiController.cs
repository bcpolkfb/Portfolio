using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models.Domain.Users;
using Sabio.Models.Requests.ProfileDetails;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/profiledetails/")]
    [ApiController]
    public class ProfileDetailsApiController : BaseApiController
    {
        private IProfileDetailsService _service = null;
        private IAuthenticationService<int> _authService = null;
        public ProfileDetailsApiController(
            IProfileDetailsService service,
            ILogger<ProfileDetailsApiController> logger,
            IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(ProfileDetailsAddRequest model)
        {
            int code = 201;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                int profileId = _service.Add(model, userId);
                response = new ItemResponse<int> { Item = profileId };
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpGet("check")]
        public ActionResult<ItemResponse<bool>> Check()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                bool hasProfile = _service.Check(userId);
                response = new ItemResponse<bool> { Item = hasProfile };
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpGet]
        public ActionResult<ItemResponse<UserProfile>> Get()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                UserProfile profile = _service.Get(userId);
                response = new ItemResponse<UserProfile> { Item = profile };
            }
            catch(Exception ex) 
            { 
                code = 500;
                response = new ErrorResponse(ex.Message);
                Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpPut("experience")]
        public ActionResult<SuccessResponse> UpdateExperience(List<ExperienceDetailsUpdateRequest> model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.UpdateExperience(model);
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

        [HttpPut("profile")]
        public ActionResult<SuccessResponse> UpdateProfileDetails(ProfileDetailsUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.UpdateProfileDetails(model);
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

        [HttpPut("education")]
        public ActionResult<SuccessResponse> UpdateEducationDetails(List<EducationDetailsUpdateRequest> model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.UpdateEducationDetails(model);
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

        [HttpPut("certification")]
        public ActionResult<SuccessResponse> UpdateCertification(List<CertificationUpdateRequest> model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.UpdateCertification(model);
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

        [HttpPut("skill")]
        public ActionResult<SuccessResponse> UpdateSkills(List<int> model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.UpdateSkills(model, userId);
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

        [HttpPut("tool")]
        public ActionResult<SuccessResponse> UpdateTools(List<int> model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.UpdateTools(model, userId);
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
