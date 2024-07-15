using Dapper;
using srv_post.Db;
using srv_post.Models;
using System.Data;

namespace srv_post.Dao
{
    public class PostDao
    {
        public async Task<IEnumerable<PostModel>> GetPost()
        {
            using (var connection = ConnectionBD.GetConnection())
            {
                connection.Open();
                string functionName = "SELECT * FROM fn_getpost()";
                IEnumerable<PostModel> post = await connection.QueryAsync<PostModel>(functionName, commandType: CommandType.Text);
                return post;
            }
        }

        public async Task<PostModel> AddPost(string name, string description)
        {
            using (var connection = ConnectionBD.GetConnection())
            {
                connection.Open();
                string functionName = "SELECT * FROM fn_addPost(@name,@description)";
                var parameters = new { Name =  name, Description = description};
                PostModel post = await connection.QuerySingleOrDefaultAsync<PostModel>(functionName, parameters, commandType: CommandType.Text);
                return post;
            }
        }

        public async Task<PostModel> DeletePost(int id)
        {
            using (var connection = ConnectionBD.GetConnection())
            {
                connection.Open();
                string functionName = "SELECT * FROM fn_deletePost(@Id)";
                var parameters = new { Id = id };
                PostModel post = await connection.QuerySingleOrDefaultAsync<PostModel>(functionName, parameters, commandType: CommandType.Text);
                return post;
            }
        }
    }
}
