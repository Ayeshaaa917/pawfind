"use client";
import { useState } from "react";

interface Pet {
  id: number;
  name: string;
  breed: string;
  lastSeenLocation: string;
  reward: string;
  postedAt: number;
  imageUrl: string;
}

export default function PetCard({ pet }: { pet: Pet }) {
  const [expanded, setExpanded] = useState(false);

  const timeAgo = (ts: number) => {
    const diff = Math.floor((Date.now() - ts) / 60000);
    if (diff < 60) return diff + "m ago";
    if (diff < 1440) return Math.floor(diff / 60) + "h ago";
    return Math.floor(diff / 1440) + "d ago";
  };

  return (
    <div style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"16px",overflow:"hidden"}}>
      <div style={{position:"relative",height:"160px"}}>
        <img src={pet.imageUrl} alt={pet.name} style={{width:"100%",height:"100%",objectFit:"cover"}} />
        <div style={{position:"absolute",top:"8px",left:"8px",background:"rgba(239,68,68,0.9)",color:"white",fontSize:"11px",fontWeight:"bold",padding:"4px 8px",borderRadius:"999px"}}>LOST</div>
        <div style={{position:"absolute",top:"8px",right:"8px",background:"rgba(251,191,36,0.9)",color:"black",fontSize:"11px",fontWeight:"bold",padding:"4px 8px",borderRadius:"999px"}}>{pet.reward} ETH</div>
      </div>
      <div style={{padding:"12px"}}>
        <div style={{display:"flex",justifyContent:"space-between"}}>
          <div>
            <h3 style={{fontWeight:"bold",fontSize:"16px",color:"white",margin:0}}>{pet.name}</h3>
            <p style={{color:"rgba(255,255,255,0.5)",fontSize:"12px",margin:0}}>{pet.breed}</p>
          </div>
          <span style={{color:"rgba(255,255,255,0.3)",fontSize:"12px"}}>{timeAgo(pet.postedAt)}</span>
        </div>
        <div style={{marginTop:"8px",fontSize:"12px",color:"rgba(255,255,255,0.5)"}}>📍 {pet.lastSeenLocation}</div>
        <div style={{display:"flex",gap:"8px",marginTop:"12px"}}>
          <button onClick={() => setExpanded(!expanded)} style={{flex:1,padding:"8px",borderRadius:"12px",border:"none",cursor:"pointer",background:"rgba(255,255,255,0.05)",color:"rgba(255,255,255,0.6)",fontSize:"12px"}}>
            {expanded ? "Less ↑" : "Details ↓"}
          </button>
          <button style={{flex:1,padding:"8px",borderRadius:"12px",border:"none",cursor:"pointer",background:"#fbbf24",color:"black",fontSize:"12px",fontWeight:"bold"}}>
            I Found Them! 🐾
          </button>
        </div>
        {expanded && (
          <div style={{marginTop:"12px",paddingTop:"12px",borderTop:"1px solid rgba(255,255,255,0.1)",fontSize:"12px",color:"rgba(255,255,255,0.5)"}}>
            <p style={{margin:0}}>Pet ID: #{pet.id} — Reward auto-released on confirmation.</p>
          </div>
        )}
      </div>
    </div>
  );
}