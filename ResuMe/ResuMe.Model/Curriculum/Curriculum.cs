using Curriculum.Model.Projects;
using Curriculum.Model.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Curriculum.Model.Curriculums
{
    public class Curriculum
    {
        public int ID { get; set; }

        public List<CareerPath> CareerPath { get; set; } = new List<CareerPath>();
        public List<Education> Educations { get; set; } = new List<Education>();
        public List<Language> Languages { get; set; } = new List<Language>();
        public List<Technology> Technologies { get; set; } = new List<Technology>();
        public List<Tool> Tools { get; set; } = new List<Tool>();
        public List<Methodology> Methodologies { get; set; } = new List<Methodology>();
        public List<Project> Projects { get; set; } = new List<Project>();
    }
}
