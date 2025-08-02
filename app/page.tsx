'use client';

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Skin {
  id: string;
  hero: string;
  name: string;
  image: string;
}

export default function Page() {
  const [skins, setSkins] = useState<Skin[]>([])

  useEffect(() => {
    fetch('https://mlbb-skins-api.vercel.app/')
      .then(res => res.json())
      .then(data => setSkins(data.data.skins)) // <-- ambil dari data.data.skins
      .catch(err => console.error('Gagal mengambil data:', err))
  }, [])

  return (
    <main className='max-w-6xl mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-6'>MLBB Skins</h1>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
        {skins.map(skin => (
          <Link href={`/skins/${skin.id}`} key={skin.id}>
            <div className='bg-gray-100 p-4 rounded shadow hover:shadow-lg transition'>
              <img
                src={skin.image}
                alt={skin.name}
                className='w-full h-48 object-cover rounded mb-3'
              />
              <h2 className='text-lg font-semibold'>{skin.hero} - {skin.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
