const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const TOP_TRACKS_ENDPOINT = "https://api.spotify.com/v1/me/top/tracks?";
const TOP_ARTISTS_ENDPOINT = "https://api.spotify.com/v1/me/top/artists?";
const SUGGESTIONS_ENDPOINT = "https://api.spotify.com/v1/recommendations?";

const getAccessToken = async (refresh_token: any) => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  return response.json();
};

export const getTopTracks = async (refresh_token: any, time_range: string) => {
  const { access_token } = await getAccessToken(refresh_token);
  return fetch(
    TOP_TRACKS_ENDPOINT +
      new URLSearchParams({
        limit: "10",
        time_range: time_range,
      }),
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
};

export const getTopArtists = async (refresh_token: any, time_range: string) => {
  const { access_token } = await getAccessToken(refresh_token);
  return fetch(
    TOP_ARTISTS_ENDPOINT +
      new URLSearchParams({
        limit: "10",
        time_range: time_range,
      }),
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
};

export const getSuggestions = async (
  refresh_token: any,
  seed_tracks: string,
  seed_artists: string,
  seed_genres: string
) => {
  const { access_token } = await getAccessToken(refresh_token);
  return fetch(
    SUGGESTIONS_ENDPOINT +
      new URLSearchParams({
        limit: "10",
        seed_artists: seed_artists,
        seed_genres: seed_genres,
        seed_tracks: seed_tracks,
      }),
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
};
