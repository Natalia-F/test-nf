namespace srv_post.Config
{
    public class Configuration
    {
        private static readonly IConfiguration configuration = new ConfigurationBuilder()
       .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
       .Build();

        public static readonly string DbConnectionString = configuration["connectionString:defaultConnection"];
    }
}
