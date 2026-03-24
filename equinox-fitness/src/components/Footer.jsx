import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Mail } from 'lucide-react';

export const Footer = () => (
  <footer className="border-t border-black/5 mt-auto bg-white/40 backdrop-blur-sm">
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Brand */}
        <div className="md:col-span-1">
          <h3 className="font-extrabold text-lg tracking-tighter mb-3">EQUINOX</h3>
          <p className="text-sm text-black/55 leading-relaxed">Creat pentru cei care refuză mediocritatea.</p>
        </div>
        
        {/* Quick Links */}
        <div>
          <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/30 mb-4">Navigare</h4>
          <div className="space-y-2.5">
            <Link to="/training" className="block text-sm text-black/50 hover:text-apple-blue transition-colors">Programe</Link>
            <Link to="/library" className="block text-sm text-black/50 hover:text-apple-blue transition-colors">Bibliotecă</Link>
            <Link to="/contact" className="block text-sm text-black/50 hover:text-apple-blue transition-colors">Contact</Link>
          </div>
        </div>
        
        {/* Protocols */}
        <div>
          <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/30 mb-4">Protocoale</h4>
          <div className="space-y-2.5">
            <p className="text-sm text-black/50">Sala de Forță</p>
            <p className="text-sm text-black/50">Măiestria Corpului</p>
            <p className="text-sm text-black/50">Motor Hibrid</p>
          </div>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/30 mb-4">Conectare</h4>
          <div className="flex gap-3">
            <a href="#" className="w-10 h-10 rounded-full bg-black/5 hover:bg-apple-blue hover:text-white flex items-center justify-center transition-all duration-300">
              <Instagram size={16} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-black/5 hover:bg-apple-blue hover:text-white flex items-center justify-center transition-all duration-300">
              <Twitter size={16} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-black/5 hover:bg-apple-blue hover:text-white flex items-center justify-center transition-all duration-300">
              <Mail size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="divider-gradient mb-6"></div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] uppercase font-semibold tracking-[0.3em] text-black/30">
          © {new Date().getFullYear()} Equinox Performance System. Creat pentru excelență.
        </p>
        <p className="text-[10px] uppercase font-semibold tracking-[0.3em] text-black/30">
          Creat cu precizie
        </p>
      </div>
    </div>
  </footer>
);
