import { API_URL } from "../constants/api";

export const constructGamePageUrl = (gameId, friends) => {
  return `${API_URL}/games/${gameId}${
    friends.length > 0 ? "?" : ""
  }${friends
    .map((friend, index) => `${index ? "&" : ""}userId=${friend.steamId}`)
    .join("")}`;
};
