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
      <div className="p-6 text-center">
        <h1 className="text-2xl font-semibold text-red-600 mb-4">Skin tidak ditemukan 😢</h1>
        <button onClick={() => history.back()} className="text-blue-600 underline">
          &larr; Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button onClick={() => history.back()} className="text-blue-600 underline mb-4">
        &larr; Back
      </button>
      <div className="bg-gray-100 p-6 rounded-xl shadow-lg flex flex-col md:flex-row gap-6">
        {/* Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">
            {skin.hero} - {skin.name}
          </h1>
          <p className="text-lg text-gray-600 mb-2">Tipe: {skin.type}</p>
          <p className="text-md mb-4">
            Harga: {skin.price} {skin.currency || "BP"}
          </p>
          <ul className="list-disc list-inside text-sm text-gray-700">
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
  );
}
