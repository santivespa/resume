using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Curriculum.Model.Users
{
    public class UserDTO
    {
        private User user;

        public string Email { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public DateTime? Birthdate { get; set; }
        public string Experience { get; set; }
        public string Role { get; set; }
        public int? YearsOfExperience { get; set; }
        public string Linkedin { get; set; }
        public int? Years { get; set; }
        public string ProfileImage { get; set; }

        public bool CurrentUser { get; set; }
        public string CurrentUserName { get; set; }

        public Curriculums.Curriculum Curriculum { get; set; }

        public string Token { get; set; }

        public bool Private { get; set; }
       
        public UserDTO(User user, string? token)
        {
            this.UserName = user.UserName;
            this.FullName = user.FullName;
            this.Email = user.Email;
            this.Token = token;
            this.Private = user.Private;
            this.Linkedin = user.Linkedin;
            this.Role = user.Role;
            this.YearsOfExperience = user.YearsOfExperience;
            this.Birthdate = user.Birthdate;
            if (Birthdate != null)
            {
                this.Years = this.CalculateYears(Convert.ToDateTime(this.Birthdate));
            }
        }

        public UserDTO(User user, Curriculums.Curriculum curriculum, bool currentUser)
        {
            this.UserName = user.UserName;
            this.FullName = user.FullName;
            this.Email = user.Email;
            this.Curriculum = curriculum;
            this.CurrentUser = currentUser;
            this.Private = user.Private;
            this.Linkedin = user.Linkedin;
            this.Role = user.Role;
            this.YearsOfExperience = user.YearsOfExperience;
            this.Birthdate = user.Birthdate;
            if (Birthdate != null)
            {
                this.Years = this.CalculateYears(Convert.ToDateTime(this.Birthdate));
            }
        }

        public UserDTO(User user)
        {
            this.UserName = user.UserName;
            this.FullName = user.FullName;
            this.Email = user.Email;
            this.Private = user.Private;
            this.Linkedin = user.Linkedin;
            this.Role = user.Role;
            this.YearsOfExperience = user.YearsOfExperience;
            this.Birthdate = user.Birthdate;
            if (Birthdate != null)
            {
                this.Years = this.CalculateYears(Convert.ToDateTime(this.Birthdate));
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
