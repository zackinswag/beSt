import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { Menu, X, Sparkles } from 'lucide-react';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Închidem meniul când se schimbă pagina
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <nav className="fixed w-full z-50 px-4 md:px-6 py-4">
      <div className={`max-w-5xl mx-auto flex justify-between items-center backdrop-blur-2xl rounded-[24px] md:rounded-[32px] border px-5 md:px-8 py-3 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/80 border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)]' 
          : 'bg-white/60 border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.04)]'
      }`}>
        <Link to="/" className="font-extrabold text-xl tracking-tighter hover:scale-105 transition-transform">EQUINOX</Link>
        
        {/* DESKTOP LINKS */}
        <div className="hidden md:flex gap-10 text-[12px] font-bold uppercase tracking-[0.2em] text-black/40">
          <Link to="/training" className="hover:text-apple-blue transition-colors duration-300">Programs</Link>
          <Link to="/library" className="hover:text-apple-blue transition-colors duration-300">Library</Link>
          <Link to="/pricing" className="hover:text-apple-blue transition-colors duration-300">Pricing</Link>
          <SignedIn>
            <Link to="/profile" className="hover:text-apple-blue transition-colors duration-300">Profil</Link>
          </SignedIn>
          <Link to="/contact" className="hover:text-apple-blue transition-colors duration-300">Contact</Link>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          <div className="hidden md:flex items-center gap-6">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-[12px] font-bold uppercase tracking-widest text-black/40 hover:text-black cursor-pointer transition-colors duration-300 bg-transparent border-none">Login</button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="btn-primary text-[11px] px-7 py-2.5 uppercase tracking-[0.2em] font-black cursor-pointer">Join</button>
              </SignUpButton>
            </SignedOut>
          </div>

          <SignedIn>
            <Link to="/pricing" className="hidden md:flex items-center gap-2 bg-apple-blue/10 text-apple-blue px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-apple-blue hover:text-white transition-all duration-300">
              <Sparkles size={12} />
              Go Elite
            </Link>
            <UserButton afterSignOutUrl="/" appearance={{ elements: { userButtonAvatarAvatarBox: "w-9 h-9 border border-black/5" } }} />
          </SignedIn>

          {/* MOBILE MENU TOGGLE */}
          <button 
            className="md:hidden p-2 text-black/60 hover:text-black transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div className={`md:hidden absolute top-24 left-4 right-4 transition-all duration-500 ${
        isMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}>
        <div className="bg-white/90 backdrop-blur-3xl border border-white/50 rounded-[32px] p-8 shadow-2xl flex flex-col gap-8 text-center items-center">
          <div className="flex flex-col gap-6 text-[14px] font-black uppercase tracking-[0.3em] text-black/60 w-full">
            <Link to="/training" className="py-2 hover:text-apple-blue transition-colors border-b border-black/[0.03]">Programs</Link>
            <Link to="/library" className="py-2 hover:text-apple-blue transition-colors border-b border-black/[0.03]">Library</Link>
            <Link to="/pricing" className="py-2 hover:text-apple-blue transition-colors border-b border-black/[0.03]">Pricing</Link>
            <SignedIn>
              <Link to="/profile" className="py-2 hover:text-apple-blue transition-colors border-b border-black/[0.03]">Profil</Link>
            </SignedIn>
            <Link to="/contact" className="py-2 hover:text-apple-blue transition-colors border-b border-black/[0.03]">Contact</Link>
          </div>
          
          <SignedOut>
            <div className="flex flex-col gap-4 w-full pt-4">
              <SignInButton mode="modal">
                <button className="text-[12px] font-bold uppercase tracking-widest text-black/40 py-2">Login</button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="btn-primary w-full py-4 rounded-[18px] text-[12px] uppercase tracking-[0.2em] font-black">Join The Elite</button>
              </SignUpButton>
            </div>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};
