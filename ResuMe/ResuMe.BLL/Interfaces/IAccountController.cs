using Curriculum.BLL.Helpers;
using Curriculum.Model.User;
using Curriculum.Model.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Curriculum.BLL.Interfaces
{
    public interface IAccountController
    {

        Task<OperationRequest> Register(RegisterDTO register);
        Task<OperationRequest> Login(Login login);
        Task<OperationRequest> Update(UpdateUserDTO updateUserDTO);

        Task<OperationRequest>  ChangePassword(ChangePasswordDTO changePasswordDTO, string userID);
        Task<OperationRequest> DeleteAccount(string userID, string password);

        Task<OperationRequest> UserProfile(string userID, string userName);

        Task<OperationRequest> GetBasicInfo(string userID, string userName);

        Task<OperationRequest> TogglePrivate(bool @private, string userID);

        Task<OperationRequest> RecoverPassword(string emailOrName);

        Task<OperationRequest> ResetPassword(ResetPasswordDTO resetPassDTO);

    }
}
