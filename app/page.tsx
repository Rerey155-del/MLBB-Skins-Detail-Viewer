"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Skin {
  id: string;
  hero: string;
  name: string;
  image: string;
}

export default function Page() {
  const [skins, setSkins] = useState<Skin[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    fetch("https://mlbb-skins-api.vercel.app/")
      .then((res) => res.json())
      .then((data) => {
        setSkins(data.data.skins);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil data:", err);
        setIsLoading(false);
      });
  }, []);

  return (
    <section className="bg-[#57564F] min-h-screen">
      <main className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-white">MLBB Skins</h1>

        {isLoading ? (
          // ✅ Loading Spinner DaisyUI
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-dots loading-xl text-primary"></span>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {skins.map((skin) => (
              <Link href={`/skins/${skin.id}`} key={skin.id}>
                <motion.div
                  whileHover={{ scale: 1.03, rotate: 0.5 }}
                  whileTap={{ scale: 0.97 }}
                  className="card bg-base-100 shadow-md hover:shadow-xl transition-transform"
                >
                  <figure className="px-4 pt-4">
                    <img
                      src={skin.image}
                      alt={skin.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </figure>
                  <div className="card-body items-start text-left">
                    <h2 className="text-white card-title text-sm sm:text-md md:text-lg">
                      {skin.hero} - {skin.name}
                    </h2>
                    <div className="card-actions justify-end mt-2">
                      <button className="btn btn-primary btn-sm">Lihat Detail</button>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </section>
  );
}
