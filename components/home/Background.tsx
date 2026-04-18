"use client";

import React from "react";

export default function Background() {
    return (
        <div className="fixed inset-0 -z-10 bg-bg pointer-events-none transition-colors duration-500">
            {/* Saf Arka Plan */}
            {/* Vinyet (Köşe Karartma) Efekti */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--bg)_100%)] opacity-70" />
        </div>
    );
}