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

        public DbSet<Rating> Ratings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserIdentifier>()
                .HasIndex(x => x.SteamId)
                .IsUnique();

            modelBuilder.Entity<GameIdentifier>()
                .HasIndex(x => x.SteamId)
                .IsUnique();

            modelBuilder.Entity<Rating>()
                .HasAlternateKey(x => new { x.UserId, x.GameId });
        }
    }
}
