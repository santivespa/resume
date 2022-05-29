using Curriculum.BLL.Helpers;
using Curriculum.BLL.Interfaces;
using Curriculum.Model.User;
using Curriculum.Model.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;

namespace Curriculum.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class AccountController : Controller
    {
        private readonly IAccountController _accountController;
        private readonly IEmailSender _emailSender;
        private readonly UserManager<User> _userManager;
        private readonly AppSettings _appSettings;

        public AccountController(IOptions<AppSettings> appSettings, IAccountController accountController, UserManager<User> userManager, IEmailSender emailSender)
        {
            _accountController = accountController;
            _emailSender = emailSender;
            _userManager = userManager;
            _appSettings = appSettings.Value;
        }

        [HttpPost("register")]
        public async Task<OperationRequest> Register(RegisterDTO register)
        {
            try
            {
                return await _accountController.Register(register);
            }
            catch(Exception e)
            {
                return new OperationRequest(e.Message);
            }
        }

        [HttpPost("login")]
        public async Task<OperationRequest> Login(Login login)
        {
            try
            {
                return await _accountController.Login(login);
            }
            catch (Exception e)
            {
                return new OperationRequest(e.Message);
            }
        }

        [HttpPost("update")]
        [Authorize]
        public async Task<OperationRequest> Update(UpdateUserDTO update)
        {
            try
            {
                update.UserID = UserID;
                return await _accountController.Update(update);
            }
            catch (Exception e)
            {
                return new OperationRequest(e.Message);
            }
        }

        [HttpPost("change-password")]
        [Authorize]
        public async Task<OperationRequest> ChangePassword(ChangePasswordDTO changePasswordDTO)
        {
            try
            {
                return await _accountController.ChangePassword(changePasswordDTO, UserID);
            }
            catch (Exception e)
            {
                return new OperationRequest(e.Message);
            }
        }

        [HttpGet("user-profile/{userName?}")]
        public async Task<OperationRequest> UserProfile(string userName = "")
        {
            try
            {
                return await _accountController.UserProfile(UserID, userName);
            }
            catch (Exception e)
            {
                return new OperationRequest(e.Message);
            }
        }

        [HttpGet("get-basic-info/{userName?}")]
        public async Task<OperationRequest> GetBasicInfo(string userName = "")
        {
            try
            {
                return await _accountController.GetBasicInfo(UserID, userName);

            }
            catch(Exception e)
            {
                return new OperationRequest(e.Message);

            }
        }

        [HttpGet("delete-account/{password}")]
        [Authorize]
        public async Task<OperationRequest> DeleteAccount(string password)
        {
            try
            {
                return await _accountController.DeleteAccount(UserID, password);
            }
            catch (Exception e)
            {
                return new OperationRequest(e.Message);
            }
        }

        [HttpPost("toggle-private/{private}")]
        [Authorize]
        public async Task<OperationRequest> TogglePrivate(bool @private)
        {
            try
            {
                return await _accountController.TogglePrivate(@private, UserID);
            }
            catch (Exception e)
            {
                return new OperationRequest(e.Message);
            }
        }

        [HttpPost("recover-password/{emailOrName}")]
        public async Task<OperationRequest> RecoverPassword(string emailOrName)
        {
            try
            {
                var result = await _accountController.RecoverPassword(emailOrName);

                if (result.Succeeded)
                {

                    string email = (string) GetPropertyValue(result.Result, "Email"); 
                    string callBackUrl = (string)GetPropertyValue(result.Result, "CallBackUrl");
                    await _emailSender.SendEmailAsync(
                        email,
                        "Reset Password",
                        $"Please reset your password by <a href='{HtmlEncoder.Default.Encode(callBackUrl)}'>clicking here</a>.");

                    result.Result = null;
                }
                return result;
                 
  
            }
            catch (Exception e)
            {
                return new OperationRequest(e.Message);
            }
        }

        [HttpPost("reset-password")]
        public async Task<OperationRequest> ResetPassword(ResetPasswordDTO resetPassDTO)
        {
            try
            {
                return await _accountController.ResetPassword(resetPassDTO);
            }
            catch (Exception e)
            {
                return new OperationRequest(e.Message);
            }
        }

        public string UserID
        {
            get
            {
                var claim = User.Claims.FirstOrDefault(x => x.Type == "UserID");
                if (claim == null)
                    return "";
                return claim.Value;
               
            }
        }


        private static object GetPropertyValue(object obj, string name)
        {
            return obj == null ? null : obj.GetType().GetProperty(name).GetValue(obj, null);
        }
    }
}
