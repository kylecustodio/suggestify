import type { NextPage } from "next";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session } = useSession();
  return (
    <div>
      Signed in as {session?.user?.name} <br />
    </div>
  );
};

export default Home;
