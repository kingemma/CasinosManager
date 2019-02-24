using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CasinosManager.Api.Dto
{
    public class AuthenticateModel
    {
        public string username { get; set; }
        public string password { get; set; }
        public string client_id { get; set; }
        public string client_secret { get; set; }
        public string grant_type { get; set; }
        public string scope { get; set; }

        public AuthenticateModel()
        {
            this.client_id = "angular.client";
            this.client_secret = "secret";
            this.grant_type = "password";
            this.scope = "CasinosApi";
        }
    }

    public class AuthenticateResult
    {
        public string access_token { get; set; }
        public int expires_in { get; set; }
        public string token_type { get; set; }

        public AuthenticateResult()
        {

        }
    }
}
