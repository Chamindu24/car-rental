'use client';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center">
        {/* Animated Taxi with Road */}
        <div className="relative mb-8 w-72 h-24 mx-auto overflow-hidden">
          {/* Night Sky */}
          <div className="absolute inset-0 bg-gradient-to-b from-black to-black opacity-70"></div>
          
          {/* Stars */}
          <div className="absolute top-5 left-24 w-1 h-1 bg-white rounded-full animate-twinkle" style={{ animationDelay: '0.5s' }}></div>
          
          {/* Road */}
          <div className="absolute bottom-0 w-full h-3 bg-gray-700"></div>
          <div className="absolute bottom-1 w-full h-1 bg-yellow-400 animate-roadLine"></div>
          
          {/* Moving Taxi with headlights */}
          <div className="absolute bottom-3 left-0 animate-drive">
            <div className="relative">
              {/* Taxi body */}
              <div className="w-16 h-8 bg-yellow-400 rounded-md">
                {/* Windows */}
                <div className="absolute top-1 left-1 w-5 h-2 bg-gray-900 rounded-sm"></div>
                <div className="absolute top-1 right-1 w-5 h-2 bg-gray-900 rounded-sm"></div>
                {/* Taxi sign */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-red-500 rounded-sm"></div>
              </div>
              {/* Wheels */}
              <div className="absolute -bottom-1 left-1 w-3 h-3 bg-black rounded-full"></div>
              <div className="absolute -bottom-1 right-1 w-3 h-3 bg-black rounded-full"></div>
              {/* Headlights */}
              <div className="absolute top-2 -right-1 w-4 h-1 bg-yellow-100 rounded-r-full animate-pulse"></div>
            </div>
          </div>
          
          {/* Buildings */}
          <div className="absolute bottom-3 left-2 w-4 h-6 bg-gray-900"></div>
          <div className="absolute bottom-3 right-4 w-5 h-8 bg-gray-900"></div>
        </div>

        {/* Service Name with glow effect */}
        <div className="mb-6 overflow-hidden">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 tracking-wider ">
            CR CAB SERVICE
          </h1>
        </div>

        {/* Enhanced loading indicator with ETA */}
        <div className="flex flex-col items-center">
          <div className="w-56 h-2 bg-gray-800 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-yellow-400 rounded-full animate-loadingBar"></div>
          </div>
          <p className="text-xs text-gray-400 animate-pulse">DISPATCHING YOUR RIDE...</p>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes drive {
          0% { transform: translateX(-100px); }
          100% { transform: translateX(400px); }
        }
        @keyframes roadLine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 5px #f59e0b, 0 0 10px #f59e0b; }
          50% { text-shadow: 0 0 15px #f59e0b, 0 0 20px #f59e0b; }
        }
        @keyframes loadingBar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        .animate-drive {
          animation: drive 1s linear infinite;
        }
        .animate-roadLine {
          animation: roadLine 1s linear infinite;
        }
        .animate-glow {
          animation: glow 1s ease-in-out infinite;
        }
        .animate-loadingBar {
          animation: loadingBar 1s ease-in-out infinite;
        }
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}