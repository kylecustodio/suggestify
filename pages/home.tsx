import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);

  const getTopTracks = async () => {
    const res = await fetch("/api/topTracks");
    const { items } = await res.json();
    setTopTracks(items);
  };

  const getTopArtists = async () => {
    const res = await fetch("/api/topArtists");
    const { items } = await res.json();
    setTopArtists(items);
  };

  return (
    <div>
      Signed in as {session?.user?.name} <br />
      <button onClick={getTopTracks}>Get Top Tracks</button>
      <button onClick={getTopArtists}>Get Top Artists</button>
      <div>
        <ul>
          {topTracks.map((track) => (
            <li>
              <pre>{JSON.stringify(track)}</pre>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          {topArtists.map((artist) => (
            <li>
              <pre>{JSON.stringify(artist)}</pre>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
