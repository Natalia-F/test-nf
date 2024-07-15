using srv_post.Dao;
using srv_post.Models;

namespace srv_post.Services
{
    public class PostService
    {
        PostDao layerDao = new PostDao();

        public async Task<IEnumerable<PostModel>> GetPost()
        {
            return await layerDao.GetPost();
        }

        public async Task<PostModel> AddPost(string name, string description)
        {
            return await layerDao.AddPost(name,description);
        }

        public async Task<PostModel> DeletePost(int id)
        {
            return await layerDao.DeletePost(id);
        }
    }
}
