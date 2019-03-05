namespace CasinosManager.IdentityServer.Dto
{
    public class AccountDto
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }

        public int Role { get; set; }

        public string RoleName { get; set; }

        public bool IsDefaultPassword { get; set; }
    }
}
