
import React from 'react';

const BackgroundEffect = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Base gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-indigo-50/80 to-purple-50/80"></div>
      
      {/* Creative background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069')] bg-cover"></div>
      </div>
      
      {/* Geometric elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-pink-200 to-indigo-200 mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 rounded-full bg-gradient-to-r from-yellow-200 to-green-200 mix-blend-multiply filter blur-3xl opacity-40 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-72 h-72 rounded-full bg-gradient-to-r from-blue-200 to-cyan-200 mix-blend-multiply filter blur-3xl opacity-40 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
      
      {/* Interactive elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-blue-400 rounded-full opacity-70 animate-ping" style={{ animationDuration: '3s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-purple-400 rounded-full opacity-70 animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
        <div className="absolute top-2/3 left-1/3 w-2 h-2 bg-green-400 rounded-full opacity-70 animate-ping" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>
      </div>
      
      {/* Overlay with subtle grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxMTE4MjciIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptNiAwaDF2NGgtMXYtNHptLTEwLjUgMS41aC4yNXYyaC0uMjV2LTJ6bTIuMjUgMGguMjV2MmgtLjI1di0yem0tNC41IDBoLjI1djJoLS4yNXYtMnptMTAuNSAwaDMuMjV2MmgtMy4yNXYtMnptNS43NSAwaDMuMjV2MmgtMy4yNXYtMnpNMzYgMzZoMXYyaC0xdi0yem00IDBoMXYyaC0xdi0yem0tOC41LTEuNWgtLjI1di0yaC4yNXYyem0tMi4yNSAwaC0uMjV2LTJoLjI1djJ6bTQuNSAwaC0uMjV2LTJoLjI1djJ6bS0xMC41IDBoLTMuMjV2LTJoMy4yNXYyem0tNS43NSAwaC0zLjI1di0yaDMuMjV2MnpNMjggMzRoLTF2LTJoMXYyem0tNCAwSDIzdi0yaDEuMjV2MnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
      
      {/* Final overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/60"></div>
    </div>
  );
};

export default BackgroundEffect;
