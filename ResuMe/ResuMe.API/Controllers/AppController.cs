using Curriculum.BLL.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Curriculum.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppController : Controller
    {
        private readonly AppSettings _appSettings;

        public AppController(IOptions<AppSettings> settings) => _appSettings = settings.Value;

        [HttpGet("get-version")]
        public string GetVersion()
        {
            return _appSettings.Version;
        }
    }
}
