"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const HeroScene = dynamic(
  () => import("./HeroScene").then((m) => ({ default: m.HeroScene })),
  { ssr: false }
);

function SceneFallback() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        background:
          "radial-gradient(ellipse at 40% 40%, rgba(37,99,235,0.18) 0%, rgba(124,58,237,0.08) 60%, transparent 100%)",
      }}
    />
  );
}

export function HeroSceneDynamic() {
  return (
    <Suspense fallback={<SceneFallback />}>
      <HeroScene />
    </Suspense>
  );
}
