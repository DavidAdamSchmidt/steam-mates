using Microsoft.EntityFrameworkCore;

namespace SteamMates.Models.Persistence
{
    public class SteamContext : DbContext
    {
        public SteamContext(DbContextOptions options)
            : base(options)
        {
        }

        public DbSet<UserIdentifier> Users { get; set; }

        public DbSet<GameIdentifier> Games { get; set; }

        public DbSet<Vote> Votes { get; set; }
    }
}
