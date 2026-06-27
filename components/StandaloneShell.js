'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { ImageStudio, VideoStudio, ClippingStudio, VibeMotionStudio, LipSyncStudio, CinemaStudio, AudioStudio, MarketingStudio, WorkflowStudio, AgentStudio, AppsStudio, getUserBalance } from 'studio';

const DesignAgentStudio = dynamic(() => import('studio').then(mod => mod.DesignAgentStudio), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-black flex items-center justify-center text-white/20">Loading Design Studio...</div>
});
import axios from 'axios';
import ApiKeyModal from './ApiKeyModal';

const TABS = [
  { id: 'image',   label: 'Image Studio' },
  { id: 'video',   label: 'Video Studio' },
  { id: 'audio',   label: 'Audio Studio' },
  { id: 'clipping', label: 'AI Clipping' },
  { id: 'vibe-motion', label: 'Vibe Motion' },
  { id: 'lipsync', label: 'Lip Sync' },
  { id: 'cinema',  label: 'Cinema Studio' },
  { id: 'marketing', label: 'Marketing Studio' },
  { id: 'workflows', label: 'Workflows' },
  { id: 'agents', label: 'Agents' },
  { id: 'design-agent', label: 'Design Agent' },
  { id: 'apps', label: 'Explore Apps' },
  { id: 'admin-payments', label: 'Admin Payments' },
];

const STORAGE_KEY = 'muapi_key';
const ACCESS_STORAGE_KEY = 'aj_editz_ai_access_payment';
const ADMIN_INSTA_ID = 'aj__editz_2.0';
const ADMIN_INSTA_URL = 'https://www.instagram.com/aj__editz_2.0?igsh=MWpsNDJ4eHZiOWFxMg==';
const ADMIN_EMAIL = 'ajayx3neha@gmail.com';
const ADMIN_WHATSAPP = '9929562585';
const ACCESS_CHARGE = 10;

