using SteamMates.Models;
using System.Threading.Tasks;

namespace SteamMates.Services.Interfaces
{
    public interface IUserService
    {
        Task<User> GetUserInfoAsync(string userId);
    }
}
