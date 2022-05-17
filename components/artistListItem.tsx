import Image from "next/image";
import { FC } from "react";
import { Artist } from "spotify-types";

interface ArtistListItemProps {
  artist: Artist;
}

const ArtistListItem: FC<ArtistListItemProps> = ({ artist }) => {
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
    <li className="py-3 hover:bg-emerald-50 cursor-pointer">
      <div className="px-8 flex gap-4 items-center">
        <div className="shrink-0 w-16 h-16 relative">
          <Image
            src={artist.images[0].url}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
        <div className="flex-grow w-1/3">
          <h1 className="text-md font-semibold text-gray-900 truncate">
            {artist.name}
          </h1>
          <div className="text-sm font-semibold text-gray-500 truncate">
            {artist.genres.join(", ")}
          </div>
        </div>
        <div className="hidden md:block">
          <div className="text-md font-semibold text-gray-500 text-right">
            {formatFollowers(artist.followers.total) + " Followers"}
          </div>
        </div>
      </div>
    </li>
  );
};

export default ArtistListItem;
