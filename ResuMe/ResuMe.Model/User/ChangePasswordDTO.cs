using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Curriculum.Model.User
{
    public class ChangePasswordDTO
    {
        public string Password { get; set; }
        public string NewPassword { get; set; }
    }
}
