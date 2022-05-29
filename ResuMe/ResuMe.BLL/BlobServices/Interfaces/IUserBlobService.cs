using Curriculum.Model.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Curriculum.BLL.BlobServices.Interfaces
{
    public interface IUserBlobService
    {
        string GetProfileImage(string userID);

        Task SaveProfileImage(string image, string userID);


        Task DeleteProfileImage(string userID);
    }
}
