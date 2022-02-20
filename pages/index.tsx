import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="grid place-items-center h-screen bg-gray-100">
      <div className="text-center flex flex-col space-y-4">
        <h1 className="text-4xl font-semibold">Suggestify</h1>
        <p className="text-xl text-gray-500">
          Get suggestions based on your listening habits
        </p>
        <div className="py-3">
          <a
            href="#"
            className="py-3 px-6 font-semibold rounded-md bg-emerald-500 text-white hover:bg-emerald-600"
          >
            Log In
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
