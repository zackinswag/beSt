import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SignedIn } from "@clerk/clerk-react";

import './App.css';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SyncUser } from './components/SyncUser';

import { Home } from './pages/Home';
import { Training } from './pages/Training';
import { ProtocolDetail } from './pages/ProtocolDetail';

import { Contact } from './pages/Contact';
import { Pricing } from './pages/Pricing';
import { Profile } from './pages/Profile';
import { PPLProgram } from './pages/PPLProgram';

export default function App() {
  return (
    <Router>
      <SignedIn><SyncUser /></SignedIn>
      <div className="min-h-screen flex flex-col bg-zinc-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/training" element={<Training />} />
            <Route path="/training/:id" element={<ProtocolDetail />} />
            <Route path="/training/:id/:programId" element={<PPLProgram />} />

            <Route path="/contact" element={<Contact />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/profile" element={<SignedIn><Profile /></SignedIn>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}