import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed w-full z-50 px-6 py-4">
      <div className={`max-w-5xl mx-auto flex justify-between items-center backdrop-blur-2xl rounded-[32px] border px-8 py-3 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/80 border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)]' 
          : 'bg-white/60 border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.04)]'
      }`}>
        <Link to="/" className="font-extrabold text-xl tracking-tighter hover:scale-105 transition-transform">EQUINOX</Link>
        <div className="hidden md:flex gap-10 text-[12px] font-bold uppercase tracking-[0.2em] text-black/40">
          <Link to="/training" className="hover:text-apple-blue transition-colors duration-300">Programs</Link>
          <Link to="/library" className="hover:text-apple-blue transition-colors duration-300">Library</Link>
          <Link to="/contact" className="hover:text-apple-blue transition-colors duration-300">Contact</Link>
        </div>
        <div className="flex items-center gap-6">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-[12px] font-bold uppercase tracking-widest text-black/40 hover:text-black cursor-pointer transition-colors duration-300 bg-transparent border-none">Login</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="btn-primary text-[11px] px-7 py-2.5 uppercase tracking-[0.2em] font-black cursor-pointer">Join</button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" appearance={{ elements: { userButtonAvatarAvatarBox: "w-9 h-9 border border-black/5" } }} />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};
