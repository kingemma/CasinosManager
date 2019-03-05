using CasinosManager.IdentityServer.Domain;
using CasinosManager.IdentityServer.Dto;
using System;
using System.Linq;

namespace CasinosManager.IdentityServer.Service
{
    public class AccountService
    {
        public AccountDto ValidateAccount(string userName, string password)
        {
            try
            {
                AccountDto dto = new AccountDto();
                using (var db = new DataContext())
                {
                    var entity = db.Accounts.FirstOrDefault(o => o.UserName == userName && o.Password == password);
                    if (entity != null)
                    {
                        dto.Id = entity.Id;
                        dto.UserName = entity.UserName;
                        dto.Password = entity.Password;
                        dto.Role = entity.Role;
                        dto.RoleName = db.Roles.FirstOrDefault(o => o.Id == entity.Role).Name;
                        dto.IsDefaultPassword = entity.Password == entity.PasswordDefault;
                    }
                    return dto;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
     
        }
    }
}
