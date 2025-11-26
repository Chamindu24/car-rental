"use client";
import React from "react";
import Image from "next/image";

const WhatsappLive = () => {
  const phoneNumber = "94719278827"; // WhatsApp number without '+'
  
  return (
    <div className="fixed bottom-6 right-5 lg:bottom-16 lg:right-16 z-50">
      <a
        href={`https://wa.me/${phoneNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center group"
      >
        {/* Pulsing ring animation */}
        <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20"></div>
        
        {/* Main WhatsApp button (responsive sizes) */}
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-17 md:h-17 lg:w-18 lg:h-18 bg-green-500 rounded-full shadow-xl transform transition-all duration-300 ease-out hover:scale-110 hover:bg-green-600 hover:shadow-2xl animate-jump motion-reduce:animate-none flex items-center justify-center">
          {/* Glow effect on hover */}
          <div className="absolute inset-0 rounded-full bg-green-300 opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-md"></div>

          <div className="relative w-full h-full ">
        <Image
          src="/whatsapp.png"
          alt="Chat on WhatsApp"
          fill
          className="relative z-10 transition-transform duration-300 group-hover:rotate-12 object-contain"
        />
          </div>

          {/* Notification dot (smaller on mobile) */}
          <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-full animate-pulse border-2 border-white shadow-lg">
        <div className="absolute inset-0 bg-red-400 rounded-full animate-ping"></div>
          </div>
        </div>
        
        {/* Tooltip (hidden on small screens) */}
        <div className="sm:block absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 whitespace-nowrap pointer-events-none">
          Chat with us on WhatsApp!
          <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
        </div>
      </a>
      
      <style jsx>{`
        @keyframes jump {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-20px);
          }
          60% {
            transform: translateY(-10px);
          }
        }
        
        .animate-jump {
          animation: jump 2s ease-in-out infinite;
        }
        
        @keyframes wiggle {
          0%, 7% { transform: rotateZ(0); }
          15% { transform: rotateZ(-15deg); }
          20% { transform: rotateZ(10deg); }
          25% { transform: rotateZ(-10deg); }
          30% { transform: rotateZ(6deg); }
          35% { transform: rotateZ(-4deg); }
          40%, 100% { transform: rotateZ(0); }
        }
        
        .animate-wiggle {
          animation: wiggle 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default WhatsappLive;