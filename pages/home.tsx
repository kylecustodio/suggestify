import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import List from "../components/list";
import ArtistList from "../components/artistList";
import InfoCard from "../components/infoCard";
import DurationDropdown from "../components/durationDropdown";
import Footer from "../components/footer";
import { Artist, Track } from "spotify-types";
import ListItem from "../components/listItem";
import TrackListItem from "../components/trackListItem";
import ArtistListItem from "../components/artistListItem";

const timeRanges = [
  { display: "1 month", value: "short_term" },
  { display: "6 months", value: "medium_term" },
  { display: "All Time", value: "long_term" },
];

const Home: NextPage = () => {
  const [timeRange, setTimeRange] = useState(timeRanges[0]);
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [topArtists, setTopArtists] = useState<Artist[]>([]);

  const [suggestedTracks, setSuggestedTracks] = useState<Track[]>([]);

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
    const { tracks } = await res.json();
    setSuggestedTracks(tracks);
  };

  useEffect(() => {
    getTopTracks();
    getTopArtists();
  }, [timeRange]);

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-4">
        <button
          onClick={getSuggestionsFromTopTracks}
          className="py-3 px-6 font-semibold rounded-md bg-emerald-500 text-white hover:bg-emerald-600"
        >
          Get Suggestions
        </button>
        <div className="w-full flex gap-4 my-4">
          <div className="py-8 w-full bg-white border rounded-lg">
            <div className="px-8 flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Top Tracks</h3>
              <div className="w-36">
                <DurationDropdown
                  selected={timeRange}
                  onChange={setTimeRange}
                  options={timeRanges}
                ></DurationDropdown>
              </div>
            </div>
            <List>
              {topTracks.map((track: Track) => (
                <ListItem key={track.id}>
                  <TrackListItem track={track}></TrackListItem>
                </ListItem>
              ))}
            </List>
          </div>
          <InfoCard title="Suggestions">
            {suggestedTracks.length >= 1 ? (
              <List>
                {suggestedTracks.map((track: Track) => (
                  <ListItem key={track.id}>
                    <TrackListItem track={track}></TrackListItem>
                  </ListItem>
                ))}
              </List>
            ) : (
              <div className="px-8 text-gray-500">hmm...</div>
            )}
          </InfoCard>
        </div>

        <InfoCard title="Top Artists">
          <List>
            {topArtists.map((artist: Artist) => (
              <ListItem key={artist.id}>
                <ArtistListItem artist={artist}></ArtistListItem>
              </ListItem>
            ))}
          </List>
        </InfoCard>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Home;
