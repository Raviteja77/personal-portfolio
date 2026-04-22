"use client";

import { CSSProperties } from "react";

interface BorderBeamProps {
  size?: number;
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
  borderWidth?: number;
}

export function BorderBeam({
  size = 200,
  duration = 8,
  colorFrom = "#2563EB",
  colorTo = "#8B5CF6",
  delay = 0,
  borderWidth = 1.5,
}: BorderBeamProps) {
  return (
    <div
      className="border-beam"
      style={
        {
          "--beam-size": size,
          "--beam-duration": duration,
          "--beam-color-from": colorFrom,
          "--beam-color-to": colorTo,
          "--beam-delay": delay,
          "--beam-border-width": borderWidth,
        } as CSSProperties
      }
    />
  );
}
