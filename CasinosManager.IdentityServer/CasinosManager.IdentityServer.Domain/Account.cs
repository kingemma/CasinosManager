using System.ComponentModel.DataAnnotations.Schema;

namespace CasinosManager.IdentityServer.Domain
{
    [Table("Account")]
    public class Account
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }

        public string PasswordDefault { get; set; }

        public int Role { get; set; }
    }
}
