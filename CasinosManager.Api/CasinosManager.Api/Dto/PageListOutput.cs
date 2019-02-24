using System.Collections.Generic;

namespace CasinosManager.Api.Dto
{
    public class PageListOutput<T>
    {
        public int Total { get; set; }
        public List<T> Data { get; set; }
    }
}
