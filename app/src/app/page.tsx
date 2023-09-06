"use client"

// React + Next
import { useEffect, useState } from 'react';
import ExportedImage from "next-image-export-optimizer";

// Constants
import wrestlers from '../constants/wrestlers';

const Home = () => {
  return (
    <main className="flex flex-wrap content-center justify-center h-screen w-screen bg-zinc-50 sm:ml-20 sm:p-4">
      {wrestlers.map((wrestler, idx) => {
        return (
          <div className={"wrestler " + wrestler.color} key={idx}>
            <p className="wrestler-name">{wrestler.name}</p>

            <ExportedImage
              className="wrestler-image"
              src={wrestler.image}
              alt={"An image of " + wrestler.name}
              height={64}
              width={64}
            />
          </div>
        )
      })}
    </main>
  )
}

export default Home;