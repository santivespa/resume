using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Curriculum.BLL.Helpers;
using Curriculum.BLL.Interfaces;
using Curriculum.Model.Curriculums;
using Curriculum.Model.Projects;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Curriculum.API.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class CurriculumController : Controller
    {
        private ICurriculumController _curriculumController;

        public CurriculumController(ICurriculumController curriculumController)
        {
            _curriculumController = curriculumController;
        }

        #region language

        [HttpPost("add-language")]
        public async Task<OperationRequest> AddLanguage(Language language)
        {
            try
            {
                return await _curriculumController.AddCurriculumItem(language,UserID);
            }
            catch (Exception e)
            {
                return new OperationRequest(e.Message);
            }
        }

        [HttpPost("edit-language")]
        public async Task<OperationRequest> EditLanguage(Language language)
        {
            try
            {
                return await _curriculumController.EditCurriculumItem<Language>(language, UserID);
            }
            catch (Exception e)
            {
                return new OperationRequest(e.Message);
            }
        }

        [HttpGet("delete-language/{languageID}")]
        public async Task<OperationRequest> EditLanguage(int languageID)
        {
            try
            {
                return await _curriculumController.DeleteCurriculumItem<Language>(languageID, UserID);
            }
            catch (Exception e)
            {
                return new OperationRequest(e.Message);
            }
        }

        #endregion

        #region education

        [HttpPost("add-education")]
        public async Task<OperationRequest> AddEducation(Education education)
        {
            try
            {
                return await _curriculumController.AddCurriculumItem(education, UserID);
            }
            catch (Exception e)
            {
                return new OperationRequest(e.Message);
            }
        }

        [HttpPost("edit-education")]
        public async Task<OperationRequest> EditEducation(Education education)
        {
            try
            {
                return await _curriculumController.EditCurriculumItem<Education>(education, UserID);
            }
            catch (Exception e)
            {
                return new OperationRequest(e.Message);
            }
        }

        [HttpGet("delete-education/{educationID}")]
        public async Task<OperationRequest> EditEducation(int educationID)
        {
            try
            {
                return await _curriculumController.DeleteCurriculumItem<Education>(educationID, UserID);
            }
            catch (Exception e)
            {
                return new OperationRequest(e.Message);
            }
        }

        #endregion

        #region career path
        [HttpPost("add-careerpath")]
        public async Task<OperationRequest> AddCareerPath(CareerPath carrerPath)
        {
            try
            {
                return await _curriculumController.AddCurriculumItem(carrerPath, UserID);
            }
            catch (Exception e)
            {
                return new OperationRequest(e.Message);
            }
        }
        [HttpPost("edit-careerpath")]
        public async Task<OperationRequest> EditCareerPath(CareerPath carrerPath)
        {
            try
            {
                return await _curriculumController.EditCurriculumItem<CareerPath>(carrerPath, UserID);
            }
            catch (Exception e)
            {
                return new OperationRequest(e.Message);
            }
        }
        [HttpGet("delete-careerpath/{carrerPathID}")]
        public async Task<OperationRequest> DeleteCareerPath(int carrerPathID)
        {
            try
            {
                return await _curriculumController.DeleteCurriculumItem<CareerPath>(carrerPathID, UserID);
            }
            catch (Exception e)
            {
                return new OperationRequest(e.Message);
            }
        }

        #endregion

        #region technology
        [HttpPost("add-technology")]
        public async Task<OperationRequest> AddTechnology(Technology technology)
        {
            try
            {
                return await _curriculumController.AddCurriculumItem(technology, UserID);
            }
            catch (Exception e)
            {
                return new OperationRequest(e.Message);
            }
        }
        
        [HttpPost("edit-technology")]
        public async Task<OperationRequest> EditTechnology(Technology technology)
        {
            try
            {
                return await _curriculumController.EditCurriculumItem<Technology>(technology, UserID);
            }
            catch (Exception e)
            {
                return new OperationRequest(e.Message);
            }
        }
        [HttpGet("delete-technology/{technologyID}")]
        public async Task<OperationRequest> DeleteTechnology(int technologyID)
        {
            try
            {
                return await _curriculumController.DeleteCurriculumItem<Technology>(technologyID, UserID);
            }
            catch (Exception e)
            {
                return new OperationRequest(e.Message);
            }
        }

        #endregion

        #region methodology
        [HttpPost("add-methodology")]
        public async Task<OperationRequest> AddMethodology(Methodology methodology)
        {
            try
            {
                return await _curriculumController.AddCurriculumItem(methodology, UserID);
            }
            catch (Exception e)
            {
                return new OperationRequest(e.Message);
            }
        }
        [HttpPost("edit-methodology")]
        public async Task<OperationRequest> EditMethodology(Methodology methodology)
        {
            try
            {
                return await _curriculumController.EditCurriculumItem<Methodology>(methodology, UserID);
            }
            catch (Exception e)
            {
                return new OperationRequest(e.Message);
            }
        }
        [HttpGet("delete-methodology/{methodologyID}")]
        public async Task<OperationRequest> DeleteMethodology(int methodologyID)
        {
            try
            {
                return await _curriculumController.DeleteCurriculumItem<Methodology>(methodologyID, UserID);
            }
            catch (Exception e)
            {
                return new OperationRequest(e.Message);
            }
        }
        #endregion

        #region tool
        [HttpPost("add-tool")]
        public async Task<OperationRequest> AddTool(Tool tool)
        {
            try
            {
                return await _curriculumController.AddCurriculumItem(tool, UserID);
            }
            catch (Exception e)
            {
                return new OperationRequest(e.Message);
            }
        }
        [HttpPost("edit-tool")]
        public async Task<OperationRequest> EditTool(Tool tool)
        {
            try
            {
                return await _curriculumController.EditCurriculumItem<Tool>(tool, UserID);
            }
            catch (Exception e)
            {
                return new OperationRequest(e.Message);
            }
        }
        [HttpGet("delete-tool/{toolID}")]
        public async Task<OperationRequest> DeleteTool(int toolID)
        {
            try
            {
                return await _curriculumController.DeleteCurriculumItem<Tool>(toolID, UserID);
            }
            catch (Exception e)
            {
                return new OperationRequest(e.Message);
            }
        }
        #endregion

        #region project
        [HttpPost("add-project")]
        public async Task<OperationRequest> AddProject(Project project)
        {
            try
            {
                return await _curriculumController.AddCurriculumItem(project, UserID);
            }
            catch (Exception e)
            {
                return new OperationRequest(e.Message);
            }
        }
        [HttpPost("edit-project")]
        public async Task<OperationRequest> EditProject(Project project)
        {
            try
            {
                return await _curriculumController.EditCurriculumItem<Project>(project, UserID);
            }
            catch (Exception e)
            {
                return new OperationRequest(e.Message);
            }
        }
        [HttpGet("delete-project/{projectID}")]
        public async Task<OperationRequest> DeleteProject(int projectID)
        {
            try
            {
                return await _curriculumController.DeleteCurriculumItem<Project>(projectID, UserID);
            }
            catch (Exception e)
            {
                return new OperationRequest(e.Message);
            }
        }
        #endregion

        [HttpGet("generate-pdf/{userName}")]
        [AllowAnonymous]
        public async Task<OperationRequest> GeneratePDF(string userName)
        {
            try
            {
              
                var result = await _curriculumController.GeneratePdf(userName);
                byte[] bytes = result.Result as byte[];
                var file = File(bytes, "application/pdf", "test.pdf");

                return result;
            }
            catch (Exception e)
            {
                return new OperationRequest(e.Message);
            }
        }

        public string UserID
        {
            get
            {
                return User.Claims.First(x => x.Type == "UserID").Value;
            }

        }
    }
}
