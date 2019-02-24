using CasinosManager.Api.Domain;
using CasinosManager.Api.Dto;
using System;
using System.Collections.Generic;

namespace CasinosManager.Api.Service
{
    public class MockDataService
    {
        private static List<Student> _students;

        public List<Student> GetStudents()
        {
            if (_students == null)
            {
                _students = new List<Student>();
                Random random = new Random();

                for (var i = 0; i < 100; i++)
                {
                    var student = new Student();
                    student.Id = i + 1;
                    student.Name = "test_" + student.Id;
                    student.Age = random.Next(15, 24);
                    student.Sex = random.Next(1, 10) % 2 == 0 ? "男" : "女";
                    student.CreateTime = DateTime.Today.AddDays(-i);
                    student.CreateTimeStr = student.CreateTime.ToString("yyyy-MM-dd");
                    _students.Add(student);
                }
            }

            return _students;
        }

        public DashboardDto GetDashboard()
        {
            Random random = new Random();
            DashboardDto dashboard = new DashboardDto();
            dashboard.A = random.Next(60,100);
            dashboard.B = random.Next(100, 200);
            dashboard.C = random.Next(200, 500);
            dashboard.D = random.Next(500, 1000);

            return dashboard;
        }

        public List<ConsumeModel> GetConsumes()
        {
            Random random = new Random();
            var consumes = new List<ConsumeModel>();
            for (var i = 10; i >= 0; i--)
            {
                consumes.Add(new ConsumeModel()
                {
                    Date = DateTime.Now.AddDays(-i).ToString("yyyy-MM-dd"),
                    Amount = random.Next(100, 500)
                });
            }

            return consumes;
        }
    }
}
