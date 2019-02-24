using IdentityModel;
using IdentityServer4.Models;
using IdentityServer4.Validation;
using System.Security.Claims;
using System.Threading.Tasks;

namespace CasinosManager.IdentityServer
{
    public class AccountValidator: IResourceOwnerPasswordValidator
    {
        public Claim[] GetUserClaim(UserInfo userInfo)
        {
            var claims = new Claim[]
            {
                new Claim("UserId", userInfo.Id.ToString()),
                new Claim("UserName", userInfo.UserName),
                new Claim(JwtClaimTypes.Name,"test"),
                new Claim(JwtClaimTypes.GivenName, "jaycewu"),
                new Claim(JwtClaimTypes.FamilyName, "yyy"),
                new Claim(JwtClaimTypes.Email, "test@qq.com"),
                new Claim(JwtClaimTypes.Role,"admin")
            };
            return claims;
        }

        public async Task ValidateAsync(ResourceOwnerPasswordValidationContext context)
        {
            //todo 从数据库里查询验证
            Account accountResult = new Account();
            accountResult.User = new UserInfo();
            accountResult.User.Id = 1;
            accountResult.User.UserName = context.UserName;
            accountResult.User.Password = context.Password;

            if (accountResult.User.UserName == "alice" && accountResult.User.Password == "password")
            {
                context.Result = new GrantValidationResult(subject: accountResult.User.Id.ToString(), authenticationMethod: "custom", claims: GetUserClaim(accountResult.User));
            }
            else
            {
                //验证失败
                context.Result = new GrantValidationResult(TokenRequestErrors.InvalidGrant, "用户名或密码错误");
            }
        }
    }

    public class Account
    {
        public UserInfo User { get; set; }
    }

    public class UserInfo
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }
    }
}
