using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Curriculum.Model.Curriculums
{
    public class Language : Entity
    {
        public int ID { get; set; }
        public string LanguageName { get; set; }
        public LenguageNivel Nivel { get; set; }

        public int CurriculumID { get; set; }

        [NotMapped]
        public Curriculum Curriculum { get; set; }

        public enum LenguageNivel
        {
            Beginner,
            Medium,
            Native
        }
        public string GetName()
        {
            return "Language";
        }

        public bool IsValid()
        {
            return !String.IsNullOrEmpty(this.LanguageName);
        }

        public void Update(Entity entity)
        {

            this.LanguageName = (entity as Language).LanguageName;
            this.Nivel = (entity as Language).Nivel;
        }
    }
}
