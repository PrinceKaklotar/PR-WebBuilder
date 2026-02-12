import React, { useEffect, useState } from "react";
import type { Project } from "../types";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Loader2Icon, PlusIcon, Trash2Icon, TrashIcon } from "lucide-react";
import { dummyProjects } from "../assets/assets";
import Footer from "../components/Footer";

// community is same as my project.

const Community = () => {
  // store project data inn array -> ([]) initially empty array
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const Navigate = useNavigate();

  // for facth project data
  const fectchProjcts = async () => {
    // loading animation saw
    // we want to stop this animation after 1 sec
    setProjects(dummyProjects);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
 
  // when this component loaded then it func run and called fatchproject
  useEffect(() => {
    fectchProjcts();
  }, []);

  return (
    <>
      <div>
        <img
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/hero/bg-gradient-2.png"
          className="absolute inset-0 -z-10 size-full opacity-70"
          alt=""
        />
        {loading ? (
          <div className="flex flex-col items-center justify-center h-screen text-white">
            <Loader2Icon className="animate-spin w-12 h-12 mb-4" />
            <p className="text-lg font-medium">Loading...</p>
          </div>
        ) : projects.length > 0 ? (
          <div className="py-4 min-h-[80vh]">
            <div className=" ml-22 mx-auto flex items-center justify-between px-10 mt-10 mb-10">
              <h1 className="text-3xl font-bold text-blue-300">All Published Projects</h1>

              
            </div>

            <div className="flex flex-wrap gap-3.5 ml-25  shadow-blue-500 ">
              {projects.map((projecto) => (
                <Link
                  
                  key={projecto.id}
                  to={`/view/${projecto.id}`}
                  target='_blank' // this means open new tab
                  className="relative group w-72 max-sm:mx-auto cursor-pointer bg-gray-900/60 border border-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-indigo-700/30 hover:border-indigo-800/80 transition-all duration-300 flex flex-col"
                >
                  {/* Desktop-like website nani size ma delkhase */}
                  <div className="relative w-full h-40 bg-gray-900 overflow-hidden border-b border-gray-800">
                    {projecto.current_code ? (
                      <iframe
                        srcDoc={projecto.current_code}
                        className="absolute top-0 left-0 w-[1200px] h-[800px] origin-top-left pointer-events-none"
                        sandbox="allow-scripts allow-same-origin"
                        style={{ transform: "scale(0.25)" }}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-500">
                        <p>No Preview</p>
                      </div>
                    )}
                  </div>
                  {/* content , card ni niche dekhay te */}
                  <div className="p-4 text-white bg-linear-180 from-transparent group-hover:from-blue-950 to-transparent transition-colors flex flex-col flex-1">
                    <div className="flex items-start justify-between ">
                      <h2 className="text-lg font-medium line-clamp-2">
                        {projecto.name}
                      </h2>
                      <button className="px-2.5 py-0.5 border border-gray-50 rounded-2xl bg-gray-800 text-xs mt-1 ml-2 ">
                        Website
                      </button>
                    </div>
                    <p className="text-sm mt-1 text-gray-400 ">
                      {projecto.initial_prompt}
                    </p>

                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="flex justify-between items-center text-white mt-auto pt-6"
                    >
                      <span className="text-xs text-gray-500">
                        {new Date(projecto.createdAt).toLocaleDateString()}
                      </span>

                      <div className="flex gap-3 text-end">
                        <button
                          // onClick={(e) => {
                          //       e.stopPropagation()
                          //       window.open(`/community/${projecto.id}`, '_blank')
                          //     }}
                          className="px-3 py-1.5 bg-white/10 hover:bg-white/15 rounded-md trasition-all"
                        >
                          <span>
                              {projecto.user?.name}
                          </span>
                             
                        </button>
                       
                      </div>
                    </div>
                  </div>
                  
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex flex-col items-center justify-center h-screen">
              {/* <h1 className="bg-gradient-to-r from-orange-700 to-green-500 bg-clip-text text-transparent text-3xl font-bold">
                          Gradient Text
                        </h1> */}

              <h1 className="text-5xl bg-gradient-to-r from-yellow-700 to-blue-500 bg-clip-text text-transparent text-3xl font-bold mb-5 leading-normal">
                You have not create any project !
              </h1>
              <button
                onClick={() => Navigate("/")}
                className="bg-gradient-to-r from-orange-700 to-green-500 text-black font-bold rounded-2xl px-6 py-2"
              >
                <div className="flex flex-row">
                  <PlusIcon className="m-1 size-7" />
                  <h1 className="text-2xl">Create Now</h1>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
       
      <Footer/>
       
    </>
  );
};


export default Community
