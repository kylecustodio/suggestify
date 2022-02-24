import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import TrackTile from "../components/trackTile";
import TrackList from "../components/trackList";
import ArtistList from "../components/artistList";

const timeRanges = [
  { name: "1 month", value: "short_term" },
  { name: "6 months", value: "medium_term" },
  { name: "All Time", value: "long_term" },
];

const Home: NextPage = () => {
  const { data: session } = useSession();
  const [timeRange, setTimeRange] = useState(timeRanges[0]);
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

  const getTop = async () => {
    getTopTracks();
    getTopArtists();
  };

  return (
    <div className="container mx-auto">
      <p>Signed in as {session?.user?.name}</p>
      <button
        onClick={getTop}
        className="py-3 px-6 font-semibold rounded-md bg-emerald-500 text-white hover:bg-emerald-600"
      >
        Get Data
      </button>
      <div className="p-8 w-1/2 bg-white border shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-slate-900">Top Tracks</h3>
        </div>
        <TrackList tracks={topTracks}></TrackList>
      </div>
      <div className="p-8 w-1/2 bg-white border shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-slate-900">Top Artists</h3>
        </div>
        <ArtistList artists={topArtists}></ArtistList>
      </div>
    </div>
  );
};

export default Home;
