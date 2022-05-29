using Curriculum.BLL.BlobServices.Interfaces;
using Curriculum.BLL.Helpers;
using Curriculum.BLL.Interfaces;
using Curriculum.DAL.Interfaces;
using Curriculum.Model;
using Curriculum.Model.Curriculums;
using Curriculum.Model.Users;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Curriculum.BLL.Controllers
{
    public class CurriculumController : ICurriculumController
    {

        private UserManager<User> _identityUserManager;
        private ICurriculumManager _curriculumManager;
        private IUserBlobService _userBlobService;

        public CurriculumController(UserManager<User> identityUserManager, ICurriculumManager curriculumManager, IUserBlobService userBlobService)
        {
            _identityUserManager = identityUserManager;
            _curriculumManager = curriculumManager;
            _userBlobService = userBlobService;
        }

        #region generic methods

        public async Task<OperationRequest> AddCurriculumItem(Entity entity, string userID)
        {
            var user = await _identityUserManager.FindByIdAsync(userID);
            if (!entity.IsValid())
            {
                return new OperationRequest("Invalid "+entity.GetName()+".");
            }

            var curriculum = await _curriculumManager.GetCurriculum(userID);
            entity.CurriculumID = curriculum.ID;

            entity = await _curriculumManager.Add(entity);
            if (entity != null)
                return new OperationRequest(entity);

            return new OperationRequest("Can't add the "+ entity.GetName() + ".");
        }
        public async Task<OperationRequest> EditCurriculumItem<T>(Entity entity, string userID)
        {
            var user = await _identityUserManager.FindByIdAsync(userID);

            if (!entity.IsValid())
            {
                return new OperationRequest("Invalid " + entity.GetName() + ".");
            }

            var curriculum = await _curriculumManager.GetCurriculum(userID);

            var item = await _curriculumManager.Get<T>(entity.ID, curriculum.ID);

            if (item == null)
                return new OperationRequest(entity.GetName() + " not found.");

            item.Update(entity);

            item = await _curriculumManager.Edit(item);
            if (item != null)
                return new OperationRequest(item);

            return new OperationRequest("Can't edit the " + entity.GetName() + ".");
        }
        public async Task<OperationRequest> DeleteCurriculumItem<T>(int entityID, string userID)
        {
            var user = await _identityUserManager.FindByIdAsync(userID);
            var curriculum = await _curriculumManager.GetCurriculum(userID);

            var item = await _curriculumManager.Get<T>(entityID, curriculum.ID);

            if (item == null)
            {
                Entity instance = (Entity)Activator.CreateInstance<T>();
                return new OperationRequest(instance.GetName() + " not found.");
            }

            var result = _curriculumManager.Delete(item);
            if (result)
                return new OperationRequest(true);

            return new OperationRequest("Can't delete the "+ item.GetName() + ".");
        }

        #endregion
        public async Task<OperationRequest> GeneratePdf(string userName)
        {
            var user = await _identityUserManager.FindByNameAsync(userName);

            user.Curriculum  = await _curriculumManager.GetFullCurriculum(user.CurriculumID);
            user.ProfileImage = _userBlobService.GetProfileImage(user.Id);
            var result = new OperationRequest(new PdfBuilder().ManipulatePdf(user));
          
            return result;
        }


    }
}
