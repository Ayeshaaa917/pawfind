"use client";
import { ConnectWallet } from "@coinbase/onchainkit/wallet";
import { useState } from "react";
import LostFeed from "@/components/LostFeed";
import PostPetForm from "@/components/PostPetForm";
import FoundForm from "@/components/FoundForm";
import BottomNav from "@/components/BottomNav";

type Tab = "feed" | "lost" | "found";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<Tab>("feed");

  return (
    <main style={{minHeight:"100vh",background:"#0d0d0d",color:"white",fontFamily:"sans-serif",paddingBottom:"96px"}}>
      <header style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"24px 20px 16px",borderBottom:"1px solid rgba(255,255,255,0.1)"}}>
        <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
          <span style={{fontSize:"24px"}}>🐾</span>
          <span style={{fontSize:"20px",fontWeight:"bold",color:"#fbbf24"}}>PawFind</span>
        </div>
        <ConnectWallet />
      </header>
      <div style={{padding:"16px"}}>
        {activeTab === "feed" && <LostFeed />}
        {activeTab === "lost" && <PostPetForm type="lost" />}
        {activeTab === "found" && <FoundForm />}
      </div>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </main>
  );
}
