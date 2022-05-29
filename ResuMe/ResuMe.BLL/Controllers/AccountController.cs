using Curriculum.BLL.Helpers;
using Curriculum.BLL.Interfaces;
using Curriculum.Model.Users;
using Curriculum.Model.Curriculums;

using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Curriculum.DAL.Interfaces;
using Curriculum.Model.User;
using Curriculum.BLL.BlobServices.Interfaces;
using Microsoft.AspNetCore.WebUtilities;

namespace Curriculum.BLL.Controllers
{
    public class AccountController : IAccountController
    {
        private UserManager<User> _identityUserManager;
        private SignInManager<User> _signInManager;
        private AppSettings _appSettings;

        private ICurriculumManager _curriculumManager;
        private IUserBlobService _userBlobService;

        public AccountController
            (UserManager<User> identityUserManager,
            SignInManager<User> signInManager,
            IOptions<AppSettings> appSettings,
            IUserBlobService userBlobService,
            ICurriculumManager curriculumManager)
        {
            _identityUserManager = identityUserManager;
            _signInManager = signInManager;
            _appSettings = appSettings.Value;
            _curriculumManager = curriculumManager;
            _userBlobService = userBlobService;
        }

        public async Task<OperationRequest> Register(RegisterDTO register)
        {

            var user = new User();

            user.Email = register.Email;
            user.UserName = register.UserName;
            user.FullName = register.FullName;
            user.Curriculum = new Curriculum.Model.Curriculums.Curriculum();
            var result = await _identityUserManager.CreateAsync(user, register.Password);

            if (!result.Succeeded)
            {
                result.Errors.GetEnumerator().MoveNext();
                foreach (var item in result.Errors)
                {
                    return new OperationRequest(item.Description);
                }
            }

            return new OperationRequest(true);
        }
        public async Task<OperationRequest> Login(Login login)
        {

            var user = await _identityUserManager.FindByNameAsync(login.EmailOrName);
            if (user == null)
                user = await _identityUserManager.FindByEmailAsync(login.EmailOrName);

            if (user == null)
                return new OperationRequest("Invalid credentials");

            var validCredentials = await _signInManager.UserManager.CheckPasswordAsync(user, login.Password);

            if (validCredentials)
            {
                var token = TokenHelper.GenerateToken(user, _appSettings);
                var userDTO = new UserDTO(user, token);
                return new OperationRequest(userDTO);
            }
            else
            {
                return new OperationRequest("Invalid credentials");
            }

        }
        public async Task<OperationRequest> Update(UpdateUserDTO updateUserDTO)
        {
            var user = await _identityUserManager.FindByIdAsync(updateUserDTO.UserID);
            if (user == null)
                return new OperationRequest("Can't find user");


            user.FullName = updateUserDTO.FullName;
            user.UserName = updateUserDTO.UserName;
            user.Linkedin = updateUserDTO.Linkedin;
            if (updateUserDTO.Birthdate != null)
                user.Birthdate = Convert.ToDateTime(updateUserDTO.Birthdate);
            user.YearsOfExperience = updateUserDTO.YearsOfExperience;
            user.Role = updateUserDTO.Role;
            var updateResult = await _identityUserManager.UpdateAsync(user);

            if (!updateResult.Succeeded)
                return new OperationRequest(this.GetFirstError(updateResult));

            if (!String.IsNullOrEmpty(updateUserDTO.ProfileImage) && updateUserDTO.ProfileImage.Contains("base64"))
                await _userBlobService.SaveProfileImage(updateUserDTO.ProfileImage, user.Id);

            var userDTO = new UserDTO(user);
            return new OperationRequest(userDTO);

        }
        public async Task<OperationRequest> ChangePassword(ChangePasswordDTO changePasswordDTO, string userID)
        {

            var user = await _identityUserManager.FindByIdAsync(userID);
            if (user == null)
                return new OperationRequest("Can't find user");

            var result = await _signInManager.UserManager.CheckPasswordAsync(user, changePasswordDTO.Password);

            if (result)
            {

                var changePasswordResult = await _identityUserManager.ChangePasswordAsync(user, changePasswordDTO.Password, changePasswordDTO.NewPassword);
                if (changePasswordResult.Succeeded)
                {
                    return new OperationRequest(true);
                }
                else
                {
                    return new OperationRequest(GetFirstError(changePasswordResult));
                }
            }
            else
            {
                return new OperationRequest("Invalid current password");
            }
        }
        public async Task<OperationRequest> DeleteAccount(string userID, string password)
        {
            var user = await _identityUserManager.FindByIdAsync(userID);
            if (user == null)
                return new OperationRequest("Can't find user");

            var result = await _signInManager.UserManager.CheckPasswordAsync(user, password);

            if (result)
            {
                var curriculum = await _curriculumManager.GetCurriculum(userID);

                var deleteResult = await _identityUserManager.DeleteAsync(user);

                if (deleteResult.Succeeded)
                {
                    if (curriculum != null)
                    {
                        _curriculumManager.DeleteCurriculum(curriculum);
                    }
                    await _userBlobService.DeleteProfileImage(userID);
                    return new OperationRequest(true);

                }
                else
                {
                    return new OperationRequest(this.GetFirstError(deleteResult));
                }
            }
            else
            {
                return new OperationRequest("Invalid password");

            }
        }
        public async Task<OperationRequest> UserProfile(string userID, string userName)
        {
            UserDTO userToReturn = null;
            User userByName = null;
            var currentUser = await _identityUserManager.FindByIdAsync(userID);

            if (!String.IsNullOrEmpty(userName))
                userByName = await _identityUserManager.FindByNameAsync(userName);

            if (!String.IsNullOrEmpty(userName) && userByName != null && userByName.Id != userID)
            {

                var curriculum = await _curriculumManager.GetFullCurriculum(userByName.CurriculumID);
                if (userByName.Private)
                {
                    return new OperationRequest(OperationRequest.ErrorCode.userNotFound);
                }
                else
                {
                    userToReturn = new UserDTO(userByName, curriculum, userByName.Id == userID);
                    if (currentUser != null)
                        userToReturn.CurrentUserName = currentUser.UserName;
                    return new OperationRequest(userToReturn);
                }
            }
            else
            {

                if (userByName == null && !String.IsNullOrEmpty(userName))
                {
                    return new OperationRequest(OperationRequest.ErrorCode.userNotFound);

                }

                if (currentUser == null)
                    return new OperationRequest(OperationRequest.ErrorCode.userNotFound);

                var curriculum = await _curriculumManager.GetFullCurriculum(currentUser.CurriculumID);
                userToReturn = new UserDTO(currentUser, curriculum, true);
                userToReturn.ProfileImage = _userBlobService.GetProfileImage(currentUser.Id);

                return new OperationRequest(userToReturn);
            }
        }


