import { FC } from "react";
import { Artist } from "spotify-types";
import ArtistTile from "./artistTile";

interface ArtistListProps {
  artists: Artist[];
}

const ArtistList: FC<ArtistListProps> = ({ artists }) => {
  return (
    <ul>
      {artists.map((artist) => (
        <ArtistTile key={artist.id} artist={artist}></ArtistTile>
      ))}
    </ul>
  );
};

export default ArtistList;
