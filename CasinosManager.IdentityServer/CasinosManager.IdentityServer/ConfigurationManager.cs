using CasinosManager.IdentityServer.Domain;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace CasinosManager.IdentityServer
{
    public class ConfigurationManager
    {
        public readonly static IConfiguration Configuration;

        static ConfigurationManager()
        {
            Configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())   //指定配置文件所在的目录
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)  //指定加载的配置文件
                .Build();   //编译成对象  
        }
    }
}
