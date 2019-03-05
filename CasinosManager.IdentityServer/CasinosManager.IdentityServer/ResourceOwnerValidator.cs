using CasinosManager.IdentityServer.Dto;
using CasinosManager.IdentityServer.Service;
using IdentityModel;
using IdentityServer4.Models;
using IdentityServer4.Validation;
using System.Security.Claims;
using System.Threading.Tasks;

namespace CasinosManager.IdentityServer
{
    public class ResourceOwnerValidator: IResourceOwnerPasswordValidator
    {
        public Claim[] GetUserClaim(AccountDto account)
        {
            var claims = new Claim[]
            {
                new Claim("UserId", account.Id.ToString()),
                new Claim("UserName", account.UserName),
                new Claim("IsDefaultPassword",account.IsDefaultPassword.ToString()),
                new Claim("RoleName",account.RoleName),
                new Claim(JwtClaimTypes.Name,account.UserName),
                new Claim(JwtClaimTypes.Role,account.Role.ToString())
            };
            return claims;
        }

        public async Task ValidateAsync(ResourceOwnerPasswordValidationContext context)
        {
            //todo 从数据库里查询验证
            AccountService service = new AccountService();


            AccountDto accountResult = service.ValidateAccount(context.UserName, context.Password); ;

            if (accountResult != null && accountResult.Id>0)
            {
                context.Result = new GrantValidationResult(subject: accountResult.Id.ToString(), authenticationMethod: "custom", claims: GetUserClaim(accountResult));
            }
            else
            {
                //验证失败
                context.Result = new GrantValidationResult(TokenRequestErrors.InvalidGrant, "用户名或密码错误");
            }
        }
    }
}
