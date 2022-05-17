import { FC } from "react";
import { Artist } from "spotify-types";
import ArtistListItem from "./artistListItem";

interface ArtistListProps {
  artists: Artist[];
}

const ArtistList: FC<ArtistListProps> = ({ artists }) => {
  return (
    <ul>
      {artists.map((artist) => (
        <ArtistListItem key={artist.id} artist={artist}></ArtistListItem>
      ))}
    </ul>
  );
};

export default ArtistList;
