import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  CheckCircle2, Circle, Target, Sparkles, Copy, 
  RefreshCw, Calendar, Bell, X, HelpCircle 
} from 'lucide-react';

function AaronMobileApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [completedCerts, setCompletedCerts] = useState({});
  const [postHistory, setPostHistory] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Persistance locale
  useEffect(() => {
    const saved = localStorage.getItem('aaron_data');
    if (saved) {
      const parsed = JSON.parse(saved);
      setPostHistory(parsed.postHistory || []);
      setCompletedCerts(parsed.completedCerts || {});
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('aaron_data', JSON.stringify({ postHistory, completedCerts }));
  }, [postHistory, completedCerts]);

  const generatePost = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const newPost = {
        id: Date.now(),
        text: "L'IA est l'avenir du terrain. 🌍 #AaronOS",
        date: new Date().toLocaleDateString()
      };
      setPostHistory([newPost, ...postHistory]);
      setIsGenerating(false);
      const id = Date.now();
      setNotifications([{ id, msg: "Post généré !" }]);
      setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 pb-20 font-sans">
      <header className="p-4 border-b border-cyan-500/20 flex justify-between items-center sticky top-0 bg-slate-950/90 backdrop-blur">
        <div className="flex items-center gap-2">
          <Sparkles className="text-cyan-400 w-6 h-6" />
          <h1 className="text-lg font-bold tracking-tight">AARON OS</h1>
        </div>
        <Bell className="text-slate-500 w-5 h-5" />
      </header>

      <main className="p-5 space-y-6">
        {activeTab === 'dashboard' && (
          <div className="animate-in fade-in duration-500">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl border border-cyan-500/20 shadow-xl">
              <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2">Progression</p>
              <div className="text-4xl font-black mb-4">45%</div>
              <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 w-[45%] shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
              </div>
            </div>

            <div className="mt-8 bg-cyan-500/5 border border-cyan-500/20 p-4 rounded-xl">
              <h2 className="flex items-center gap-2 text-sm font-bold text-cyan-400 mb-2">
                <HelpCircle className="w-4 h-4" /> Mode d'emploi
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Utilise le menu du bas pour naviguer. Tes données sont sauvegardées localement sur ton téléphone.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'generator' && (
          <div className="space-y-4">
            <button 
              onClick={generatePost}
              disabled={isGenerating}
              className="w-full bg-cyan-500 text-slate-950 py-4 rounded-xl font-black uppercase tracking-tighter flex items-center justify-center gap-2 active:scale-95 transition"
            >
              {isGenerating ? <RefreshCw className="animate-spin w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
              Générer Contenu
            </button>
            <div className="space-y-3">
              {postHistory.map(p => (
                <div key={p.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <p className="text-sm italic">"{p.text}"</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-[10px] text-slate-500">{p.date}</span>
                    <button className="text-cyan-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                      <Copy className="w-3 h-3" /> Copier
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-slate-950 border-t border-slate-800 flex justify-around py-3 px-6">
        <button onClick={() => setActiveTab('dashboard')} className={`flex flex-col items-center gap-1 ${activeTab === 'dashboard' ? 'text-cyan-400' : 'text-slate-600'}`}>
          <Target className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase">Focus</span>
        </button>
        <button onClick={() => setActiveTab('generator')} className={`flex flex-col items-center gap-1 ${activeTab === 'generator' ? 'text-cyan-400' : 'text-slate-600'}`}>
          <Sparkles className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase">IA</span>
        </button>
      </nav>

      {notifications.length > 0 && (
        <div className="fixed top-5 right-5 left-5 z-50">
          {notifications.map(n => (
            <div key={n.id} className="bg-cyan-500 text-slate-950 px-4 py-3 rounded-lg font-bold text-sm shadow-2xl flex justify-between items-center">
              {n.msg} <X className="w-4 h-4" onClick={() => setNotifications([])} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AaronMobileApp />
  </React.StrictMode>
);
