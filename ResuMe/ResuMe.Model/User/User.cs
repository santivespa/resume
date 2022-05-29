using Curriculum.Model.Projects;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Curriculum.Model.Curriculums;
using System.ComponentModel.DataAnnotations.Schema;

namespace Curriculum.Model.Users
{
    public class User : IdentityUser
    {
        public string FullName { get; set; }
        public DateTime? Birthdate { get; set; }
        public string Experience { get; set; }
        public string Role { get; set; }

        public int? YearsOfExperience { get; set; }
        public Curriculums.Curriculum Curriculum { get; set; }
        public int CurriculumID { get; set; }

        public bool Private { get; set; }

        public string Linkedin { get; set; }
        [NotMapped]
        public string ProfileImage { get; set; }

        public enum SkillLevel
        {
            Medium,
            High,
            Expert
        }
    }
}
