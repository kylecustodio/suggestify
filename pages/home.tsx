import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import TrackTile from "../components/trackTile";
import TrackList from "../components/trackList";
import ArtistList from "../components/artistList";
import InfoCard from "../components/infoCard";

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

  useEffect(() => {
    getTopTracks();
    getTopArtists();
    console.log("getting top artists and tracks");
  }, []);

  return (
    <div className="container mx-auto">
      <InfoCard title="Top Tracks">
        <TrackList tracks={topTracks}></TrackList>
      </InfoCard>
      <InfoCard title="Top Artists">
        <ArtistList artists={topArtists}></ArtistList>
      </InfoCard>
    </div>
  );
};

export default Home;
