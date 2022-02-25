import React from "react";
import Image from "next/image";
import { Artist } from "spotify-types";

type ArtistTileProps = {
  artist: Artist;
};

const ArtistTile: React.FC<ArtistTileProps> = ({ artist }) => {
  return (
    <li className="py-3">
      <div className="flex gap-x-4 items-center">
        <div className="w-16 h-16 relative">
          <Image
            src={artist.images[0].url}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
        <div className="flex-grow">
          <h1 className="text-md font-semibold text-slate-900">
            {artist.name}
          </h1>
          <div className="text-sm font-semibold text-slate-500">
            {artist.genres.join(", ")}
          </div>
        </div>
        <div className="text-md font-semibold text-slate-500 text-right">
          {artist.followers.total.toLocaleString() + " Followers"}
        </div>
      </div>
    </li>
  );
};

export default ArtistTile;
