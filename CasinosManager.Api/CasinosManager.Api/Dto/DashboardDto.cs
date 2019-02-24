using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CasinosManager.Api.Dto
{
    public class DashboardDto
    {
        public int A { get; set; }

        public int B { get; set; }

        public int C { get; set; }

        public int D { get; set; }

    }

    public class ConsumeModel
    {
        public string Date { get; set; }

        public decimal Amount { get; set; }
    }
}
