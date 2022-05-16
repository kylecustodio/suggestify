import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { getTopTracks } from "../../lib/spotify";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  const { time_range } = JSON.parse(req.body);
  const response = await getTopTracks(session?.accessToken, time_range);
  const { items } = await response.json();
  return res.status(200).json({ items });
};
