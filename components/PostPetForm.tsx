"use client";
import { useState } from "react";

export default function PostPetForm({ type: _type }: { type: "lost" | "found" }) {
  const [form, setForm] = useState({ name: "", breed: "", location: "", reward: "0.01" });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImagePreview(URL.createObjectURL(file));
  };

  if (submitted) {
    return (
      <div style={{textAlign:"center",padding:"64px 0"}}>
        <div style={{fontSize:"48px"}}>🐾</div>
        <h2 style={{color:"#fbbf24"}}>Posted on Base!</h2>
        <p style={{color:"rgba(255,255,255,0.5)"}}>Your post is live. {form.reward} ETH locked in escrow.</p>
        <button onClick={() => setSubmitted(false)} style={{padding:"12px 24px",background:"#fbbf24",color:"black",fontWeight:"bold",borderRadius:"12px",border:"none",cursor:"pointer"}}>
          Post Another
        </button>
      </div>
    );
  }

  return (
    <div style={{display:"flex",flexDirection:"column",gap:"16px"}}>
      <div>
        <h2 style={{fontSize:"18px",fontWeight:"bold",color:"white",margin:"0 0 4px"}}>Report a Lost Pet 🐾</h2>
        <p style={{color:"rgba(255,255,255,0.4)",fontSize:"12px",margin:0}}>Lock ETH reward — paid when your pet is found</p>
      </div>
      <label style={{cursor:"pointer"}}>
        <div style={{borderRadius:"16px",border:"2px dashed rgba(255,255,255,0.2)",height:imagePreview?"160px":"112px",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
          {imagePreview
            ? <img src={imagePreview} style={{width:"100%",height:"100%",objectFit:"cover"}} alt="preview" />
            : <div style={{textAlign:"center"}}><div style={{fontSize:"32px"}}>📷</div><p style={{color:"rgba(255,255,255,0.4)",fontSize:"12px"}}>Tap to upload photo</p></div>
          }
        </div>
        <input type="file" accept="image/*" style={{display:"none"}} onChange={handleImage} />
      </label>
      {[
        {key:"name",label:"Pet Name *",placeholder:"e.g. Mochi"},
        {key:"breed",label:"Breed",placeholder:"e.g. Shiba Inu"},
        {key:"location",label:"Last Seen Location *",placeholder:"e.g. Central Park, NYC"},
      ].map(({key,label,placeholder}) => (
        <div key={key}>
          <label style={{fontSize:"12px",color:"rgba(255,255,255,0.5)",display:"block",marginBottom:"4px"}}>{label}</label>
          <input
            type="text"
            placeholder={placeholder}
            value={form[key as keyof typeof form]}
            onChange={(e) => setForm({...form,[key]:e.target.value})}
            style={{width:"100%",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"12px",padding:"12px 16px",fontSize:"14px",color:"white",outline:"none",boxSizing:"border-box"}}
          />
        </div>
      ))}
      <div>
        <label style={{fontSize:"12px",color:"rgba(255,255,255,0.5)",display:"block",marginBottom:"4px"}}>Reward (ETH)</label>
        <div style={{display:"flex",gap:"8px"}}>
          {["0.005","0.01","0.05","0.1"].map((val) => (
            <button key={val} onClick={() => setForm({...form,reward:val})}
              style={{flex:1,padding:"8px",borderRadius:"12px",border:"none",cursor:"pointer",fontSize:"12px",fontWeight:"500",background:form.reward===val?"#fbbf24":"rgba(255,255,255,0.05)",color:form.reward===val?"black":"rgba(255,255,255,0.5)"}}>
              {val}
            </button>
          ))}
        </div>
      </div>
      <button onClick={() => setSubmitted(true)}
        style={{width:"100%",padding:"16px",background:"#fbbf24",color:"black",fontWeight:"bold",borderRadius:"12px",border:"none",cursor:"pointer",fontSize:"14px"}}>
        Post + Lock {form.reward} ETH Reward
      </button>
    </div>
  );
}