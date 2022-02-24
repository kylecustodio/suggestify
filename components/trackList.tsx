import React from "react";
import { Track } from "spotify-types";
import TrackTile from "./trackTile";

type TrackListProps = {
  tracks: Track[];
};

const TrackList: React.FC<TrackListProps> = ({ tracks }) => {
  return (
    <div>
      <ul>
        {tracks.map((track) => (
          <TrackTile key={track.id} track={track}></TrackTile>
        ))}
      </ul>
    </div>
  );
};

export default TrackList;
