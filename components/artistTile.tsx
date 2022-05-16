import Image from "next/image";
import { FC } from "react";
import { Artist } from "spotify-types";

interface ArtistTileProps {
  artist: Artist;
}

const ArtistTile: FC<ArtistTileProps> = ({ artist }) => {
  const pow = Math.pow,
    floor = Math.floor,
    abs = Math.abs,
    log = Math.log;
  const abbrev = "kmb"; // could be an array of strings: [' m', ' Mo', ' Md']

  const round = (n: number) => {
    return Math.round(n * 10) / 10;
  };

  const formatFollowers = (n: number): string => {
    var base = floor(log(abs(n)) / log(1000));
    var suffix = abbrev[Math.min(2, base - 1)];
    base = abbrev.indexOf(suffix) + 1;
    return suffix ? round(n / pow(1000, base)) + suffix : "" + n;
  };

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
          <div className="text-sm font-semibold text-slate-500 truncate">
            {artist.genres.join(", ")}
          </div>
        </div>
        <div className="col-span-2 invisible lg:visible">
          <div className="text-md font-semibold text-slate-500 text-right">
            {formatFollowers(artist.followers.total) + " Followers"}
          </div>
        </div>
      </div>
    </li>
  );
};

export default ArtistTile;
