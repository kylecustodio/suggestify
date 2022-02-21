import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const [topTracks, setTopTracks] = useState([]);

  const getTopTracks = async () => {
    const res = await fetch("/api/topTracks");
    const { items } = await res.json();
    setTopTracks(items);
  };

  return (
    <div>
      Signed in as {session?.user?.name} <br />
      <button onClick={getTopTracks}>Get Top Tracks</button>
      <div>
        <ul>
          {topTracks.map((track) => (
            <li>
              <pre>{JSON.stringify(track)}</pre>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
