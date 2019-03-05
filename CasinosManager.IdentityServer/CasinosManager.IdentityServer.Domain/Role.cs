using System.ComponentModel.DataAnnotations.Schema;

namespace CasinosManager.IdentityServer.Domain
{
    [Table("Role")]
    public class Role
    {
        public int Id { get; set; }

        public string Name { get; set; }
    }
}
