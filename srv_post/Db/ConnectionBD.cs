using Npgsql;
using srv_post.Config;

namespace srv_post.Db
{
    public class ConnectionBD
    {
        private static readonly string DbConnectionString = Configuration.DbConnectionString;

        public static NpgsqlConnection GetConnection()
        {
            return new NpgsqlConnection(DbConnectionString);
        }
    }
}
