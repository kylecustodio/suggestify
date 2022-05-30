import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Artist, Track } from "spotify-types";
import ArtistListItem from "../components/artistListItem";
import ButtonBar from "../components/buttonBar";
import Footer from "../components/footer";
import List from "../components/list";
import ListItem from "../components/listItem";
import TrackListItem from "../components/trackListItem";
import { RefreshIcon } from "@heroicons/react/solid";

const timeRanges = [
  { display: "1 month", value: "short_term" },
  { display: "6 months", value: "medium_term" },
  { display: "All Time", value: "long_term" },
];

enum SeedType {
  Artist,
  Track,
}

const seedTypes = [
  { display: "Track", value: SeedType.Track },
  { display: "Artist", value: SeedType.Artist },
];

const Home: NextPage = () => {
  const [timeRange, setTimeRange] = useState(timeRanges[0]);
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [topArtists, setTopArtists] = useState<Artist[]>([]);
  const [seedType, setSeedType] = useState(seedTypes[0]);

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
    getSuggestionsFromTopTracks(items.slice(0, 5));
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
    getSuggestionsFromTopArtists(items.slice(0, 5));
  };

  const getSuggestionsFromTopTracks = async (
    seed: Track[] = topTracks.slice(0, 5)
  ) => {
    const seed_tracks = seed.map((track: Track) => track.id).join(",");
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

  const getSuggestionsFromTopArtists = async (
    seed: Artist[] = topArtists.slice(0, 5)
  ) => {
    const seed_artists = seed.map((artist: Artist) => artist.id).join(",");
    const res = await fetch("/api/suggestions", {
      method: "POST",
      body: JSON.stringify({
        seed_tracks: "",
        seed_artists: seed_artists,
        seed_genres: "",
      }),
    });
    const { tracks } = await res.json();
    setSuggestedTracks(tracks);
  };

  useEffect(() => {
    setSuggestedTracks([]);
    setTopTracks([]);
    setTopArtists([]);
    seedType.value === SeedType.Track ? getTopTracks() : getTopArtists();
  }, [timeRange, seedType]);

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="w-full flex gap-4 my-4">
          <div className="py-8 w-full bg-white border rounded-lg">
            <div className="px-8 flex justify-between items-center mb-4">
              <ButtonBar
                value={seedType}
                setValue={setSeedType}
                options={seedTypes}
              ></ButtonBar>
              <ButtonBar
                value={timeRange}
                setValue={setTimeRange}
                options={timeRanges}
              ></ButtonBar>
            </div>
            {(seedType.value === SeedType.Track && topTracks.length >= 1) ||
            (seedType.value === SeedType.Artist && topArtists.length >= 1) ? (
              <List>
                {seedType.value === SeedType.Track
                  ? topTracks.map((track: Track) => (
                      <ListItem key={track.id}>
                        <TrackListItem track={track}></TrackListItem>
                      </ListItem>
                    ))
                  : topArtists.map((artist: Artist) => (
                      <ListItem key={artist.id}>
                        <ArtistListItem artist={artist}></ArtistListItem>
                      </ListItem>
                    ))}
              </List>
            ) : (
              <div className="flex justify-center items-center">
                <div
                  className="w-12 h-12 rounded-full animate-spin
                    border-4 border-solid border-emerald-500 border-t-transparent"
                ></div>
              </div>
            )}
          </div>
          <div className="py-8 w-full bg-white border rounded-lg">
            <div className="px-8 flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Suggestions</h3>
              <div
                className="w-10 h-10 text-gray-500 hover:text-white hover:bg-emerald-500 hover:cursor-pointer p-2 rounded-md"
                onClick={() => {
                  setSuggestedTracks([]);
                  seedType.value === SeedType.Track
                    ? getSuggestionsFromTopTracks()
                    : getSuggestionsFromTopArtists();
                }}
              >
                <RefreshIcon></RefreshIcon>
              </div>
            </div>
            {suggestedTracks.length >= 1 ? (
              <List>
                {suggestedTracks.map((track: Track) => (
                  <ListItem key={track.id}>
                    <TrackListItem track={track}></TrackListItem>
                  </ListItem>
                ))}
              </List>
            ) : (
              <div className="flex justify-center items-center">
                <div
                  className="w-12 h-12 rounded-full animate-spin
                    border-4 border-solid border-emerald-500 border-t-transparent"
                ></div>
              </div>
            )}
          </div>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Home;
