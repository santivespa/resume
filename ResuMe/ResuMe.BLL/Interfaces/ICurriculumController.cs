using Curriculum.BLL.Helpers;
using Curriculum.Model;
using Curriculum.Model.Curriculums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Curriculum.BLL.Interfaces
{
    public interface ICurriculumController
    {


        #region ABM Generic

        Task<OperationRequest> AddCurriculumItem(Entity entity, string userID);
        Task<OperationRequest> EditCurriculumItem<T>(Entity entity, string userID);
        Task<OperationRequest> DeleteCurriculumItem<T>(int entityID, string userID);

        #endregion


        Task<OperationRequest> GeneratePdf(string userName);
    }
}
