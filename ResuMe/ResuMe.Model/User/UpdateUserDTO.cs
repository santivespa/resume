using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Curriculum.Model.Users
{
    public class UpdateUserDTO
    {
        public string UserID { get; set; }
        public string FullName { get; set; }
        public string UserName { get; set; }
        public DateTime? Birthdate { get; set; }
        public string Experience { get; set; }
        public string Role { get; set; }
        public int? YearsOfExperience { get; set; }
        public string Password { get; set; }
        public string ProfileImage { get; set; }
        public string Linkedin { get; set; }
    }
}
