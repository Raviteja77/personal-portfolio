"use client";

import { useCallback, useRef, useState } from "react";

export function useMagneticHover(strength = 0.38) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [xy, setXy] = useState({ x: 0, y: 0 });

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      setXy({
        x: (e.clientX - (r.left + r.width / 2)) * strength,
        y: (e.clientY - (r.top + r.height / 2)) * strength,
      });
    },
    [strength]
  );

  const onLeave = useCallback(() => setXy({ x: 0, y: 0 }), []);

  return { ref, xy, onMove, onLeave };
}
