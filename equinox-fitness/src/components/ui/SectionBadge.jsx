import React from 'react';

export const SectionBadge = ({ icon: Icon, text, className = '' }) => {
  return (
    <div
      className={`inline-flex items-center gap-2.5 bg-black/[0.03] border border-black/[0.05] px-5 py-2 rounded-full ${className}`}
    >
      <Icon size={12} className="text-apple-blue" />
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40">
        {text}
      </span>
    </div>
  );
};
