using Microsoft.EntityFrameworkCore;
using SteamMates.Models;
using SteamMates.Models.Persistence;
using SteamMates.Services.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SteamMates.Services.Implementations
{
    public class DatabaseService : IDatabaseService
    {
        private readonly SteamContext _context;

        public DatabaseService(SteamContext context)
        {
            _context = context;
        }

        public async Task AddRatingAsync(RatedGame ratedGame)
        {
            var user = await FindUserIdentifierAsync(ratedGame.UserId);
            var game = await FindGameIdentifierAsync(ratedGame.GameId);
            var createIdentifier = user == null || game == null;

            if (user == null)
            {
                user = new UserIdentifier { SteamId = ratedGame.UserId };

                await _context.Users.AddAsync(user);
            }

            if (game == null)
            {
                game = new GameIdentifier { SteamId = ratedGame.GameId };

                await _context.Games.AddAsync(game);
            }

            if (createIdentifier)
            {
                await _context.SaveChangesAsync();
            }

            var rating = new Rating { Game = game, User = user, Value = ratedGame.Rating };

            await _context.Ratings.AddAsync(rating);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateRatingAsync(Rating rating, byte newValue)
        {
            rating.Value = newValue;

            _context.Ratings.Update(rating);
            await _context.SaveChangesAsync();
        }

        public async Task<Rating> FindRatingAsync(string userId, int gameId)
        {
            return await (
                from rating in _context.Ratings
                join user in _context.Users on rating.UserId equals user.Id
                join game in _context.Games on rating.GameId equals game.Id
                where user.SteamId == userId && game.SteamId == gameId
                select rating
            ).FirstOrDefaultAsync();
        }

        public async Task<List<RatedGame>> FindRatedGamesAsync(IEnumerable<string> userIds, IEnumerable<int> gameIds)
        {
            return await (
                from rating in _context.Ratings
                join user in _context.Users on rating.UserId equals user.Id
                join game in _context.Games on rating.GameId equals game.Id
                where userIds.Contains(user.SteamId) && gameIds.Contains(game.SteamId)
                select new RatedGame
                {
                    UserId = user.SteamId,
                    GameId = game.SteamId,
                    Rating = rating.Value
                }).ToListAsync();
        }

        private async Task<UserIdentifier> FindUserIdentifierAsync(string userId)
        {
            return await _context.Users.FirstOrDefaultAsync(x => x.SteamId == userId);
        }

        private async Task<GameIdentifier> FindGameIdentifierAsync(int gameId)
        {
            return await _context.Games.FirstOrDefaultAsync(x => x.SteamId == gameId);
        }
    }
}
