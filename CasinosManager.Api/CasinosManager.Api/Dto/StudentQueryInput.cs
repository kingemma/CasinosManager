using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CasinosManager.Api.Dto
{
    public class StudentQueryInput
    {
        public int Page { get; set; }
        public int PageSize { get; set; }
        public string Name { get; set; }
        public DateTime? CreateFrom { get; set; }
        public DateTime? CreateTo { get; set; }
    }
}
