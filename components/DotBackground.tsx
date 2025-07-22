import { cn } from "@/lib/utils";
import React from "react";

export function GridBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full bg-white dark:bg-black">
      {/* Grid background */}
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,gray_1px,transparent_1px),linear-gradient(to_bottom,gray_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_5px,transparent_5px),linear-gradient(to_bottom,#262626_5px,transparent_5px)]",
        )}
      />
      {/* Radial gradient mask for faded effect */}
      <div className="pointer-events-none absolute inset-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}