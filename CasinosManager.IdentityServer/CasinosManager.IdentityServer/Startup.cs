using CasinosManager.IdentityServer.Domain;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.IO;

namespace CasinosManager.IdentityServer
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddIdentityServer()
             .AddDeveloperSigningCredential()
             .AddInMemoryApiResources(Config.GetApiResources())
             .AddInMemoryIdentityResources(Config.GetIdentityResource())
             .AddInMemoryClients(Config.GetClients())
             .AddResourceOwnerValidator<ResourceOwnerValidator>()
             .AddProfileService<ProfileService>();

            DataContext.DBPath = ConfigurationManager.Configuration.GetConnectionString("db");
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseIdentityServer();

            app.Run(async (context) =>
            {
                await context.Response.WriteAsync("CasinosManager.IdentityServer!");
            });
        }
    }
}
