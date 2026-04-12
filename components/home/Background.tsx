"use client";

import React from "react";

export default function Background() {
    return (
        <div className="fixed inset-0 -z-10 bg-[#080808] pointer-events-none">
            {/* Minimalist Zinc Grid */}
            <div 
                className="absolute inset-0 opacity-[0.15]" 
                style={{
                    backgroundImage: `radial-gradient(#27272a 1px, transparent 1px)`,
                    backgroundSize: '32px 32px'
                }}
            />
            {/* Vignette effect to keep focus on center */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#080808_100%)] opacity-80" />
        </div>
    );
}