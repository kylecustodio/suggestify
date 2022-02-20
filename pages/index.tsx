import type { NextPage } from "next";
import { signIn } from "next-auth/react";

const Login: NextPage = () => {
  return (
    <div className="grid place-items-center h-screen bg-gray-100">
      <div className="text-center flex flex-col space-y-4">
        <h1 className="text-4xl font-semibold">Suggestify</h1>
        <p className="text-xl text-gray-500">
          Get suggestions based on your listening habits
        </p>
        <div>
          <button
            onClick={() => signIn("spotify", { callbackUrl: "/home" })}
            className="py-3 px-6 font-semibold rounded-md bg-emerald-500 text-white hover:bg-emerald-600"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
