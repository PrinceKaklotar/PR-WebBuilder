import { useParams } from "react-router-dom"
import { AuthView } from "@daveyplate/better-auth-ui"
import { useEffect, useState } from "react"

export default function AuthPage() {
  const { pathname } = useParams()

  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <main className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-[#0a0a0a]">

      {/* 🌈 Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-3xl opacity-60"></div>

      {/* 🖱️ Cursor Glow (FIXED EXACT POSITION) */}
      <div
        className="pointer-events-none fixed top-0 left-0 w-[180px] h-[180px] rounded-full blur-2xl opacity-40 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-transform duration-100 ease-out"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`
        }}
      />

      {/* 🔥 Container */}
      <div className="relative z-10 w-full max-w-lg">

        {/* 🔠 Title */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-lg text-gray-400 mt-3">
            Step into your creative workspace ✨
          </p>
        </div>

        {/* ✨ Glow Border Wrapper (NO ROTATION) */}
        <div className="relative w-full  p-[2px] rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">

          {/* 🧊 Auth Card */}
          <div className="bg-[#0f0f0f] rounded-3xl p-10 !rotate-0 !transform-none">

           <AuthView
  pathname={pathname}
  classNames={{
    base: "bg-transparent p-0 w-full flex justify-center",

    //container: "w-full max-w-md mx-auto", // ✅ THIS replaces card

    header: "text-white text-center text-lg",
    footer: "text-gray-400 text-center",

   // label: "text-gray-300",

  //  // input:
  //     "bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500",

    // button:
    //   "w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 text-white rounded-lg font-semibold shadow-lg shadow-indigo-500/30",

   // link: "text-indigo-400 hover:text-indigo-300",
  }}
/>

          </div>
        </div>

      </div>
    </main>
  )
}