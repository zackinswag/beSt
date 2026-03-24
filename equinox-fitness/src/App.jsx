import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, RedirectToSignIn } from "@clerk/clerk-react";

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
              <>
                <SignedIn><WorkoutSession /></SignedIn>
                <SignedOut><RedirectToSignIn /></SignedOut>
              </>
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