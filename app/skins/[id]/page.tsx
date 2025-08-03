"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface Skin {
  id: number;
  type: string;
  price: number;
  currency?: string;
  image: string;
  hero: string;
  name: string;
  attributes: {
    release_year: string;
    rarity: string;
    effects: string;
    availability: string;
    category?: string;
    additional_effects?: string;
    exclusivity?: string;
    event_context?: string;
  };
}

export default function SkinDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? parseInt(params.id[0]) : parseInt(params.id as string);
  const [skin, setSkin] = useState<Skin | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch("https://mlbb-skins-api.vercel.app/")
      .then((res) => res.json())
      .then((data) => {
        const found = data.data.skins.find((s: Skin) => s.id === id);
        setSkin(found || null);
      })
      .catch((err) => console.error("Fetching error:", err));
  }, [id]);

  if (!skin) {
    return (
      <div className="min-h-screen bg-[#57564F] p-6 flex items-center justify-center text-center">
       <span className="loading loading-dots loading-3xl"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#57564F] p-6">
      <div className="max-w-5xl mx-auto">
       
        <button className="btn btn-success mb-4 text-white" onClick={() => history.back()}>Back</button>

        <div className="bg-base-100 p-6 rounded-xl shadow-lg flex flex-col md:flex-row gap-6">
          {/* Info */}
          <div className="flex-1 text-neutral-content">
            <h1 className="text-3xl font-bold mb-2">
              {skin.hero} - {skin.name}
            </h1>
            <p className="text-lg mb-2">Tipe: {skin.type}</p>
            <p className="text-md mb-4">
              Harga: {skin.price} {skin.currency || "BP"}
            </p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Rilis: {skin.attributes.release_year}</li>
              <li>Kelangkaan: {skin.attributes.rarity}</li>
              <li>Efek: {skin.attributes.effects}</li>
              <li>Tersedia di: {skin.attributes.availability}</li>
            </ul>
          </div>

          {/* Gambar */}
          <div className="w-full md:w-1/3">
            <img
              src={skin.image}
              alt={skin.name}
              className="w-full h-auto max-h-[400px] object-cover rounded-md shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
