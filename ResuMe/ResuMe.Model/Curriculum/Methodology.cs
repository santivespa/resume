using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Curriculum.Model.Users.User;

namespace Curriculum.Model.Curriculums
{
    public class Methodology : Entity
    {
        public int ID { get; set; }
        public string Description { get; set; }
        public SkillLevel Level { get; set; }

        public int CurriculumID { get; set; }

        [NotMapped]
        public Curriculum Curriculum { get; set; }

        public string GetName()
        {
            return "Methodology";
        }

        public bool IsValid()
        {
            return !String.IsNullOrEmpty(this.Description);
        }

        public void Update(Entity entity)
        {

            this.Description = (entity as Methodology).Description;
            this.Level = (entity as Methodology).Level;
        }
    }
}
