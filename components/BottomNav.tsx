"use client";

export type Tab = "feed" | "lost" | "found";

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: "feed", label: "Feed", icon: "🏠" },
  { id: "lost", label: "Report Lost", icon: "🚨" },
  { id: "found", label: "Found One", icon: "💚" },
];

export default function BottomNav({
  activeTab,
  setActiveTab,
}: {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}) {
  return (
    <nav style={{
  position:"fixed",
  bottom:0,
  left:0,
  right:0,
  zIndex:10
}}>
      <div style={{display:'flex', justifyContent:'space-around', maxWidth:'400px', margin:'0 auto'}}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display:'flex', flexDirection:'column', alignItems:'center', gap:'2px',
              padding:'8px 16px', borderRadius:'12px', border:'none', cursor:'pointer',
              background:'transparent',
              color: activeTab === tab.id ? '#fbbf24' : 'rgba(255,255,255,0.3)'
            }}
          >
            <span style={{fontSize:'20px'}}>{tab.icon}</span>
            <span style={{fontSize:'10px', fontWeight:'500'}}>{tab.label}</span>
            {activeTab === tab.id && (
              <span style={{width:'4px', height:'4px', borderRadius:'50%', background:'#fbbf24'}} />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}
