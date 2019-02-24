using IdentityServer4.Services;
using System.Threading.Tasks;

namespace CasinosManager.IdentityServer
{
    public class CorsPolicyService : ICorsPolicyService
    {
        public Task<bool> IsOriginAllowedAsync(string origin)
        {
            var task = Task.Run<bool>(() =>
            {
                if (origin == "http://localhost:4200")
                {
                    return true;
                }
                return false;
            });
            return task;
        }
    }
}
