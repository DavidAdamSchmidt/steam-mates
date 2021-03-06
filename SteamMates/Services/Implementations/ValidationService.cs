﻿using SteamMates.Exceptions;
using SteamMates.Models;
using SteamMates.Services.Interfaces;
using SteamMates.Utils;
using SteamMates.Validation;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SteamMates.Services.Implementations
{
    public class ValidationService : IValidationService
    {
        private readonly IGameService _gameService;

        public ValidationService(IGameService gameService)
        {
            _gameService = gameService;
        }

        public ValidationResult ValidateGetGame(ClaimsPrincipal user, ISet<string> userIds, string gameId)
        {
            if (!user.Identity.IsAuthenticated)
            {
                return new ValidationResult(ValidationStatus.Unauthorized, ValidationError.Unauthorized);
            }

            var success = int.TryParse(gameId, out var parsedId);

            if (!success || parsedId < 1)
            {
                return new ValidationResult(ValidationStatus.Failed, ValidationError.InvalidGameId);
            }

            return ValidateUserIds(user, userIds, false);
        }

        public ValidationResult ValidateGetGames(ClaimsPrincipal user)
        {
            if (!user.Identity.IsAuthenticated)
            {
                return new ValidationResult(ValidationStatus.Unauthorized, ValidationError.Unauthorized);
            }

            return new ValidationResult(ValidationStatus.Ok);
        }

        public ValidationResult ValidateGetGamesInCommon(ClaimsPrincipal user, ISet<string> userIds)
        {
            if (!user.Identity.IsAuthenticated)
            {
                return new ValidationResult(ValidationStatus.Unauthorized, ValidationError.Unauthorized);
            }

            return ValidateUserIds(user, userIds, true);
        }

        public async Task<ValidationResult> ValidateRateGameAsync(ClaimsPrincipal user, RatedGame ratedGame)
        {
            if (!user.Identity.IsAuthenticated)
            {
                return new ValidationResult(ValidationStatus.Unauthorized, ValidationError.Unauthorized);
            }

            if (ratedGame.UserId != SteamUtils.GetUserIdFromClaim(user))
            {
                return new ValidationResult(ValidationStatus.Failed, ValidationError.WrongUserId);
            }

            if (ratedGame.Rating < 1 || ratedGame.Rating > 5)
            {
                return new ValidationResult(
                    ValidationStatus.Failed,
                    string.Format(ValidationError.InvalidRatingPattern, ratedGame.Rating));
            }

            bool hasGame;
            try
            {
                hasGame = await _gameService.UserHasGameAsync(ratedGame.UserId, ratedGame.GameId);
            }
            catch (Exception e) when (
                e is LibraryUnavailableException ||
                e is ApiUnavailableException)
            {
                return new ValidationResult(
                    ValidationStatus.Aborted,
                    string.Format(ValidationError.UserHasGameAbortedPattern, e.Message));
            }

            if (!hasGame)
            {
                return new ValidationResult(
                    ValidationStatus.Failed,
                    string.Format(ValidationError.UserDoesNotHaveGamePattern, ratedGame.GameId));
            }

            return new ValidationResult(ValidationStatus.Ok);
        }

        private ValidationResult ValidateUserIds(ClaimsPrincipal user, ICollection<string> userIds, bool required)
        {
            if (required && userIds.Count == 0)
            {
                return new ValidationResult(ValidationStatus.Failed, ValidationError.NoUserId);
            }

            var clone = new HashSet<string>(userIds);
            var userId = SteamUtils.GetUserIdFromClaim(user);

            clone.Add(userId);

            if (clone.Count > 4)
            {
                return new ValidationResult(ValidationStatus.Failed, ValidationError.TooManyUserIds);
            }

            return new ValidationResult(ValidationStatus.Ok);
        }
    }
}
