import Image from "next/image";
import { FC } from "react";
import { Artist } from "spotify-types";

interface ArtistTileProps {
  artist: Artist;
}

const ArtistTile: FC<ArtistTileProps> = ({ artist }) => {
  return (
    <li className="py-3">
      <div className="grid grid-cols-6 gap-x-1 items-center">
        <div className="w-16 h-16 relative">
          <Image
            src={artist.images[0].url}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
        <div className="col-span-3">
          <h1 className="text-md font-semibold text-slate-900">
            {artist.name}
          </h1>
          <div className="text-sm font-semibold text-slate-500">
            {artist.genres.join(", ")}
          </div>
        </div>
        <div className="col-span-2">
          <div className="text-md font-semibold text-slate-500 text-right">
            {artist.followers.total.toLocaleString() + " Followers"}
          </div>
        </div>
      </div>
    </li>
  );
};

export default ArtistTile;
