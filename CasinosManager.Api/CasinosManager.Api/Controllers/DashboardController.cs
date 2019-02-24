using CasinosManager.Api.Dto;
using CasinosManager.Api.Service;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace CasinosManager.Api.Controllers
{
   
    [ApiController]
    public class DashboardController : ControllerBase
    {
        // POST api/values
        [HttpGet]
        [Route("api/Dashboard")]
        public ActionResult<DashboardDto> Dashboard()
        {
            MockDataService service = new MockDataService();
            return service.GetDashboard();
        }

        [HttpGet]
        [Route("api/Dashboard/echart")]
        public ActionResult<List<ConsumeModel>> Echart()
        {
            MockDataService service = new MockDataService();
            return service.GetConsumes();
        }
    }
}
