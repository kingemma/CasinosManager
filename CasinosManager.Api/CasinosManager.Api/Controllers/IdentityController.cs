using CasinosManager.Api.Dto;
using IdentityModel;
using IdentityModel.Client;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace CasinosManager.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IdentityController : ControllerBase
    {
        [HttpGet()]
        [Authorize]
        public ActionResult<CurrentUserInfo> Get()
        {
            CurrentUserInfo userInfo = new CurrentUserInfo();
            foreach (var claim in HttpContext.User.Claims)
            {
                if (claim.Type == "UserId")
                {
                    userInfo.UserId = claim.Value;
                }
                else if (claim.Type == "UserName")
                {
                    userInfo.UserName = claim.Value;
                }
                else if (claim.Type == JwtClaimTypes.Name)
                {
                    userInfo.Name = claim.Value;
                }
                else if (claim.Type == JwtClaimTypes.Email)
                {
                    userInfo.Email = claim.Value;
                }
                else if (claim.Type == JwtClaimTypes.Role)
                {
                    userInfo.Role = claim.Value;
                }
            }

            return userInfo;
        }

        [HttpPost()]
        public async Task<ActionResult<AuthenticateResult>> Login(AuthenticateModel model)
        {
            AuthenticateResult result = null;

            var disco = await DiscoveryClient.GetAsync("http://localhost:53002");
            if (disco.IsError)
            {
                return result;
            }

            // request token
            var tokenClient = new TokenClient(disco.TokenEndpoint, model.client_id, model.client_secret);
            var tokenResponse = await tokenClient.RequestResourceOwnerPasswordAsync(model.username, model.password, model.scope);

            if (tokenResponse.IsError)
            {
                return result;
            }

            result = new AuthenticateResult();
            result.access_token = tokenResponse.AccessToken;
            result.expires_in = tokenResponse.ExpiresIn;
            result.token_type = tokenResponse.TokenType;

            return result;
        }

        [HttpDelete]
        [Authorize]
        public async Task<bool> LogoutAsync()
        {
            await HttpContext.Authentication.SignOutAsync("idsrv.session");
            return true;
        }
    }
}
