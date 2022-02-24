import React from "react";
import { Artist } from "spotify-types";
import ArtistTile from "./artistTile";

type ArtistListProps = {
  artists: Artist[];
};

const ArtistList: React.FC<ArtistListProps> = ({ artists }) => {
  return (
    <ul>
      {artists.map((artist) => (
        <ArtistTile key={artist.id} artist={artist}></ArtistTile>
      ))}
    </ul>
  );
};

export default ArtistList;
