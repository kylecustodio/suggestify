import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { getSuggestions } from "../../lib/spotify";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  const { seed_tracks, seed_genres, seed_artists } = JSON.parse(req.body);
  const response = await getSuggestions(
    session?.accessToken,
    seed_tracks,
    seed_artists,
    seed_genres
  );
  const { tracks } = await response.json();
  return res.status(200).json({ tracks });
};
