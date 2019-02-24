using System;

namespace CasinosManager.Api.Domain
{
    public class Student
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public string Sex { get; set; }
        public string CreateTimeStr { get; set; }
        public DateTime CreateTime { get; set; }
    }
}
