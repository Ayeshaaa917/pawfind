"use client";
import { useState } from "react";

export default function FoundForm() {
  const [form, setForm] = useState({ location: "", description: "" });
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
        <div style={{fontSize:"48px"}}>💚</div>
        <h2 style={{color:"#4ade80"}}>Thank You!</h2>
        <p style={{color:"rgba(255,255,255,0.5)"}}>Your report is live. The owner will be notified!</p>
        <button onClick={() => setSubmitted(false)} style={{padding:"12px 24px",background:"#4ade80",color:"black",fontWeight:"bold",borderRadius:"12px",border:"none",cursor:"pointer"}}>
          Report Another
        </button>
      </div>
    );
  }

  return (
    <div style={{display:"flex",flexDirection:"column",gap:"16px"}}>
      <div>
        <h2 style={{fontSize:"18px",fontWeight:"bold",color:"white",margin:"0 0 4px"}}>Found a Pet? 💚</h2>
        <p style={{color:"rgba(255,255,255,0.4)",fontSize:"12px",margin:0}}>Report it so the owner can find them!</p>
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
        {key:"location",label:"Where did you find them? *",placeholder:"e.g. Central Park, NYC"},
        {key:"description",label:"Description",placeholder:"e.g. Brown dog, red collar"},
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
      <button onClick={() => setSubmitted(true)}
        style={{width:"100%",padding:"16px",background:"#4ade80",color:"black",fontWeight:"bold",borderRadius:"12px",border:"none",cursor:"pointer",fontSize:"14px"}}>
        Report Found Pet 💚
      </button>
    </div>
  );
}