import React from 'react';

export const BackgroundAmbient = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-20 overflow-hidden pointer-events-none">
      {/* Top right blue glow (Pricing style: 10% opacity) */}
      <div className="absolute top-[5%] right-[-5%] w-[60%] h-[60%] bg-blue-400/10 rounded-full blur-[120px] animate-mesh" style={{ animationDuration: '15s' }}></div>
      
      {/* Bottom left purple glow (Subtle: 5% opacity) */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-400/5 rounded-full blur-[100px] animate-mesh" style={{ animationDuration: '18s', animationDelay: '-2s' }}></div>
      
      {/* Static wash from index.css will still be underneath */}
    </div>
  );
};
