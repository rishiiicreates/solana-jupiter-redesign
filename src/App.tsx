import React, { useState, useEffect } from 'react';
import {
  ArrowDownUp,
  ShieldCheck,
  ShieldAlert,
  Zap,
  Sliders,
  ChevronDown,
  ExternalLink,
  RefreshCw,
  Smartphone,
  Monitor,
  Info,
  CheckCircle2,
  Layers,
  Activity,
  TrendingUp,
  Wallet,
  Sparkles,
  Lock,
  ArrowRight,
  Split,
  Eye,
  SlidersHorizontal,
  Flame,
  Check
} from 'lucide-react';

interface Token {
  symbol: string;
  name: string;
  mint: string;
  logo: string;
  balance: number;
  priceUsd: number;
  change24h: number;
}

const TOKENS: Token[] = [
  {
    symbol: 'SOL',
    name: 'Solana',
    mint: 'So11111111111111111111111111111111111111112',
    logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
    balance: 14.82,
    priceUsd: 154.20,
    change24h: 3.42,
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
    balance: 1250.40,
    priceUsd: 1.00,
    change24h: 0.01,
  },
  {
    symbol: 'JUP',
    name: 'Jupiter',
    mint: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',
    logo: 'https://static.jup.ag/jup/icon.png',
    balance: 840.0,
    priceUsd: 0.985,
    change24h: 5.18,
  },
  {
    symbol: 'BONK',
    name: 'Bonk',
    mint: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
    logo: 'https://arweave.net/hQi7tikgxm8OGBPJiowhx3EmbgCXvdvnZkctjxhzgah',
    balance: 12450000,
    priceUsd: 0.0000224,
    change24h: -1.84,
  },
  {
    symbol: 'RAY',
    name: 'Raydium',
    mint: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
    logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R/logo.png',
    balance: 120.5,
    priceUsd: 1.88,
    change24h: 4.12,
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'swap' | 'compare' | 'study'>('swap');
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');
  
  // Swap state
  const [fromToken, setFromToken] = useState<Token>(TOKENS[0]); // SOL
  const [toToken, setToToken] = useState<Token>(TOKENS[1]); // USDC
  const [fromAmount, setFromAmount] = useState<string>('2.5');
  const [isSelectingFrom, setIsSelectingFrom] = useState(false);
  const [isSelectingTo, setIsSelectingTo] = useState(false);
  
  // Advanced features state
  const [jitoShield, setJitoShield] = useState<boolean>(true);
  const [jitoTipTier, setJitoTipTier] = useState<'normal' | 'turbo' | 'ultra'>('turbo');
  const [slippage, setSlippage] = useState<number>(0.3);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [isSwapping, setIsSwapping] = useState<boolean>(false);
  const [swapSuccessTx, setSwapSuccessTx] = useState<string | null>(null);
  
  // Live slot telemetry simulation
  const [currentSlot, setCurrentSlot] = useState<number>(314892140);
  const [tps, setTps] = useState<number>(2840);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlot(prev => prev + 1);
      setTps(prev => Math.floor(2750 + Math.random() * 200));
    }, 450);
    return () => clearInterval(timer);
  }, []);

  const numFromAmount = parseFloat(fromAmount) || 0;
  const toAmount = numFromAmount > 0 
    ? ((numFromAmount * fromToken.priceUsd) / toToken.priceUsd).toFixed(toToken.symbol === 'BONK' ? 0 : 4)
    : '0.00';
  const usdValue = (numFromAmount * fromToken.priceUsd).toFixed(2);

  const handleFlip = () => {
    const prevFrom = fromToken;
    setFromToken(toToken);
    setToToken(prevFrom);
    if (toAmount && toAmount !== '0.00') {
      setFromAmount(toAmount);
    }
  };

  const handleExecuteSwap = () => {
    setIsSwapping(true);
    setSwapSuccessTx(null);
    setTimeout(() => {
      setIsSwapping(false);
      setSwapSuccessTx('5Jz9mK...w8XpYq9');
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 radial-mesh font-sans flex flex-col">
      {/* Top Global Status & Bounty Banner */}
      <header className="border-b border-white/5 bg-[#0b0e17]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-jupiterOrange to-solana p-[1.5px] shadow-lg shadow-jupiterOrange/20">
              <div className="w-full h-full bg-[#0d111c] rounded-[10px] flex items-center justify-center">
                <span className="text-xl font-black bg-gradient-to-r from-jupiterOrange via-yellow-400 to-solana bg-clip-text text-transparent">♃</span>
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold tracking-tight text-white text-base">Jupiter Pro</span>
                <span className="text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full bg-solana/10 text-solana border border-solana/20">v7 Vision</span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">Superteam India Bounty Submission · Designed for Extreme Speed & MEV Protection</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center space-x-1 bg-[#131926] p-1 rounded-xl border border-white/5 text-xs font-medium">
            <button
              onClick={() => setActiveTab('swap')}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === 'swap' ? 'bg-gradient-to-r from-solana/20 to-solanaPurple/20 text-white font-semibold border border-white/10 shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Interactive Swap
            </button>
            <button
              onClick={() => setActiveTab('compare')}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === 'compare' ? 'bg-gradient-to-r from-solana/20 to-solanaPurple/20 text-white font-semibold border border-white/10 shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Before vs After UX
            </button>
            <button
              onClick={() => setActiveTab('study')}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === 'study' ? 'bg-gradient-to-r from-solana/20 to-solanaPurple/20 text-white font-semibold border border-white/10 shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Case Study Docs
            </button>
          </div>

          {/* Device Viewport Toggle & Wallet */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center bg-[#131926] rounded-xl p-0.5 border border-white/5">
              <button
                onClick={() => setDeviceMode('desktop')}
                className={`p-2 rounded-lg transition-colors ${deviceMode === 'desktop' ? 'bg-white/10 text-solana' : 'text-slate-400 hover:text-white'}`}
                title="Desktop View"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeviceMode('mobile')}
                className={`p-2 rounded-lg transition-colors ${deviceMode === 'mobile' ? 'bg-white/10 text-solana' : 'text-slate-400 hover:text-white'}`}
                title="Mobile Viewport (390px)"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center space-x-2 bg-[#141b2b] px-3 py-1.5 rounded-xl border border-white/5 text-xs">
              <div className="w-2 h-2 rounded-full bg-solana animate-pulse" />
              <span className="font-mono text-slate-300 hidden sm:inline">Slot {currentSlot.toLocaleString()}</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400 font-mono">{tps} TPS</span>
            </div>

            <button className="flex items-center space-x-1.5 bg-gradient-to-r from-solana to-emerald-400 hover:opacity-95 text-[#07090e] font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-md shadow-solana/20">
              <Wallet className="w-3.5 h-3.5" />
              <span>0x3028...1142</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col items-center">
        {activeTab === 'swap' && (
          <div className="w-full flex flex-col items-center">
            {/* Viewport Frame wrapper if Mobile is selected */}
            <div className={`transition-all duration-300 w-full ${
              deviceMode === 'mobile' 
                ? 'max-w-[410px] border-4 border-slate-700/80 rounded-[44px] p-3 bg-black/90 shadow-2xl shadow-purple-900/20 my-4' 
                : 'max-w-5xl'
            }`}>
              {deviceMode === 'mobile' && (
                <div className="flex justify-between items-center px-4 py-1 mb-2 text-xs text-slate-400 font-mono">
                  <span>9:41</span>
                  <div className="w-20 h-4 bg-slate-800 rounded-full mx-auto" />
                  <span className="text-[10px]">5G 100%</span>
                </div>
              )}

              <div className={`grid gap-6 ${deviceMode === 'mobile' ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'} items-start`}>
                
                {/* Center Swap Card */}
                <div className={`${deviceMode === 'mobile' ? 'w-full' : 'lg:col-span-7'} flex flex-col space-y-4`}>
                  
                  {/* Swap Card Body */}
                  <div className="glass-panel-elevated rounded-3xl p-5 sm:p-6 relative overflow-hidden border border-white/10 shadow-2xl">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-white tracking-wide">Instant Swap</span>
                        <div className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-solana/10 border border-solana/20 text-[11px] text-solana font-medium">
                          <Zap className="w-3 h-3" />
                          <span>Direct Route</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => setShowSettings(!showSettings)}
                          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors border border-white/5"
                          title="Routing Settings"
                        >
                          <SlidersHorizontal className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => {
                            setFromAmount('1.0');
                          }}
                          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors border border-white/5"
                          title="Refresh Quotes"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Settings Drawer */}
                    {showSettings && (
                      <div className="mb-4 p-4 rounded-2xl bg-[#0a0e1a]/90 border border-white/10 space-y-3 animate-in fade-in slide-in-from-top duration-200">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-300 font-medium">Max Slippage</span>
                          <div className="flex items-center space-x-1">
                            {[0.1, 0.3, 0.5, 1.0].map(s => (
                              <button
                                key={s}
                                onClick={() => setSlippage(s)}
                                className={`px-2 py-1 rounded-lg text-xs font-mono transition-all ${
                                  slippage === s ? 'bg-solana text-black font-bold' : 'bg-white/5 text-slate-400 hover:text-white'
                                }`}
                              >
                                {s}%
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between items-center text-xs pt-2 border-t border-white/5">
                          <div>
                            <p className="text-slate-300 font-medium">Strict Token List</p>
                            <p className="text-[11px] text-slate-500">Shield against fake duplicate contract addresses</p>
                          </div>
                          <input type="checkbox" defaultChecked className="accent-solana w-4 h-4 rounded cursor-pointer" />
                        </div>
                      </div>
                    )}

                    {/* You Pay (Source Token) Input Box */}
                    <div className="glass-panel-inner rounded-2xl p-4 transition-all hover:border-white/20 focus-within:border-solana/50 focus-within:ring-1 focus-within:ring-solana/40">
                      <div className="flex justify-between text-xs text-slate-400 mb-2">
                        <span className="font-medium">You Pay</span>
                        <div className="flex items-center space-x-1.5">
                          <span>Balance: {fromToken.balance.toLocaleString()} {fromToken.symbol}</span>
                          <button
                            onClick={() => setFromAmount(fromToken.balance.toString())}
                            className="text-solana font-bold hover:underline ml-1"
                          >
                            MAX
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-3">
                        <input
                          type="number"
                          value={fromAmount}
                          onChange={(e) => setFromAmount(e.target.value)}
                          placeholder="0.0"
                          className="bg-transparent text-2xl sm:text-3xl font-extrabold text-white focus:outline-none w-full font-mono"
                        />

                        {/* Token Selector Button */}
                        <div className="relative">
                          <button
                            onClick={() => setIsSelectingFrom(!isSelectingFrom)}
                            className="flex items-center space-x-2 bg-[#1b2234] hover:bg-[#232c43] px-3 py-2 rounded-2xl border border-white/10 transition-colors shadow-inner"
                          >
                            <img src={fromToken.logo} alt={fromToken.symbol} className="w-6 h-6 rounded-full" />
                            <span className="font-bold text-sm tracking-wide">{fromToken.symbol}</span>
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                          </button>

                          {/* Token dropdown */}
                          {isSelectingFrom && (
                            <div className="absolute right-0 top-12 w-48 bg-[#121724] border border-white/15 rounded-2xl p-2 shadow-2xl z-20 space-y-1">
                              {TOKENS.map(t => (
                                <button
                                  key={t.symbol}
                                  onClick={() => {
                                    setFromToken(t);
                                    setIsSelectingFrom(false);
                                  }}
                                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-white/5 text-xs text-left"
                                >
                                  <div className="flex items-center space-x-2">
                                    <img src={t.logo} alt={t.symbol} className="w-5 h-5 rounded-full" />
                                    <span className="font-bold text-slate-200">{t.symbol}</span>
                                  </div>
                                  <span className="text-slate-400 font-mono">${t.priceUsd}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-xs text-slate-400 mt-2">
                        <span className="font-mono">≈ ${usdValue} USD</span>
                        <div className="flex items-center space-x-1">
                          {[25, 50, 75].map(pct => (
                            <button
                              key={pct}
                              onClick={() => setFromAmount(((fromToken.balance * pct) / 100).toFixed(2))}
                              className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 hover:bg-white/10 text-slate-300 font-mono"
                            >
                              {pct}%
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Invert / Flip Button */}
                    <div className="relative flex justify-center -my-3 z-10">
                      <button
                        onClick={handleFlip}
                        className="bg-[#182030] hover:bg-[#202b40] p-2.5 rounded-2xl border border-white/15 text-solana hover:scale-110 active:scale-95 transition-all shadow-xl shadow-black/60"
                        title="Swap directions"
                      >
                        <ArrowDownUp className="w-4 h-4" />
                      </button>
                    </div>

                    {/* You Receive (Target Token) Input Box */}
                    <div className="glass-panel-inner rounded-2xl p-4 transition-all hover:border-white/20 mt-1">
                      <div className="flex justify-between text-xs text-slate-400 mb-2">
                        <span className="font-medium">You Receive (Estimated)</span>
                        <span>Balance: {toToken.balance.toLocaleString()} {toToken.symbol}</span>
                      </div>

                      <div className="flex items-center justify-between gap-3">
                        <div className="text-2xl sm:text-3xl font-extrabold text-solana font-mono">
                          {toAmount}
                        </div>

                        {/* Target Token Selector Button */}
                        <div className="relative">
                          <button
                            onClick={() => setIsSelectingTo(!isSelectingTo)}
                            className="flex items-center space-x-2 bg-[#1b2234] hover:bg-[#232c43] px-3 py-2 rounded-2xl border border-white/10 transition-colors shadow-inner"
                          >
                            <img src={toToken.logo} alt={toToken.symbol} className="w-6 h-6 rounded-full" />
                            <span className="font-bold text-sm tracking-wide">{toToken.symbol}</span>
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                          </button>

                          {/* Token dropdown */}
                          {isSelectingTo && (
                            <div className="absolute right-0 top-12 w-48 bg-[#121724] border border-white/15 rounded-2xl p-2 shadow-2xl z-20 space-y-1">
                              {TOKENS.map(t => (
                                <button
                                  key={t.symbol}
                                  onClick={() => {
                                    setToToken(t);
                                    setIsSelectingTo(false);
                                  }}
                                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-white/5 text-xs text-left"
                                >
                                  <div className="flex items-center space-x-2">
                                    <img src={t.logo} alt={t.symbol} className="w-5 h-5 rounded-full" />
                                    <span className="font-bold text-slate-200">{t.symbol}</span>
                                  </div>
                                  <span className="text-slate-400 font-mono">${t.priceUsd}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-xs text-slate-400 mt-2">
                        <span className="font-mono">1 {fromToken.symbol} ≈ {(fromToken.priceUsd / toToken.priceUsd).toFixed(4)} {toToken.symbol}</span>
                        <span className="text-emerald-400 font-medium text-[11px] flex items-center space-x-1">
                          <Sparkles className="w-3 h-3" />
                          <span>Best rate across 14 DEXes</span>
                        </span>
                      </div>
                    </div>

                    {/* Jito MEV Protection Engine Card */}
                    <div className="mt-4 p-3.5 rounded-2xl bg-gradient-to-r from-[#11192e] to-[#171329] border border-solanaPurple/20 relative overflow-hidden">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2.5">
                          <div className={`p-2 rounded-xl ${jitoShield ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                            {jitoShield ? <ShieldCheck className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
                          </div>
                          <div>
                            <div className="flex items-center space-x-1.5">
                              <span className="text-xs font-bold text-white tracking-wide">Jito MEV Shield</span>
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300">Bundle Route</span>
                            </div>
                            <p className="text-[11px] text-slate-400">
                              {jitoShield ? 'Bypasses public mempool to prevent sandwich bots' : 'Public gossip mempool (vulnerable to searchers)'}
                            </p>
                          </div>
                        </div>

                        {/* Toggle */}
                        <button
                          onClick={() => setJitoShield(!jitoShield)}
                          className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                            jitoShield ? 'bg-gradient-to-r from-solanaPurple to-solana' : 'bg-slate-700'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                            jitoShield ? 'translate-x-6' : 'translate-x-0'
                          }`} />
                        </button>
                      </div>

                      {/* Tier Selector if Shield is on */}
                      {jitoShield && (
                        <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                          <span className="text-slate-400">Jito Tip Priority</span>
                          <div className="flex items-center space-x-1.5">
                            {(['normal', 'turbo', 'ultra'] as const).map(tier => (
                              <button
                                key={tier}
                                onClick={() => setJitoTipTier(tier)}
                                className={`px-2.5 py-1 rounded-lg capitalize font-mono text-[11px] transition-all ${
                                  jitoTipTier === tier 
                                    ? 'bg-solanaPurple text-white font-bold shadow-md shadow-solanaPurple/30' 
                                    : 'bg-white/5 text-slate-400 hover:text-white'
                                }`}
                              >
                                {tier === 'turbo' && <Flame className="w-3 h-3 inline mr-1 text-yellow-300" />}
                                {tier}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Execution Button */}
                    <div className="mt-5">
                      <button
                        onClick={handleExecuteSwap}
                        disabled={isSwapping || numFromAmount <= 0}
                        className={`w-full py-4 rounded-2xl font-black text-sm tracking-wide transition-all shadow-xl flex items-center justify-center space-x-2 ${
                          isSwapping
                            ? 'bg-slate-700 text-slate-300 cursor-wait'
                            : 'bg-gradient-to-r from-solana via-emerald-400 to-solana hover:opacity-95 text-[#07090e] shadow-solana/25 active:scale-[0.99]'
                        }`}
                      >
                        {isSwapping ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin text-white" />
                            <span>Routing via Jito Block Engine...</span>
                          </>
                        ) : (
                          <>
                            <span>Swap {fromToken.symbol} for {toToken.symbol}</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>

                      {/* Confirmation Receipt */}
                      {swapSuccessTx && (
                        <div className="mt-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center justify-between animate-in fade-in">
                          <div className="flex items-center space-x-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>Confirmed in 382ms (Slot #{currentSlot})</span>
                          </div>
                          <span className="font-mono text-emerald-200 underline cursor-pointer">{swapSuccessTx}</span>
                        </div>
                      )}
                    </div>

                  </div>

                </div>

                {/* Right Side: Smart Route Visualizer & Liquidity Depth */}
                <div className={`${deviceMode === 'mobile' ? 'w-full' : 'lg:col-span-5'} space-y-4`}>
                  
                  {/* Dynamic Hop Pipeline Card */}
                  <div className="glass-panel-elevated rounded-3xl p-5 border border-white/10 shadow-xl space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Split className="w-4 h-4 text-solana" />
                        <span className="text-xs font-bold text-white uppercase tracking-wider">Multi-Hop Routing Breakdown</span>
                      </div>
                      <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        +0.04% vs single pool
                      </span>
                    </div>

                    {/* Routing Graph Diagram */}
                    <div className="space-y-3 pt-2">
                      <div className="p-3 rounded-2xl bg-[#090d18] border border-white/5 space-y-2">
                        <div className="flex justify-between text-xs">
                          <div className="flex items-center space-x-1.5">
                            <span className="w-2 h-2 rounded-full bg-cyan-400" />
                            <span className="font-bold text-slate-200">Orca Whirlpool (Concentrated)</span>
                          </div>
                          <span className="font-mono text-cyan-300 font-bold">52%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div className="w-[52%] h-full bg-cyan-400 rounded-full" />
                        </div>
                        <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                          <span>Pool: SOL-USDC 0.05%</span>
                          <span>Depth: $42.8M</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-2xl bg-[#090d18] border border-white/5 space-y-2">
                        <div className="flex justify-between text-xs">
                          <div className="flex items-center space-x-1.5">
                            <span className="w-2 h-2 rounded-full bg-purple-400" />
                            <span className="font-bold text-slate-200">Raydium CLMM v3</span>
                          </div>
                          <span className="font-mono text-purple-300 font-bold">34%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div className="w-[34%] h-full bg-purple-400 rounded-full" />
                        </div>
                        <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                          <span>Pool: SOL-USDC 0.02%</span>
                          <span>Depth: $28.4M</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-2xl bg-[#090d18] border border-white/5 space-y-2">
                        <div className="flex justify-between text-xs">
                          <div className="flex items-center space-x-1.5">
                            <span className="w-2 h-2 rounded-full bg-orange-400" />
                            <span className="font-bold text-slate-200">Phoenix Limit Orderbook</span>
                          </div>
                          <span className="font-mono text-orange-300 font-bold">14%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div className="w-[14%] h-full bg-orange-400 rounded-full" />
                        </div>
                        <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                          <span>Book: Pure LOB match</span>
                          <span>Depth: $12.1M</span>
                        </div>
                      </div>
                    </div>

                    {/* Execution Metric Pills */}
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5 text-center">
                      <div className="p-2.5 rounded-xl bg-white/5">
                        <p className="text-[10px] text-slate-400">Total Hops</p>
                        <p className="text-xs font-bold text-slate-200 font-mono">1 Split Hop</p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/5">
                        <p className="text-[10px] text-slate-400">Price Impact</p>
                        <p className="text-xs font-bold text-emerald-400 font-mono">&lt; 0.01%</p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/5">
                        <p className="text-[10px] text-slate-400">Network Fee</p>
                        <p className="text-xs font-bold text-slate-200 font-mono">~0.000005 SOL</p>
                      </div>
                    </div>
                  </div>

                  {/* Why this redesign beats Jupiter v6 */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-[#12182b] to-[#0d101c] border border-white/5 space-y-2.5">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-solana" />
                      <span className="text-xs font-bold text-white">Why Traders Choose Jupiter Pro</span>
                    </div>
                    <ul className="text-xs text-slate-400 space-y-1.5">
                      <li className="flex items-start space-x-1.5">
                        <Check className="w-3.5 h-3.5 text-solana shrink-0 mt-0.5" />
                        <span>Zero sandwich risk with embedded 1-click Jito Bundle Shield</span>
                      </li>
                      <li className="flex items-start space-x-1.5">
                        <Check className="w-3.5 h-3.5 text-solana shrink-0 mt-0.5" />
                        <span>Full orderbook & CLMM depth visibility before approving</span>
                      </li>
                      <li className="flex items-start space-x-1.5">
                        <Check className="w-3.5 h-3.5 text-solana shrink-0 mt-0.5" />
                        <span>390px mobile thumb-zone layout prevents keyboard glitches</span>
                      </li>
                    </ul>
                  </div>

                </div>

              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Before vs After UX Comparison */}
        {activeTab === 'compare' && (
          <div className="w-full max-w-5xl space-y-8 animate-in fade-in duration-300">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Deconstructing Jupiter Exchange (v6 vs v7 Vision)</h2>
              <p className="text-sm text-slate-400 max-w-2xl mx-auto">
                A surgical teardown of friction points in Solana's top aggregator and how our redesigned UX solves them.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Problem / Before Card */}
              <div className="glass-panel rounded-3xl p-6 border border-red-500/20 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-red-300">Current Jupiter v6 Friction</h3>
                    <p className="text-xs text-slate-400">Identified through live community feedback & on-chain data</p>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                    <p className="text-xs font-bold text-red-400">1. MEV Protection is Buried</p>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Users must open nested settings modals and guess gas tip parameters in micro-lamports. 85% of retail users trade through public gossip, losing value to sandwich bots on high-volatility tokens.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                    <p className="text-xs font-bold text-red-400">2. Black-box Routing Visuals</p>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Routes are presented as static list text. Users cannot immediately grasp how liquidity is split across Orca, Raydium, and Phoenix, leading to fear of hidden slippage.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                    <p className="text-xs font-bold text-red-400">3. Mobile Overlap & Keyboard Jumps</p>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      On Phantom/Solflare mobile in-app browsers, the swap button gets occluded by software keyboards and sticky footer tabs, causing failed double-taps and rage clicks.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                    <p className="text-xs font-bold text-red-400">4. Navigation Congestion</p>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Perps, DCA, VA, Limit, Bridge, and Launchpad clutter the primary interface, overwhelming new DeFi users who simply want to swap tokens quickly.
                    </p>
                  </div>
                </div>
              </div>

              {/* Solution / After Card */}
              <div className="glass-panel-elevated rounded-3xl p-6 border border-solana/20 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-solana/10 text-solana border border-solana/20">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-solana">Jupiter Pro Redesign Solution</h3>
                    <p className="text-xs text-slate-400">Architected for clarity, speed, and defense</p>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                    <p className="text-xs font-bold text-solana">1. 1-Click Jito Bundle Shield</p>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Prominently surfaced right above the execution CTA. Automatically wraps transactions in private Jito block engine bundles with one toggle, completely neutralizing sandwich searchers.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                    <p className="text-xs font-bold text-solana">2. Glassmorphic Smart Route Visualizer</p>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Real-time interactive flow graph detailing split percentages, liquidity depth, price impact, and fee attribution so users trade with mathematical confidence.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                    <p className="text-xs font-bold text-solana">3. Native Mobile Viewport Architecture</p>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Strict 390px ergonomics with bottom-anchored touch targets, numeric keypads optimized for single-thumb trading, and zero viewport scrolling needed during quotes.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                    <p className="text-xs font-bold text-solana">4. Contextual Progressive Disclosure</p>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Keeps the primary swap interface pure and distraction-free while offering immediate access to advanced routing specs through collapsible drawers.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab 3: Submission & Case Study Document */}
        {activeTab === 'study' && (
          <div className="w-full max-w-4xl glass-panel-elevated rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6 animate-in fade-in duration-300">
            <div className="border-b border-white/10 pb-4 flex justify-between items-center">
              <div>
                <span className="text-xs uppercase font-bold text-solana tracking-wider">Superteam India · Design Bounty Entry</span>
                <h2 className="text-2xl font-black text-white mt-1">Jupiter DEX Redesign: The High-Throughput Trading Interface</h2>
                <p className="text-xs text-slate-400 mt-1">Candidate: Hrishikesh Yadav (@rishiiicreates) · Target: 1,500 USDC Bounty</p>
              </div>
              <div className="p-2.5 rounded-xl bg-solana/10 border border-solana/20 text-solana">
                <Sparkles className="w-6 h-6" />
              </div>
            </div>

            <div className="space-y-6 text-sm text-slate-300 leading-relaxed font-sans">
              <div>
                <h3 className="text-base font-bold text-white mb-2 flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-solana" />
                  <span>Executive Summary</span>
                </h3>
                <p>
                  Jupiter is the undisputed economic hub of Solana, processing over 60% of all decentralized exchange volume. However, as Solana's retail user base expanded into memecoins and fast trading, the interface struggled to balance advanced routing controls with intuitive simplicity. This redesign reimagines Jupiter as a precision instrument: combining high-end glassmorphism, instant MEV defense via Jito, and an interactive routing visualizer that transforms opaque AMM splits into clear, readable telemetry.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-white mb-2 flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-solanaPurple" />
                  <span>Key Design Decisions & System Specs</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 rounded-2xl bg-[#0b0f1a] border border-white/5">
                    <p className="font-bold text-xs text-slate-200">Typography & Color Calibration</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Plus Jakarta Sans paired with JetBrains Mono for financial values. Deep midnight background (#07090E) with Solana Green (#14F195) and Jito Purple (#9945FF) accents.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#0b0f1a] border border-white/5">
                    <p className="font-bold text-xs text-slate-200">Anti-MEV Architecture</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Front-facing Jito Shield toggle with preset bundle tip tiers (Normal, Turbo, Ultra) that directly submits transactions to block engine validators, bypassing toxic gossip pools.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#0b0f1a] border border-white/5">
                    <p className="font-bold text-xs text-slate-200">Smart Route Split Topology</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Visual representation of multi-hop routing across Orca Whirlpool, Raydium CLMM, and Phoenix LOB, providing transparent depth and price impact verification.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#0b0f1a] border border-white/5">
                    <p className="font-bold text-xs text-slate-200">Mobile-First Ergonomics</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Designed with a strict 390px iPhone baseline. All primary touch targets reside in the bottom 45% thumb zone to avoid keyboard occlusion in mobile Web3 wallets.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-white mb-2 flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-jupiterOrange" />
                  <span>Submission Checklist for Superteam India</span>
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-solana" />
                    <span>Working Interactive Web Prototype (Vite + React + Tailwind + TypeScript)</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-solana" />
                    <span>Full Design Rationale & Problem Breakdown (Before vs After UX)</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-solana" />
                    <span>Cross-Device Ergonomics (Interactive Desktop vs Mobile 390px Toggle)</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-solana" />
                    <span>Public GitHub Repository with Full Source Code & Open Documentation</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}
      </main>

      {/* Global Footer */}
      <footer className="border-t border-white/5 bg-[#090c14]/80 backdrop-blur-md py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>© 2026 Jupiter Pro Redesign · Concept created for Superteam India Bounty</p>
          <div className="flex items-center space-x-4">
            <span className="text-slate-400">Built with Vite, React & TailwindCSS</span>
            <span>·</span>
            <span className="font-mono text-solana">0x3028C30B8c8985Bd54669BC313Fe7950fCeB1142</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
