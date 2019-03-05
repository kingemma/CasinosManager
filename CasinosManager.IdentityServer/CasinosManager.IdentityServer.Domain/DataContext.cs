using Microsoft.EntityFrameworkCore;

namespace CasinosManager.IdentityServer.Domain
{
    public class DataContext: DbContext
    {
        public static string DBPath;

        public DbSet<Account> Accounts { get; set; }

        public DbSet<Role> Roles { get; set; }

        public DbSet<AccountLoginHistory> AccountLoginHistories { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //创建文件夹的位置       
            //"Data source=C:\\ProjectMy\\CasinosManager\\Data\\CasinosManagerDB.db"
            optionsBuilder.UseSqlite(DBPath);   
        }
    }
}
