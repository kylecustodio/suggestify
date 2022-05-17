import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import TrackList from "../components/trackList";
import ArtistList from "../components/artistList";
import InfoCard from "../components/infoCard";
import DurationDropdown from "../components/durationDropdown";
import Footer from "../components/footer";
import { Artist, Track } from "spotify-types";

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
  const [suggestedTracks, setSuggestedTracks] = useState([]);

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

  const getSuggestionsFromTopTracks = async () => {
    const seed_tracks = topTracks
      .slice(0, 5)
      .map((track: Track) => track.id)
      .join(",");
    const seed_artists = (topArtists[0] as Artist).id;
    const seed_genres = (topArtists[0] as Artist).genres[0];
    const res = await fetch("/api/suggestions", {
      method: "POST",
      body: JSON.stringify({
        seed_tracks: seed_tracks,
        seed_artists: "",
        seed_genres: "",
      }),
    });
    console.log(res);
    const { tracks } = await res.json();
    setSuggestedTracks(tracks);
  };

  useEffect(() => {
    getTopTracks();
    getTopArtists();
    setSuggestedTracks([]);
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
        <button
          onClick={getSuggestionsFromTopTracks}
          className="py-3 px-6 font-semibold rounded-md bg-emerald-500 text-white hover:bg-emerald-600"
        >
          Get Suggestions
        </button>
        <div className="w-full flex gap-4 my-4">
          <InfoCard title="Top Tracks">
            <TrackList tracks={topTracks}></TrackList>
          </InfoCard>
          <InfoCard title="Suggestions">
            {suggestedTracks.length >= 1 ? (
              <TrackList tracks={suggestedTracks}></TrackList>
            ) : (
              <div className="text-gray-500">hmm...</div>
            )}
          </InfoCard>
        </div>

        <InfoCard title="Top Artists">
          <ArtistList artists={topArtists}></ArtistList>
        </InfoCard>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Home;
