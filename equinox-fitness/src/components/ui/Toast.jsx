import React, { useEffect } from 'react';
import { Zap } from 'lucide-react';

export const Toast = ({ message, isVisible, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="bg-black text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10">
        <Zap size={18} className="text-apple-blue animate-pulse" />
        <span className="font-black uppercase tracking-widest text-[10px]">{message}</span>
      </div>
    </div>
  );
};
