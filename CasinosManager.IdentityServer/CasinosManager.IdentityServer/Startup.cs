using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

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
             .AddResourceOwnerValidator<AccountValidator>()
             .AddProfileService<ProfileService>()
             .AddCorsPolicyService<CorsPolicyService>();
             //.AddTestUsers(Config.GetUsers());
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseIdentityServer();

            app.UseCors(buider =>
            {
                buider.WithOrigins("http://localhost:4200")
                .AllowAnyHeader();
            });

            app.Run(async (context) =>
            {
                await context.Response.WriteAsync("CasinosManager.IdentityServer!");
            });
        }
    }
}
