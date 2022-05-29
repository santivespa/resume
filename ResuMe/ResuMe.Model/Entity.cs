using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Curriculum.Model
{
    public interface Entity
    {

        int ID { get; set; }
        int CurriculumID { get; set; }

        void Update(Entity entity);
        bool IsValid();


        string GetName();
    }
}
