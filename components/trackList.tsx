import React from "react";
import { Track } from "spotify-types";
import TrackListItem from "./trackListItem";

type TrackListProps = {
  tracks: Track[];
};

const TrackList: React.FC<TrackListProps> = ({ tracks }) => {
  return (
    <div>
      <ul>
        {tracks.map((track) => (
          <TrackListItem key={track.id} track={track}></TrackListItem>
        ))}
      </ul>
    </div>
  );
};

export default TrackList;
