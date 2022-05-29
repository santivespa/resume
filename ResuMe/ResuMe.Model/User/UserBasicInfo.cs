using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Curriculum.Model.User
{
    public class UserBasicInfo
    {
        public string Email { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string Experience { get; set; }
        public string Role { get; set; }
        public int? YearsOfExperience { get; set; }
        public string Linkedin { get; set; }
        public int? Years { get; set; }
        public string ProfileImage { get; set; }
        public bool Private { get; set; }
        public bool CurrentUser { get; set; }


        public UserBasicInfo(Users.User user, bool currentUser)
        {
            this.Email = user.Email;
            this.UserName = user.UserName;  
            this.FullName = user.FullName;
            this.Experience = user.Experience;
            this.Role = user.Role;
            this.YearsOfExperience = user.YearsOfExperience;
            this.Linkedin = user.Linkedin;
            this.CurrentUser = currentUser;
            this.Private = user.Private;
            if (user.Birthdate != null)
            {
                this.YearsOfExperience = this.CalculateYears(Convert.ToDateTime(user.Birthdate));
            }
        }

        private int CalculateYears(DateTime birthdate)
        {
            DateTime zeroTime = new DateTime(1, 1, 1);

            DateTime a = birthdate;
            DateTime b = DateTime.Now;

            TimeSpan span = b - a;

            int years = (zeroTime + span).Year - 1;
            return years;
        }
    }
}
