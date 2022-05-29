using Curriculum.Model;
using Curriculum.Model.Curriculums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Curriculum.Model.Curriculums;

namespace Curriculum.DAL.Interfaces
{
    public interface ICurriculumManager
    {

        Task<Model.Curriculums.Curriculum> GetCurriculum(string userID);
        Task<Model.Curriculums.Curriculum> GetFullCurriculum(int curriculumID);
        
        bool DeleteCurriculum(Model.Curriculums.Curriculum curriculum);

        Task<Model.Curriculums.Curriculum> UpdateCurriculum(Model.Curriculums.Curriculum curriculum);

        #region Generic

        Task<Entity> Add(Entity entity);
        Task<Entity> Edit(Entity entity);
        bool Delete(Entity entity);

        Task<Entity> Get<T>(int entityID,int curriculumID);

        #endregion
    }
}
