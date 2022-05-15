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
      <div className="grid grid-cols-6 gap-x-1 items-center">
        <div className="w-16 h-16 relative">
          <Image
            src={track.album.images[0].url}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
        <div className="col-span-2">
          <h1 className="text-md font-semibold text-slate-900">{track.name}</h1>
          <div className="text-sm font-semibold text-slate-500">
            {track.artists.map((artist) => artist.name).join(", ")}
          </div>
        </div>
        <div className="invisible lg:visible text-md font-semibold text-slate-500 col-span-2">
          {track.album.name}
        </div>
        <div className="text-md font-semibold text-slate-500 text-right">
          {millisToMinutesAndSeconds(track.duration_ms)}
        </div>
      </div>
    </li>
  );
};

export default TrackTile;
