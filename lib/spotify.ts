const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const TOP_TRACKS_ENDPOINT = "https://api.spotify.com/v1/me/top/tracks?";

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

export const getTopTracks = async (refresh_token: any) => {
  const { access_token } = await getAccessToken(refresh_token);
  return fetch(
    TOP_TRACKS_ENDPOINT +
      new URLSearchParams({
        limit: "10",
        time_range: "medium_term",
      }),
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
};
