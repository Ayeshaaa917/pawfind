"use client";

import { useState } from "react";
import { useWriteContract } from "wagmi";
import { parseEther } from "viem";

const CONTRACT_ADDRESS = "0xfe71e8bb0be8adc089827208c1e66e2ef3d0bcfc";

const ABI = [
  {
    name: "reportLostPet",
    type: "function",
    stateMutability: "payable",
    inputs: [{ name: "cid", type: "string" }],
    outputs: []
  }
];

export default function PostPetForm({ type: _type }: { type: "lost" | "found" }) {

  const { writeContractAsync } = useWriteContract();

  const [form, setForm] = useState({
    name: "",
    breed: "",
    location: "",
    reward: "0.01"
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
  };

  async function handleSubmit() {
    try {

      setLoading(true);

      await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: ABI,
        functionName: "reportLostPet",
        args: ["placeholder-cid"], 
        value: parseEther(form.reward)
      });

      setSubmitted(true);

    } catch (err) {
      console.error(err);
      alert("Transaction failed");

    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div style={{textAlign:"center",padding:"64px 0"}}>
        <div style={{fontSize:"48px"}}>🐾</div>

        <h2 style={{color:"#fbbf24"}}>Posted On-Chain!</h2>

        <p style={{color:"rgba(255,255,255,0.5)"}}>
          Your post is now stored on Base.
        </p>

        <button
          onClick={() => setSubmitted(false)}
          style={{
            padding:"12px 24px",
            background:"#fbbf24",
            color:"black",
            fontWeight:"bold",
            borderRadius:"12px",
            border:"none",
            cursor:"pointer"
          }}
        >
          Post Another
        </button>
      </div>
    );
  }

  return (

    <div style={{display:"flex",flexDirection:"column",gap:"16px"}}>

      <div>
        <h2 style={{fontSize:"18px",fontWeight:"bold",color:"white",margin:"0 0 4px"}}>
          Report Lost Pet 🐾
        </h2>

        <p style={{color:"rgba(255,255,255,0.4)",fontSize:"12px",margin:0}}>
          Optional reward locked in smart contract
        </p>
      </div>

      <label style={{cursor:"pointer"}}>

        <div
          style={{
            borderRadius:"16px",
            border:"2px dashed rgba(255,255,255,0.2)",
            height:imagePreview ? "160px" : "112px",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            overflow:"hidden"
          }}
        >

          {imagePreview ? (
            <img
              src={imagePreview}
              style={{width:"100%",height:"100%",objectFit:"cover"}}
              alt="preview"
            />
          ) : (
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:"32px"}}>📷</div>
              <p style={{color:"rgba(255,255,255,0.4)",fontSize:"12px"}}>
                Upload Photo
              </p>
            </div>
          )}

        </div>

        <input
          type="file"
          accept="image/*"
          style={{display:"none"}}
          onChange={handleImage}
        />

      </label>

      {["name","breed","location"].map((field) => (

        <input
          key={field}
          placeholder={field}
          value={(form as any)[field]}
          onChange={(e)=>setForm({...form,[field]:e.target.value})}
          style={{
            width:"100%",
            background:"rgba(255,255,255,0.05)",
            border:"1px solid rgba(255,255,255,0.1)",
            borderRadius:"12px",
            padding:"12px",
            color:"white"
          }}
        />

      ))}

      <input
        placeholder="Reward ETH"
        value={form.reward}
        onChange={(e)=>setForm({...form,reward:e.target.value})}
        style={{
          width:"100%",
          background:"rgba(255,255,255,0.05)",
          border:"1px solid rgba(255,255,255,0.1)",
          borderRadius:"12px",
          padding:"12px",
          color:"white"
        }}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          padding:"16px",
          background:"#fbbf24",
          color:"black",
          fontWeight:"bold",
          borderRadius:"12px",
          border:"none",
          cursor:"pointer"
        }}
      >
        {loading ? "Sending Transaction..." : `Post + Lock ${form.reward} ETH`}
      </button>

    </div>
  );
}
