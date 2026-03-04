"use client";

import { useState } from "react";
import PetCard from "./PetCard";

const MOCK_PETS = [
  {
    id: 1,
    name: "Mochi",
    breed: "Shiba Inu",
    lastSeenLocation: "Brooklyn, NY",
    reward: "0.05",
    postedAt: Date.now() - 3600000,
    imageUrl: "https://placedog.net/400/300?id=1",
  },
  {
    id: 2,
    name: "Luna",
    breed: "Bengal Cat",
    lastSeenLocation: "Austin, TX",
    reward: "0.1",
    postedAt: Date.now() - 7200000,
    imageUrl: "https://placedog.net/400/300?id=2",
  },
  {
    id: 3,
    name: "Biscuit",
    breed: "Golden Retriever",
    lastSeenLocation: "Seattle, WA",
    reward: "0.08",
    postedAt: Date.now() - 10800000,
    imageUrl: "https://placedog.net/400/300?id=5",
  },
];

export default function LostFeed() {
  const [filter, setFilter] = useState<"all" | "dogs" | "cats">("all");

  return (
    <div>
      {/* Stats */}
      <div style={{display:'flex', gap:'12px', marginBottom:'20px'}}>
        {[
          { label: 'Lost', value: '3', color: '#fbbf24' },
          { label: 'Found', value: '1', color: '#4ade80' },
          { label: 'ETH Pooled', value: '0.23', color: '#60a5fa' },
        ].map((stat) => (
          <div key={stat.label} style={{flex:1, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'12px', padding:'12px', textAlign:'center'}}>
            <div style={{fontSize:'20px', fontWeight:'bold', color:stat.color}}>{stat.value}</div>
            <div style={{fontSize:'11px', color:'rgba(255,255,255,0.5)', marginTop:'2px'}}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{display:'flex', gap:'8px', marginBottom:'16px'}}>
        {(["all", "dogs", "cats"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding:'6px 12px', borderRadius:'999px', border:'none', cursor:'pointer', fontSize:'12px', fontWeight:'500',
              background: filter === f ? '#fbbf24' : 'rgba(255,255,255,0.05)',
              color: filter === f ? 'black' : 'rgba(255,255,255,0.5)',
            }}
          >
            {f === "all" ? "🐾 All" : f === "dogs" ? "🐶 Dogs" : "🐱 Cats"}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
        {MOCK_PETS.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
    </div>
  );
}