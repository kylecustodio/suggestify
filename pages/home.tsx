import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import TrackList from "../components/trackList";
import ArtistList from "../components/artistList";
import InfoCard from "../components/infoCard";
import DurationDropdown from "../components/durationDropdown";
import Footer from "../components/footer";

const timeRanges = [
  { display: "1 month", value: "short_term" },
  { display: "6 months", value: "medium_term" },
  { display: "All Time", value: "long_term" },
];

const Home: NextPage = () => {
  const { data: session } = useSession();
  const [timeRange, setTimeRange] = useState(timeRanges[0]);
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);

  const getTopTracks = async () => {
    const res = await fetch("/api/topTracks", {
      method: "POST", // FIXME: this seems kinda hacky
      body: JSON.stringify({
        time_range: timeRange.value,
      }),
    });
    const { items } = await res.json();
    setTopTracks(items);
  };

  const getTopArtists = async () => {
    const res = await fetch("/api/topArtists", {
      method: "POST", // FIXME: this seems kinda hacky
      body: JSON.stringify({
        time_range: timeRange.value,
      }),
    });
    const { items } = await res.json();
    setTopArtists(items);
  };

  useEffect(() => {
    getTopTracks();
    getTopArtists();
  }, [timeRange]);

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="w-36">
          <DurationDropdown
            selected={timeRange}
            onChange={setTimeRange}
            options={timeRanges}
          ></DurationDropdown>
        </div>
        <div className="w-full flex gap-4 flex-wrap my-4">
          <InfoCard title="Top Tracks">
            <TrackList tracks={topTracks}></TrackList>
          </InfoCard>
          <InfoCard title="Top Artists">
            <ArtistList artists={topArtists}></ArtistList>
          </InfoCard>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Home;
