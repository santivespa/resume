
using Azure.Storage.Blobs;
using Curriculum.API.Helpers;
using Curriculum.BLL.BlobServices.Interfaces;
using Curriculum.BLL.BlobServices.Services;
using Curriculum.BLL.Controllers;
using Curriculum.BLL.Helpers;
using Curriculum.BLL.Interfaces;
using Curriculum.DAL.Context;
using Curriculum.DAL.Interfaces;
using Curriculum.DAL.Managers;
using Curriculum.Model.Users;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Curriculum.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();
            services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));

            services.AddDbContext<MainContext>(x => x.UseSqlServer(Configuration.GetConnectionString("LocalConnectionString"), z => z.MigrationsAssembly("ResuMe.DAL")));

            ConfigIdentity(services);
            InjectServices(services);
            AddJWT(services);

        
            services.AddCors(options =>
            {
                options.AddPolicy(name: "MyPolicy",
                    builder =>
                    {
                        builder.WithOrigins(Configuration["AppSettings:Client_URL"].ToString())
                             .AllowAnyHeader()
                             .AllowAnyMethod();
                    });
            });


        }

        private void AddJWT(IServiceCollection services)
        {
            var key = Encoding.UTF8.GetBytes(Configuration["AppSettings:JWT_Secret"].ToString());
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x => {

                x.RequireHttpsMetadata = true;
                x.SaveToken = false;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                };
            });
        }

        private void ConfigIdentity(IServiceCollection services)
        {
            services.AddDefaultIdentity<User>(options =>
            {

                    options.SignIn.RequireConfirmedAccount = false;
                    options.Password.RequireDigit = false;
                    options.Password.RequireLowercase = false;
                    options.Password.RequireNonAlphanumeric = false;
                    options.Password.RequireUppercase = false;
                    options.Password.RequiredLength = 3;

                    // Lockout settings.
                    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
                    options.Lockout.MaxFailedAccessAttempts = 5;

                    // User settings.
                    options.User.AllowedUserNameCharacters =
                    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.@";
                    options.User.RequireUniqueEmail = true;

             })
            .AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<MainContext>();
        }
        

        private void InjectServices(IServiceCollection services)
        {
            services.AddScoped<IAccountController, AccountController>();

            //Curriculum 
            services.AddScoped<ICurriculumController, CurriculumController>();
            services.AddScoped<ICurriculumManager, CurriculumManager>();

            // Blob Service Client
            services.AddSingleton(x => new BlobServiceClient(Configuration.GetValue<string>("StorageConnectionString")));

            // Blob Services
            services.AddTransient<IUserBlobService, UserBlobService>();

            // Email sender
            services.AddTransient<IEmailSender, EmailSender>(i =>
                new EmailSender(
                    Configuration["EmailSender:Host"],
                    Configuration.GetValue<int>("EmailSender:Port"),
                    Configuration.GetValue<bool>("EmailSender:EnableSSL"),
                    Configuration["EmailSender:UserName"],
                    Configuration["EmailSender:Password"]
                ));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseCors("MyPolicy");


            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
