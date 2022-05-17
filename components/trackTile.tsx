import Image from "next/image";
import { FC } from "react";
import { Track } from "spotify-types";

interface TrackTileProps {
  track: Track;
}

const TrackTile: FC<TrackTileProps> = ({ track }) => {
  const millisToMinutesAndSeconds = (millis: number) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = Math.round((millis % 60000) / 1000);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  return (
    <li className="py-3">
      <div className="flex gap-4 items-center">
        <div className="shrink-0 w-16 h-16 relative">
          <Image
            src={track.album.images[0].url}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
        <div className="flex-grow w-1/3">
          <h1 className="text-md font-semibold text-gray-900 truncate">
            {track.name}
          </h1>
          <div className="text-sm font-semibold text-gray-500 truncate">
            {track.artists.map((artist) => artist.name).join(", ")}
          </div>
        </div>
        <div className="hidden md:block flex-grow w-1/3 text-md font-semibold text-gray-500 truncate">
          {track.album.name}
        </div>
        <div className="hidden md:block text-md font-semibold text-gray-500 text-right">
          {millisToMinutesAndSeconds(track.duration_ms)}
        </div>
      </div>
    </li>
  );
};

export default TrackTile;