        public async Task<OperationRequest> GetBasicInfo(string userID, string userName)
        {

            var user = await _identityUserManager.FindByIdAsync(userID);
            var userToReturn = user;

            if (user == null || (user.UserName != userName && !String.IsNullOrEmpty(userName)))
            {
                userToReturn = await _identityUserManager.FindByIdAsync(userName);
            }

            if (userToReturn == null || (userName != null && userToReturn.UserName != userName && userToReturn.Private))
            {
                return new OperationRequest(OperationRequest.ErrorCode.userNotFound);
            }

            var userBasicInfo = new UserBasicInfo(userToReturn, user != null);
            userBasicInfo.ProfileImage = _userBlobService.GetProfileImage(userToReturn.Id);

            return new OperationRequest(userBasicInfo);
        }


        public async Task<OperationRequest> TogglePrivate(bool @private, string userID)
        {
            var user = await _identityUserManager.FindByIdAsync(userID);
            if (user == null)
                return new OperationRequest("Can't find user");
            user.Private = @private;
            var result = await _identityUserManager.UpdateAsync(user);
            if (result != null)
                return new OperationRequest(result);
            return new OperationRequest("Can't edit user.");
        }

        public async Task<OperationRequest> RecoverPassword(string emailOrName)
        {
            var user = await _identityUserManager.FindByEmailAsync(emailOrName);
            if (user == null)
                user = await _identityUserManager.FindByNameAsync(emailOrName);

            if (user != null)
            {
                var tokenGenerated = await _identityUserManager.GeneratePasswordResetTokenAsync(user);
                byte[] tokenGeneratedBytes = Encoding.UTF8.GetBytes(tokenGenerated);
                var codeEncoded = WebEncoders.Base64UrlEncode(tokenGeneratedBytes);

                var callbackUrl = $"{_appSettings.Client_URL}/#/reset-password/{codeEncoded}/{user.Email}";

                return new OperationRequest(new { 
                    Email = user.Email,
                    CallBackUrl = callbackUrl
                });
            }
            return new OperationRequest(true);
        }

        public async Task<OperationRequest> ResetPassword(ResetPasswordDTO resetPassDTO)
        {
            var user = await _identityUserManager.FindByEmailAsync(resetPassDTO.Email);

            if (user != null)
            {
                var codeDecodedBytes = WebEncoders.Base64UrlDecode(resetPassDTO.Token);
                var codeDecoded = Encoding.UTF8.GetString(codeDecodedBytes);

                var result = await _identityUserManager.ResetPasswordAsync(user, codeDecoded, resetPassDTO.Password);
                if (result.Succeeded)
                {
                    return new OperationRequest(true);
                }
                else
                {
                    return new OperationRequest(GetFirstError(result));

                }
            }

            return new OperationRequest("User not found.");
        }


        private string GetFirstError(IdentityResult result)
        {
            var error = "";
            result.Errors.GetEnumerator().MoveNext();
            foreach (var item in result.Errors)
            {
                error = item.Description;
            }
            return error;
        }

    }
}
