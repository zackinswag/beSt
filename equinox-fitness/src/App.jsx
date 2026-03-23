import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";

import './App.css';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SyncUser } from './components/SyncUser';

import { Home } from './pages/Home';
import { Training } from './pages/Training';
import { Library } from './pages/Library';
import { Contact } from './pages/Contact';

export default function App() {
  return (
    <Router>
      <SignedIn><SyncUser /></SignedIn>
      <div className="min-h-screen flex flex-col bg-[#F5F5F7]">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/training" element={
              <>
                <SignedIn><Training /></SignedIn>
                <SignedOut>
                  <div className="pt-48 text-center animate-in fade-in duration-700">
                    <h2 className="text-2xl font-bold mb-4">Acces Restricționat</h2>
                    <p className="mb-8 opacity-50 font-medium">Loghează-te pentru a vedea protocoalele Equinox.</p>
                    <SignInButton mode="modal">
                      <button className="btn-primary">Loghează-te</button>
                    </SignInButton>
                  </div>
                </SignedOut>
              </>
            } />
            <Route path="/library" element={<Library />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}