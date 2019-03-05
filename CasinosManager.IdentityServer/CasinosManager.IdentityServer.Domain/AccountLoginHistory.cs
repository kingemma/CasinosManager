using System.ComponentModel.DataAnnotations.Schema;

namespace CasinosManager.IdentityServer.Domain
{
    [Table("AccountLoginHistory")]
    public class AccountLoginHistory
    {
        public int Id { get; set; }

        public int AccountId { get; set; }

        public string LoginTime { get; set; }
    }
}
