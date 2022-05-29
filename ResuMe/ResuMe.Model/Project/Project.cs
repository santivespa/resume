using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Curriculum.Model.Projects
{
    public class Project : Entity
    {
        public int ID { get; set; }
        public string ProjectName { get; set; }

        public string Client { get; set; }

        public string Dedication { get; set; }
        public string BusinessLine { get; set; }

        public string Description { get; set; }

        public string Role { get; set; }

        public string TechStack { get; set; }

        public string Location { get; set; }
        public int CurriculumID { get; set; }
        [NotMapped]
        public Curriculums.Curriculum Curriculum { get; set; }

        public string GetName()
        {
            return "Project";
        }

        public bool IsValid()
        {
            return
            !String.IsNullOrEmpty(this.ProjectName) ||
            !String.IsNullOrEmpty(this.Client) ||
            !String.IsNullOrEmpty(this.Dedication) ||
            !String.IsNullOrEmpty(this.BusinessLine) ||
            !String.IsNullOrEmpty(this.Description) ||
            !String.IsNullOrEmpty(this.Role) ||
            !String.IsNullOrEmpty(this.TechStack) ||
            !String.IsNullOrEmpty(this.Location);
        }

        public void Update(Entity entity)
        {
            var p = entity as Project;
            this.ProjectName = p.ProjectName;
            this.Client = p.Client;
            this.Dedication = p.Dedication;
            this.BusinessLine = p.BusinessLine;
            this.Description = p.Description;
            this.Role = p.Role;
            this.TechStack = p.TechStack;
            this.Location = p.Location;
        }
    }
}
