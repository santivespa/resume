using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Curriculum.Model.Curriculums
{
    public class Education : Entity
    {
        public int ID { get; set; }

        public string Title { get; set; }

        public string Institution { get; set; }

        public string Period { get; set; }

        public int CurriculumID { get; set; }

        [NotMapped]
        public Curriculum Curriculum { get; set; }


        public bool IsValid()
        {
            return !String.IsNullOrEmpty(this.Title) && !String.IsNullOrEmpty(this.Period) && !String.IsNullOrEmpty(this.Institution);
        }

        public string GetName()
        {
            return "Education";
        }


        public void Update(Entity entity)
        {
            this.Title = (entity as Education).Title;
            this.Institution = (entity as Education).Institution;
            this.Period = (entity as Education).Period;
        }

    }
}
