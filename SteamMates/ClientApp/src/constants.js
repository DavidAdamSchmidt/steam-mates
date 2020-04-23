export const API_ROOT = "https://localhost:44349/api";

export const REQUEST = Object.freeze({
  STARTED: "REQUEST_STARTED",
  SUCCESSFUL: "REQUEST_SUCCESSFUL",
  FAILED: "REQUEST_FAILED",
  RESET_STATE: "RESET_STATE"
});

export const ERROR = Object.freeze({
  NETWORK_ERROR: "Network Error",
  DATABASE_ERROR: "There was an error while interacting with the database."
});

export const PATH = Object.freeze({
  HOME: "/",
  FRIENDS: "/friends",
  GAMES: "/games",
  GAMES_OF_USER: "/games/owned",
  GAMES_IN_COMMON: "/games/common",
  RANDOM_GAME: "/games/random",
  ERROR: "/error"
});

export const STEAM = Object.freeze({
  IMAGE_ROOT: "https://steamcdn-a.akamaihd.net/steam/apps",
  OLD_IMAGE_ROOT: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps",
  STORE_ROOT: "https://store.steampowered.com/app",
  PROFILE_ROOT: "https://steamcommunity.com/profiles",
  HAMBURGER_ICON:
    "https://steamstore-a.akamaihd.net/public/shared/images/responsive/header_menu_hamburger.png"
});

export const PROFILE = Object.freeze({
  STEAM_ID_64: "SteamID64",
  VANITY_ID: "Community ID",
  REAL_NAME: "Real Name",
  PERSONA_NAME: "Username"
});

export const STORAGE = Object.freeze({
  USER_ID: "userId",
  FRIENDS: "friends"
});

export const ORDER = Object.freeze({
  TITLE: "Title",
  RATING: "Rating"
});
