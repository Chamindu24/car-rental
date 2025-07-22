'use client';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center px-4 w-full max-w-screen-sm">
        {/* Responsive service name with elegant fade-in animation */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white tracking-wide relative">
          <span className="relative inline-block overflow-hidden">
            <span className="block animate-textReveal">CR CAB SERVICE</span>
            <span className="absolute inset-0 bg-black animate-textMask"></span>
          </span>
        </h1>

        {/* Animation styles */}
        <style jsx global>{`
          @keyframes textReveal {
            0% { opacity: 0; transform: translateY(10px); }
            70% { opacity: 1; transform: translateY(0); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes textMask {
            0% { transform: translateX(0); }
            100% { transform: translateX(100%); }
          }
          .animate-textReveal {
            animation: textReveal 1s cubic-bezier(0.19, 1, 0.22, 1) forwards;
          }
          .animate-textMask {
            animation: textMask 1s cubic-bezier(0.19, 1, 0.22, 1) forwards;
          }
        `}</style>
      </div>
    </div>
  );
}