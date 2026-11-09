import React from 'react';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

interface IPhone13ProFrameProps {
  children: React.ReactNode;
  showFrame?: boolean;
}

export const IPhone13ProFrame: React.FC<IPhone13ProFrameProps> = ({
  children,
  showFrame = true,
}) => {
  if (!showFrame) {
    return (
      <div className="w-[375px] sm:w-[390px] h-[812px] sm:h-[844px] bg-white border-2 border-black flex flex-col overflow-hidden relative shadow-2xl">
        {children}
      </div>
    );
  }

  return (
    <div className="relative mx-auto my-4 select-none">
      {/* Outer Chassis (iPhone 13 Pro Stainless Steel Rim) */}
      <div className="relative w-[375px] sm:w-[392px] h-[810px] sm:h-[846px] bg-zinc-950 rounded-[50px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5),0_0_0_2px_#27272a,0_0_0_4px_#09090b] border-4 border-zinc-700 flex flex-col justify-between">
        
        {/* Left Physical Buttons (Mute switch + Volume buttons) */}
        <div className="absolute -left-[7px] top-[100px] w-[3px] h-[26px] bg-zinc-600 rounded-l-sm" />
        <div className="absolute -left-[7px] top-[145px] w-[3px] h-[45px] bg-zinc-600 rounded-l-sm" />
        <div className="absolute -left-[7px] top-[202px] w-[3px] h-[45px] bg-zinc-600 rounded-l-sm" />

        {/* Right Physical Button (Power / Side Button) */}
        <div className="absolute -right-[7px] top-[165px] w-[3px] h-[65px] bg-zinc-600 rounded-r-sm" />

        {/* Inner Screen Display (390 x 844 pt) */}
        <div className="relative w-full h-full bg-white rounded-[38px] overflow-hidden flex flex-col border border-zinc-300">
          
          {/* iPhone 13 Pro Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[160px] h-[28px] bg-black rounded-b-[18px] z-50 flex items-center justify-center pointer-events-none">
            {/* Speaker grill */}
            <div className="w-12 h-1 bg-zinc-800 rounded-full mb-1.5" />
            {/* Front Camera / FaceID sensors */}
            <div className="absolute right-7 top-2 w-2.5 h-2.5 bg-zinc-900 rounded-full border border-zinc-700 flex items-center justify-center">
              <div className="w-1 h-1 bg-blue-950/60 rounded-full" />
            </div>
          </div>

          {/* iOS Status Bar */}
          <div className="relative w-full h-[44px] shrink-0 px-6 flex items-center justify-between text-black text-xs font-semibold z-40 bg-white border-b border-zinc-100 select-none">
            <div className="w-14 text-center font-bold tracking-tight text-[13px]">
              9:41
            </div>
            <div className="flex items-center space-x-1.5 text-black">
              <Signal className="w-3.5 h-3.5 stroke-[2.5]" />
              <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />
              <div className="flex items-center pl-0.5">
                <span className="text-[10px] font-mono mr-1">100%</span>
                <BatteryMedium className="w-4 h-4 stroke-[2.2]" />
              </div>
            </div>
          </div>

          {/* App Viewport Container */}
          <div className="flex-1 w-full flex flex-col overflow-hidden relative">
            {children}
          </div>

          {/* iOS Home Indicator Bar */}
          <div className="w-full h-[18px] shrink-0 bg-white flex items-center justify-center z-40 select-none border-t border-zinc-100">
            <div className="w-32 h-[4px] bg-black rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