const getSavedAccessPayment = () => {
  if (typeof window === 'undefined') return null;
  try {
    const saved = localStorage.getItem(ACCESS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (err) {
    console.error('Payment data read failed:', err);
    return null;
  }
};

function AccessPaymentGate({ onApproved }) {
  const [paymentName, setPaymentName] = useState('');
  const [utr, setUtr] = useState('');
  const [adminNote, setAdminNote] = useState('');
  const [savedPayment, setSavedPayment] = useState(null);

  useEffect(() => {
    setSavedPayment(getSavedAccessPayment());
  }, []);

  const savePayment = (status) => {
    const payload = {
      instagramId: ADMIN_INSTA_ID,
      amount: ACCESS_CHARGE,
      payerName: paymentName || 'Guest User',
      utr: utr || 'Manual check pending',
      status,
      adminNote: adminNote || '',
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(ACCESS_STORAGE_KEY, JSON.stringify(payload));
    setSavedPayment(payload);
    if (status === 'received') onApproved();
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.18),transparent_30%),linear-gradient(135deg,#030303,#090909_50%,#171717)] text-white flex items-center justify-center px-4 py-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/assets/aj-editz-ui-bg.png')] bg-cover bg-center opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/50" />
      <div className="w-full max-w-5xl grid lg:grid-cols-[1.1fr_0.9fr] gap-6 items-stretch">
        <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-7 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-24 -top-24 w-64 h-64 rounded-full bg-amber-400/20 blur-3xl" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs font-bold text-amber-200 mb-6">
              AJ Editz AI • Admin @{ADMIN_INSTA_ID}
            </div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[0.95]">
              AJ Editz AI Studio
            </h1>
            <p className="mt-5 text-white/60 text-base sm:text-lg max-w-xl">
              Image, video, reels, audio, marketing aur AI editing tools ek hi branded dashboard me. Access unlock karne ke liye ₹{ACCESS_CHARGE} demo charge rakha gaya hai.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/70">
              <a href={ADMIN_INSTA_URL} target="_blank" rel="noopener noreferrer" className="rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 font-bold hover:bg-amber-300/20">Instagram @{ADMIN_INSTA_ID}</a>
              <a href={`https://wa.me/91${ADMIN_WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="rounded-full border border-green-300/20 bg-green-300/10 px-4 py-2 font-bold hover:bg-green-300/20">WhatsApp {ADMIN_WHATSAPP}</a>
              <a href={`mailto:${ADMIN_EMAIL}`} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 font-bold hover:bg-white/10">{ADMIN_EMAIL}</a>
            </div>
            <div className="grid sm:grid-cols-3 gap-3 mt-8">
              {['₹10 access charge', 'Admin payment status', 'AJ Editz AI tools'].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-black/25 p-4 text-sm font-semibold text-white/80">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-[#080b12]/90 p-6 sm:p-8 shadow-2xl">
          <h2 className="text-2xl font-black mb-2">Unlock Access</h2>
          <p className="text-sm text-white/50 mb-6">Payment aaya ya nahi — admin yahin se status set/check kar sakta hai.</p>

          {savedPayment && (
            <div className={`mb-5 rounded-2xl border p-4 text-sm ${savedPayment.status === 'received' ? 'border-green-400/30 bg-green-400/10 text-green-200' : 'border-yellow-400/30 bg-yellow-400/10 text-yellow-100'}`}>
              Current status: <b>{savedPayment.status === 'received' ? 'Payment Received' : 'Pending Admin Check'}</b><br />
              UTR/Ref: {savedPayment.utr}<br />
              Admin: @{savedPayment.instagramId}
            </div>
          )}

          <div className="space-y-4">
            <label className="block">
              <span className="text-xs font-bold text-white/40 uppercase tracking-wide">Customer name / Instagram</span>
              <input value={paymentName} onChange={(e) => setPaymentName(e.target.value)} placeholder="Example: customer_name" className="mt-2 w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white outline-none focus:border-amber-300/60" />
            </label>
            <label className="block">
              <span className="text-xs font-bold text-white/40 uppercase tracking-wide">Payment UTR / Ref ID</span>
              <input value={utr} onChange={(e) => setUtr(e.target.value)} placeholder="UPI transaction ID" className="mt-2 w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white outline-none focus:border-amber-300/60" />
            </label>
            <label className="block">
              <span className="text-xs font-bold text-white/40 uppercase tracking-wide">Admin note</span>
              <input value={adminNote} onChange={(e) => setAdminNote(e.target.value)} placeholder="Checked by AJ Editz" className="mt-2 w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white outline-none focus:border-amber-300/60" />
            </label>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 mt-6">
            <button onClick={() => savePayment('pending')} className="h-12 rounded-xl bg-yellow-400/10 border border-yellow-400/20 text-yellow-100 font-bold hover:bg-yellow-400/20 transition-colors">
              Mark Pending
            </button>
            <button onClick={() => savePayment('received')} className="h-12 rounded-xl bg-amber-300 text-black font-black hover:bg-amber-200 transition-colors">
              Payment Received • Open Studio
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

function AdminPaymentPanel({ onClose, onResetAccess }) {
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    setPayment(getSavedAccessPayment());
  }, []);

  const updateStatus = (status) => {
    const next = {
      ...(payment || { instagramId: ADMIN_INSTA_ID, amount: ACCESS_CHARGE, utr: 'Manual entry' }),
      status,
      reviewedAt: new Date().toISOString(),
    };
    localStorage.setItem(ACCESS_STORAGE_KEY, JSON.stringify(next));
    setPayment(next);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in-up px-4">
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-7 w-full max-w-lg shadow-2xl">
        <h2 className="text-white font-black text-xl mb-2">Admin Payment Check</h2>
        <p className="text-white/45 text-sm mb-6">Instagram ID: <b className="text-amber-200">@{ADMIN_INSTA_ID}</b> • Access charge ₹{ACCESS_CHARGE}</p>
        <div className="rounded-2xl bg-white/5 border border-white/10 p-4 text-sm text-white/70 space-y-2 mb-5">
          <div>Status: <b className={payment?.status === 'received' ? 'text-green-300' : 'text-yellow-200'}>{payment?.status || 'No payment entry'}</b></div>
          <div>Name/IG: {payment?.payerName || '-'}</div>
          <div>UTR/Ref: {payment?.utr || '-'}</div>
          <div>Amount: ₹{payment?.amount || ACCESS_CHARGE}</div>
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          <button onClick={() => updateStatus('pending')} className="h-10 rounded-xl bg-yellow-400/10 border border-yellow-400/20 text-yellow-100 text-xs font-bold">Pending</button>
          <button onClick={() => updateStatus('received')} className="h-10 rounded-xl bg-green-400/10 border border-green-400/20 text-green-200 text-xs font-bold">Received</button>
          <button onClick={() => { localStorage.removeItem(ACCESS_STORAGE_KEY); setPayment(null); onResetAccess(); }} className="h-10 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-bold">Reset</button>
        </div>
        <button onClick={onClose} className="mt-5 w-full h-10 rounded-xl bg-white/5 text-white/80 hover:bg-white/10 text-xs font-bold border border-white/10">Close</button>
      </div>
    </div>
  );
}

export default function StandaloneShell() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug || []; 
  const idFromParams = params?.id;
  const tabFromParams = params?.tab;

  // Helper to extract workflow details precisely from either route structure
  const getWorkflowInfo = useCallback(() => {
    if (idFromParams) {
        return { id: idFromParams, tab: tabFromParams || null };
    }
    const wfIndex = slug.findIndex(s => s === 'workflows' || s === 'workflow');
    if (wfIndex === -1) return { id: null, tab: null };
    return {
      id: slug[wfIndex + 1] || null,
      tab: slug[wfIndex + 2] || null
    };
  }, [slug, idFromParams, tabFromParams]);

  const { id: urlWorkflowId } = getWorkflowInfo();

  // Initialize activeTab from URL slug/params or default to 'image'
  const getInitialTab = () => {
    if (idFromParams || slug.includes('workflow')) return 'workflows';
    if (slug.includes('agents')) return 'agents';
    if (slug.includes('design-agent')) return 'design-agent';
    if (slug.includes('apps')) return 'apps';
    if (slug.includes('admin-payments')) return 'admin-payments';
    const firstSegment = slug[0];
    if (firstSegment && TABS.find(t => t.id === firstSegment)) return firstSegment;
    return 'image';
  };
  
  const [apiKey, setApiKey] = useState(null);
  const [activeTab, setActiveTab] = useState(getInitialTab());
  const [accessApproved, setAccessApproved] = useState(false);

  const [balance, setBalance] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  const [showVadooBanner, setShowVadooBanner] = useState(() => {
    if (typeof window !== 'undefined') return localStorage.getItem('aj_editz_banner_dismissed') !== '1';
    return true;
  });

  // Drag and Drop State
  const [isDragging, setIsDragging] = useState(false);
  const [droppedFiles, setDroppedFiles] = useState(null);

  // Sync tab with URL if user navigates manually or via browser back/forward
  useEffect(() => {
    const info = getWorkflowInfo();
    if (info.id) {
        setActiveTab('workflows');
    } else if (slug.includes('agents')) {
        setActiveTab('agents');
    } else if (slug.includes('design-agent')) {
        setActiveTab('design-agent');
    } else if (slug.includes('apps')) {
        setActiveTab('apps');
    } else if (slug.includes('admin-payments')) {
        setActiveTab('admin-payments');
    } else {
        const firstSegment = slug[0];
        if (firstSegment && TABS.find(t => t.id === firstSegment)) {
          setActiveTab(firstSegment);
        }
    }
  }, [slug, getWorkflowInfo]);

  const handleTabChange = (tabId) => {
    router.push(`/studio/${tabId}`);
    // setActiveTab(tabId);
  };

  // Auto-hide header when inside a specific workflow view or design agent
  useEffect(() => {
    const isEditingWorkflow = (activeTab === 'workflows' || !!idFromParams) && urlWorkflowId;
    const isDesignAgent = activeTab === 'design-agent';
    
    if (isEditingWorkflow || isDesignAgent) {
      setIsHeaderVisible(false);
    } else {
      setIsHeaderVisible(true);
    }
  }, [activeTab, urlWorkflowId, idFromParams]);

  // Global builder CSS cleanup when switching away from Workflows or Design Agent tabs
  useEffect(() => {
    const fromBuilder = sessionStorage.getItem("fromWorkflowBuilder");
    const fromDesignAgent = sessionStorage.getItem("fromDesignAgent");
    
    if ((fromBuilder && activeTab !== 'workflows') || (fromDesignAgent && activeTab !== 'design-agent')) {
      sessionStorage.removeItem("fromWorkflowBuilder");
      sessionStorage.removeItem("fromDesignAgent");
      window.location.reload();
    }
  }, [activeTab]);

  const fetchBalance = useCallback(async (key) => {
    try {
      const data = await getUserBalance(key);
      setBalance(data.balance);
    } catch (err) {
      console.error('Balance fetch failed:', err);
    }
  }, []);

  useEffect(() => {
    setHasMounted(true);
    const paid = getSavedAccessPayment();
    setAccessApproved(paid?.status === 'received');
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setApiKey(stored);
      fetchBalance(stored);
      // Sync cookie immediately on mount to establish identity for background requests
      document.cookie = `muapi_key=${stored}; path=/; max-age=31536000; SameSite=Lax`;
    }
  }, [fetchBalance]);

  const handleKeySave = useCallback((key) => {
    localStorage.setItem(STORAGE_KEY, key);
    setApiKey(key);
    fetchBalance(key);
    document.cookie = `muapi_key=${key}; path=/; max-age=31536000; SameSite=Lax`;
  }, [fetchBalance]);

  const handleKeyChange = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setApiKey(null);
    setBalance(null);
    document.cookie = "muapi_key=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }, []);

  // Inject API key into all outgoing Axios requests (prop-based approach)
  // We use an interceptor to be selective and NOT send the key to external domains like S3
  useEffect(() => {
    // Safety: Clear any global defaults that might have been set previously
    delete axios.defaults.headers.common['x-api-key'];

    if (!apiKey) return;

    const interceptorId = axios.interceptors.request.use((config) => {
      // Check if URL is local/proxied
      const isRelative = config.url.startsWith('/') || !config.url.startsWith('http');
      const isInternalProxy = config.url.includes('/api/app') || config.url.includes('/api/workflow') || config.url.includes('/api/agents') || config.url.includes('/api/api') || config.url.includes('/api/v1');

      if (isRelative || isInternalProxy) {
        config.headers['x-api-key'] = apiKey;
      }
      
      return config;
    });

    return () => {
      axios.interceptors.request.eject(interceptorId);
    };
  }, [apiKey]);

  // Poll for balance every 30 seconds if key is present
  useEffect(() => {
    if (!apiKey) return;
    const interval = setInterval(() => fetchBalance(apiKey), 30000);
    return () => clearInterval(interval);
  }, [apiKey, fetchBalance]);

  // Drag and Drop Handlers
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    // Only set to false if we're leaving the container itself, not moving between children
    if (e.currentTarget.contains(e.relatedTarget)) return;
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      setDroppedFiles(files);
    }
  }, []);

  const handleFilesHandled = useCallback(() => {
    setDroppedFiles(null);
  }, []);

  if (!hasMounted) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <div className="animate-spin text-[#f59e0b] text-3xl">◌</div>
    </div>
  );

  if (!accessApproved) {
    return <AccessPaymentGate onApproved={() => setAccessApproved(true)} />;
  }

  if (!apiKey) {
    return <ApiKeyModal onSave={handleKeySave} title="AJ Editz AI" />;
  }

  return (
    <div 
      className="h-screen bg-[#030303] flex flex-col overflow-hidden text-white relative"
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Drag Overlay */}
      {isDragging && (
        <div className="fixed inset-0 z-[100] bg-[#f59e0b]/10 backdrop-blur-md border-4 border-dashed border-[#f59e0b]/50 flex items-center justify-center pointer-events-none transition-all duration-300">
          <div className="bg-[#0a0a0a] p-8 rounded-3xl border border-white/10 shadow-2xl flex flex-col items-center gap-4 scale-110 animate-pulse">
            <div className="w-20 h-20 bg-[#f59e0b] rounded-2xl flex items-center justify-center">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
              </svg>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold text-white">Drop media into AJ Editz AI</span>
              <span className="text-sm text-white/40">Images, videos, or audio files</span>
            </div>
          </div>
        </div>
      )}

      {/* AJ Editz promo banner */}
      {showVadooBanner && (
        <div className="flex-shrink-0 w-full bg-[#b45309] flex items-center justify-center px-4 py-2 gap-3 relative z-50">
          <a
            href={ADMIN_INSTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-bold text-white hover:opacity-80 transition-opacity text-center"
          >
            AJ Editz AI access ₹10 • Instagram @{ADMIN_INSTA_ID} • Website • Editing • Photography • Videography • AI Tools ↗
          </a>
          <button
            onClick={() => {
              setShowVadooBanner(false);
              localStorage.setItem('aj_editz_banner_dismissed', '1');
            }}
            className="absolute right-3 text-white/60 hover:text-white transition-colors text-lg leading-none"
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
      )}

      {/* Header */}
      {isHeaderVisible && (
        <header className="flex-shrink-0 h-14 border-b border-white/[0.03] flex items-center justify-between px-6 bg-black/20 backdrop-blur-md z-40 gap-4">
          {/* Left: Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className="text-sm font-bold tracking-tight hidden sm:block">AJ Editz AI</span>
          </div>

          {/* Center: Navigation Container with fade edges */}
          <div className="flex-1 min-w-0 mx-4 sm:mx-6 relative overflow-hidden h-full flex items-center justify-start lg:justify-center">
            {/* Fade Left Overlay */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#030303] to-transparent pointer-events-none z-10 block lg:hidden" />
            
            <nav className="flex items-center gap-4 overflow-x-auto scrollbar-none w-full lg:w-auto h-full px-4 lg:px-0">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`relative text-[13px] font-medium transition-all duration-300 whitespace-nowrap px-1 flex-shrink-0 flex items-center h-full ${
                    activeTab === tab.id
                      ? 'text-[#f59e0b]'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{tab.label}</span>
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] rounded-full shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                  )}
                </button>
              ))}
            </nav>
            
            {/* Fade Right Overlay */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#030303] to-transparent pointer-events-none z-10 block lg:hidden" />
          </div>

          {/* Right: Actions */}
          <div className="flex-shrink-0 flex items-center gap-4">
            <div className="flex items-center gap-3 bg-white/5 px-3 py-1.5 rounded-full border border-white/5 transition-colors">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white/90">
                  ₹10
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowSettings(true)}
              title="Settings — API key, local models, preferences"
              className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/10 bg-white/5 text-[13px] font-bold text-white/80 hover:text-white hover:bg-white/10 hover:border-white/20 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              <span>Settings</span>
            </button>
          </div>
        </header>
      )}

      {/* Studio Content */}
      <div className="flex-1 min-h-0 relative overflow-hidden">
        {activeTab === 'image'   && <ImageStudio   apiKey={apiKey} droppedFiles={droppedFiles} onFilesHandled={handleFilesHandled} />}
        {activeTab === 'video'   && <VideoStudio   apiKey={apiKey} droppedFiles={droppedFiles} onFilesHandled={handleFilesHandled} />}
        {activeTab === 'clipping' && <ClippingStudio apiKey={apiKey} droppedFiles={droppedFiles} onFilesHandled={handleFilesHandled} />}
        {activeTab === 'vibe-motion' && <VibeMotionStudio apiKey={apiKey} />}
        {activeTab === 'lipsync' && <LipSyncStudio apiKey={apiKey} droppedFiles={droppedFiles} onFilesHandled={handleFilesHandled} />}
        {activeTab === 'cinema'  && <CinemaStudio  apiKey={apiKey} />}
        {activeTab === 'audio'   && <AudioStudio   apiKey={apiKey} droppedFiles={droppedFiles} onFilesHandled={handleFilesHandled} />}
        {activeTab === 'marketing' && <MarketingStudio apiKey={apiKey} droppedFiles={droppedFiles} onFilesHandled={handleFilesHandled} />}
        {activeTab === 'workflows' && <WorkflowStudio apiKey={apiKey} isHeaderVisible={isHeaderVisible} onToggleHeader={setIsHeaderVisible} />}
        {activeTab === 'agents' && <AgentStudio apiKey={apiKey} isHeaderVisible={isHeaderVisible} onToggleHeader={setIsHeaderVisible} />}
        {activeTab === 'design-agent' && <DesignAgentStudio apiKey={apiKey} isHeaderVisible={isHeaderVisible} onToggleHeader={setIsHeaderVisible} />}
        {activeTab === 'apps' && <AppsStudio apiKey={apiKey} />}
        {activeTab === 'admin-payments' && <AdminPaymentPanel onClose={() => handleTabChange('image')} onResetAccess={() => setAccessApproved(false)} />}
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in-up">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8 w-full max-w-sm shadow-2xl">
            <h2 className="text-white font-bold text-lg mb-2">AJ Editz AI Settings</h2>
            <p className="text-white/40 text-[13px] mb-8">
              Manage API key, admin ID and payment access.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="bg-white/5 border border-white/[0.03] rounded-md p-4">
                <label className="block text-xs font-bold text-white/30 mb-2">
                   Active API Key
                </label>
                <div className="text-[13px] font-mono text-white/80">
                  {apiKey.slice(0, 8)}••••••••••••••••
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleKeyChange}
                className="flex-1 h-10 rounded-md bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs font-semibold transition-all"
              >
                Change Key
              </button>
              <button
                onClick={() => setShowSettings(false)}
                className="flex-1 h-10 rounded-md bg-white/5 text-white/80 hover:bg-white/10 text-xs font-semibold transition-all border border-white/5"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
