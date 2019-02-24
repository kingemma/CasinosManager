using CasinosManager.Api.Domain;
using CasinosManager.Api.Dto;
using CasinosManager.Api.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace CasinosManager.Api.Controllers
{
    [ApiController]
    [Authorize]
    public class StudentController : ControllerBase
    {
        // GET api/values
        [HttpPost]
        [Route("api/student/query")]
        public ActionResult<PageListOutput<Student>> Query(StudentQueryInput queryInput)
        {
            PageListOutput<Student> output = new PageListOutput<Student>();

            MockDataService service = new MockDataService();
            var query = service.GetStudents();
            if (!string.IsNullOrWhiteSpace(queryInput.Name))
            {
                query = query.Where(o=>o.Name.Contains(queryInput.Name)).ToList();
            }
            if (queryInput.CreateFrom.HasValue)
            {
                query = query.Where(o => o.CreateTime>=queryInput.CreateFrom.Value).ToList();
            }
            if (queryInput.CreateTo.HasValue)
            {
                query = query.Where(o => o.CreateTime <= queryInput.CreateTo.Value).ToList();
            }

            int skip = (queryInput.Page - 1) * queryInput.PageSize;
            output.Total = query.Count();
            output.Data = query.Skip(skip).Take(queryInput.PageSize).ToList();

            return output;
        }
    }
}
