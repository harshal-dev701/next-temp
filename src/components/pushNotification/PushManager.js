"use client";

import { useEffect } from "react";

export default function PushManager() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("serviceWorker" in navigator && "PushManager" in window) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.log("SW registered:", reg);
        })
        .catch((err) => {
          console.error("SW registration failed:", err);
        });
    } else {
      console.warn("ServiceWorker or Push is not supported in this browser.");
    }
  }, []);

  return null;
}
