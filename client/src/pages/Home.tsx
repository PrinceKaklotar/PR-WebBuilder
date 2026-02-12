import { Loader2Icon } from "lucide-react";
import React, { useState } from "react";

const Home = () => {
  // for text area where user insert promt
  const [input, setInput] = useState("");

  // loading
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    // when someone press on submit or crare button
    setLoading(true);

    // api simulate for genrating web

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  // so this is i addeed line

  return (
    <section className="flex flex-col items-center text-white text-sm pb-20 px-4 font-poppins">
      <img
        src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/hero/bg-gradient-2.png"
        className="absolute inset-0 -z-10 size-full opacity-50"
        alt=""
      />

      <br />
      <br />

      {/* <h1 className="text-center text-5xl md:text-7xl font-extrabold 
                 bg-gradient-to-r from-yellow-500 via-blue-500 to-green-500 
                 bg-clip-text text-transparent">
                Welcome to PR WebBuilder 
            </h1>
       */}
      <br />
      <br />
      <h1
        className="text-center text-5xl md:text-7xl font-extrabold 
                 bg-gradient-to-r from-yellow-500 via-blue-500 to-green-500 
                 bg-clip-text text-transparent"
      >
        Turn Your idea into beautiful Website !
      </h1>

      {/* <h2 className="text-center text-[40px] leading-[48px] md:text-6xl md:leading-[70px] mt-4 font-semibold max-w-3xl ">
       
        </h2>
        <br /><br /> */}
      <br />
      <br />
      <p className="text-center text-2xl  mt-2  text-shadow-black">
        Create, Customize and Publish your website using this PR WebBuilder
      </p>

      <form
        onSubmit={onSubmitHandler}
        className="bg-white/10 max-w-2xl w-full rounded-xl p-4 mt-10
                                border border-white-600/70
                                focus-within:ring-2 ring-white-500
                                shadow-[0_0_25px_rgba(34,197,94,0.5)]
                                transition-all"
      >
        <textarea
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent outline-none text-gray-300 resize-none w-full text-xl"
          rows={4}
          placeholder="Describe your presentation in details"
          required
        />
        <button className="ml-auto flex items-center gap-2 bg-gradient-to-r from-[#e305c2] to-indigo-600 rounded-md px-4 py-2">
          {!loading ? (
            "Create with AI"
          ) : (
            <span className="flex items-center gap-2">
              Creating
              <Loader2Icon className="animate-spin w-4 h-4" />
            </span>
          )}
        </button>
      </form>
    </section>
  );
};

export default Home;
