using Curriculum.DAL.Context;
using Curriculum.DAL.Interfaces;
using Curriculum.Model;
using Curriculum.Model.Curriculums;
using Curriculum.Model.Projects;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Curriculum.DAL.Managers
{
    public class CurriculumManager : ICurriculumManager
    {

        private MainContext _context;

        public CurriculumManager(MainContext context)
        {
            _context = context;
        }

        public async Task<Curriculum.Model.Curriculums.Curriculum> GetCurriculum(string userID)
        {
            var user = await _context.Users.Include(x => x.Curriculum).FirstOrDefaultAsync(x => x.Id == userID);
            return user.Curriculum;
        }

        public async Task<Curriculum.Model.Curriculums.Curriculum> GetFullCurriculum(int curriculumID)
        {
 
            var c = await _context.Curriculums
                .Include(x => x.Languages)
                .Include(x => x.Educations)
                .Include(x => x.Tools)
                .Include(x => x.Methodologies)
                .Include(x => x.Technologies)
                .Include(x => x.Projects)
                .Include(x => x.CareerPath)
                .FirstOrDefaultAsync(x => x.ID == curriculumID);
            return c;
        }

        public bool DeleteCurriculum(Model.Curriculums.Curriculum curriculum)
        {
            _context.Remove(curriculum);
            var result = _context.SaveChanges();
            return result > 0;
        }

        public async Task<Model.Curriculums.Curriculum> UpdateCurriculum(Model.Curriculums.Curriculum curriculum)
        {
            _context.Entry(curriculum).State = EntityState.Modified;
            var result = await _context.SaveChangesAsync();
            return result > 0 ? curriculum : null ;

        }


        #region generic methods
        public async Task<Entity> Add(Entity entity)
        {
            await _context.AddAsync(entity);
            var result = await _context.SaveChangesAsync();
            return result > 0 ? entity : null;
        }
        public async Task<Entity> Edit(Entity entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
            var result = await _context.SaveChangesAsync();
            return result > 0 ? entity : null;
        }
        public bool Delete(Entity entity)
        {
            _context.Remove(entity);
            var result = _context.SaveChanges();
            return result > 0;
        }
        public async Task<Entity> Get<T>(int entityID, int curriculumID)
        {
            if (typeof(T) == typeof(CareerPath))
                return await _context.CareerPaths.FirstOrDefaultAsync(x => x.ID == entityID && x.CurriculumID == curriculumID);

            if (typeof(T) == typeof(Methodology))
                return await _context.Methodologies.FirstOrDefaultAsync(x => x.ID == entityID && x.CurriculumID == curriculumID);

            if (typeof(T) == typeof(Education))
                return await _context.Educations.FirstOrDefaultAsync(x => x.ID == entityID && x.CurriculumID == curriculumID);

            if (typeof(T) == typeof(Tool))
                return await _context.Tools.FirstOrDefaultAsync(x => x.ID == entityID && x.CurriculumID == curriculumID);

            if (typeof(T) == typeof(Technology))
                return await _context.Technologies.FirstOrDefaultAsync(x => x.ID == entityID && x.CurriculumID == curriculumID);

            if (typeof(T) == typeof(Language))
                return await _context.Lenguages.FirstOrDefaultAsync(x => x.ID == entityID && x.CurriculumID == curriculumID);

            if (typeof(T) == typeof(Project))
                return await _context.Project.FirstOrDefaultAsync(x => x.ID == entityID && x.CurriculumID == curriculumID);
            return null;

        }
        #endregion
       
    }
}
