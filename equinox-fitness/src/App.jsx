import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, RedirectToSignIn } from "@clerk/clerk-react";
import { Zap } from 'lucide-react';

import './App.css';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SyncUser } from './components/SyncUser';

import { Home } from './pages/Home';
import { Training } from './pages/Training';
import { ProtocolDetail } from './pages/ProtocolDetail';
import { WorkoutSession } from './pages/WorkoutSession';
import { Library } from './pages/Library';
import { Contact } from './pages/Contact';
import { Pricing } from './pages/Pricing';

export default function App() {
  return (
    <Router>
      <SignedIn><SyncUser /></SignedIn>
      <div className="min-h-screen flex flex-col bg-[#F5F5F7]">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/training" element={<Training />} />
            <Route path="/training/:id" element={<ProtocolDetail />} />
            <Route path="/training/:id/:programId" element={
              <div className="pt-44 text-center">
                <div className="inline-flex items-center gap-2 bg-black/5 px-4 py-2 rounded-full mb-6">
                  <Zap size={14} className="text-apple-blue" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-black/40">Coming Soon</span>
                </div>
                <h2 className="text-3xl font-black tracking-tighter mb-4">Modulul de antrenament este în lucru</h2>
                <p className="text-black/40 font-medium max-w-sm mx-auto mb-8">Revenim curând cu lista completă de exerciții și tracker-ul de progres.</p>
                <button onClick={() => window.history.back()} className="btn-primary">Înapoi</button>
              </div>
            } />
            <Route path="/library" element={<Library />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}