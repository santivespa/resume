using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Curriculum.Model.Curriculums
{
    public class CareerPath : Entity
    {
        public int ID { get; set; }

        public string Company { get; set; }

        public string Period { get; set; }

        public string Role { get; set; }

        public int CurriculumID { get; set; }

        [NotMapped]
        public Curriculum Curriculum { get; set; }

        public string GetName()
        {
            return "Career Path";
        }

        public bool IsValid()
        {
            return !String.IsNullOrEmpty(Company) && !String.IsNullOrEmpty(Period) && !String.IsNullOrEmpty(Role);
        }

        public void Update(Entity entity)
        {
            var carrerPath = entity as CareerPath;
            this.Company = carrerPath.Company;
            this.Period = carrerPath.Period;
            this.Role = carrerPath.Role;
        }
    }
}
