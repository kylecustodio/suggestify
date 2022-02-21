import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { getTopTracks } from "../../lib/spotify";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  const response = await getTopTracks(session?.accessToken);
  const { items } = await response.json();
  return res.status(200).json({ items });
};
