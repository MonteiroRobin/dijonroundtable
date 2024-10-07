"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  // Loader state to simulate loading screen
  const [loading, setLoading] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Simulate loading for 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Update mouse position for hover effect
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="min-h-screen bg-white relative overflow-hidden"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {loading ? (
        // Simple loader animation
        <div className="loader flex items-center justify-center">
          <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-black"></div>
        </div>
      ) : (
        <div className="min-h-screen bg-white opacity-0 animate-fade-in w-full p-6 flex flex-col items-center relative">
          {/* Background shadow effect following mouse */}
          <div
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,0.05), transparent 40%)`,
            }}
          ></div>

          {/* Logo */}
          <div className="mt-8 transform transition-transform duration-500 hover:scale-110">
            <Image
              className="dark:invert"
              src="https://nextjs.org/icons/next.svg"
              alt="Logo Dijon Roundtable"
              width={120}
              height={120}
              priority
            />
          </div>

          {/* Navbar */}
          <nav className="mt-4 w-full border-b border-black flex justify-center">
            <ul className="flex gap-8 text-sm font-semibold">
              <li className="hover:text-gray-700 hover:underline cursor-pointer transition duration-300">
                Accueil
              </li>
              <li className="hover:text-gray-700 hover:underline cursor-pointer transition duration-300">
                À propos
              </li>
              <li className="hover:text-gray-700 hover:underline cursor-pointer transition duration-300">
                Événements
              </li>
              <li className="hover:text-gray-700 hover:underline cursor-pointer transition duration-300">
                Contact
              </li>
            </ul>
          </nav>

          {/* Main content */}
          <div className="flex flex-col items-center justify-center mt-16">
            <h1 className="text-5xl font-extrabold text-center mb-4 hover:scale-105 transition-transform duration-300">
              Bienvenue à Dijon Roundtable
            </h1>
            <p className="text-lg text-center max-w-2xl mb-6 hover:scale-105 transition-transform duration-300">
              Rejoignez notre communauté d&apos;entrepreneurs basée à Dijon et
              participez à des événements, ateliers et discussions autour de
              l&apos;innovation et du développement personnel.
            </p>

            {/* Input for newsletter */}
            <form
              action="TON_LINK_BREVO"
              method="POST"
              className="mt-8 flex flex-col sm:flex-row items-center gap-4"
            >
              <input
                type="email"
                placeholder="Entrez votre email"
                className="border border-gray-300 p-3 rounded-lg w-64 sm:w-80 shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300"
                required
              />
              <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-700 hover:shadow-xl transition-all duration-300">
                S&apos;abonner
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
