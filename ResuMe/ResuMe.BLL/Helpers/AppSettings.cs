using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Curriculum.BLL.Helpers
{
    public class AppSettings
    {
        public string JWT_Secret { get; set; }
        public string Client_URL { get; set; }
        public string Version { get; set; }
    }
}
