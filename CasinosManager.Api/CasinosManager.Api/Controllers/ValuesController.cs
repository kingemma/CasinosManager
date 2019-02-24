using CasinosManager.Api.Domain;
using CasinosManager.Api.Dto;
using CasinosManager.Api.Service;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace CasinosManager.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        [HttpGet()]
        public ActionResult<PageListOutput<Student>> Get(int page, int pageSize)
        {
            PageListOutput<Student> output = new PageListOutput<Student>();

            MockDataService service = new MockDataService();
            int skip = (page - 1) * pageSize;
            output.Total = service.GetStudents().Count();
            output.Data = service.GetStudents().Skip(skip).Take(pageSize).ToList();

            return output;
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
