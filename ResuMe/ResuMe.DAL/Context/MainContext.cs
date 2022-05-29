using Curriculum.Model.Curriculums;
using Curriculum.Model.Projects;
using Curriculum.Model.Users;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Curriculum.DAL.Context
{
    public class MainContext : IdentityDbContext<User>
    {
        public DbSet<Model.Curriculums.Curriculum> Curriculums { get; set; }
        public DbSet<Language> Lenguages { get; set; }
        public DbSet<Education> Educations { get; set; }
        public DbSet<Methodology> Methodologies { get; set; }
        public DbSet<Technology> Technologies { get; set; }
        public DbSet<CareerPath> CareerPaths { get; set; }
        public DbSet<Tool> Tools { get; set; }
        public DbSet<Project> Project { get; set; }
        public MainContext(DbContextOptions<MainContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }

    }
}
