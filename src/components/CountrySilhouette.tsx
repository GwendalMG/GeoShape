import { Country } from "@/data/countries";
import { useLayoutEffect, useMemo, useRef, useState } from "react";

interface CountrySilhouetteProps {
  country: Country;
  className?: string;
  revealed?: boolean;
}

// Calculate bounding box from SVG path to zoom into the country
function getPathBounds(path: string): { minX: number; minY: number; maxX: number; maxY: number } {
  const numbers = path.match(/-?\d+\.?\d*/g);
  if (!numbers) return { minX: 0, minY: 0, maxX: 2000, maxY: 1001 };
  
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  
  for (let i = 0; i < numbers.length - 1; i += 2) {
    const x = parseFloat(numbers[i]);
    const y = parseFloat(numbers[i + 1]);
    if (!isNaN(x) && !isNaN(y)) {
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    }
  }
  
  // Add padding
  const paddingX = (maxX - minX) * 0.15;
  const paddingY = (maxY - minY) * 0.15;
  
  return {
    minX: minX - paddingX,
    minY: minY - paddingY,
    maxX: maxX + paddingX,
    maxY: maxY + paddingY
  };
}

export function CountrySilhouette({ country, className = "", revealed = false }: CountrySilhouetteProps) {
  const pathRef = useRef<SVGPathElement | null>(null);
  const [measuredViewBox, setMeasuredViewBox] = useState<string | null>(null);

  // Fallback viewBox (approx) used for first paint
  const fallbackViewBox = useMemo(() => {
    const bounds = getPathBounds(country.path);
    const width = bounds.maxX - bounds.minX;
    const height = bounds.maxY - bounds.minY;
    return `${bounds.minX} ${bounds.minY} ${width} ${height}`;
  }, [country.path]);

  // Accurate viewBox based on the rendered SVG path bounding box
  useLayoutEffect(() => {
    setMeasuredViewBox(null);
    const raf = requestAnimationFrame(() => {
      if (!pathRef.current) return;
      try {
        const b = pathRef.current.getBBox();
        const padX = b.width * 0.12;
        const padY = b.height * 0.12;
        setMeasuredViewBox(`${b.x - padX} ${b.y - padY} ${b.width + padX * 2} ${b.height + padY * 2}`);
      } catch {
        // ignore
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [country.path]);

  const viewBox = measuredViewBox ?? fallbackViewBox;

  return (
    <div className={`relative flex flex-col items-center justify-center w-full h-full ${className}`}>
      <div
        className="flex items-center justify-center w-full h-full"
        style={{ maxHeight: "clamp(200px, 40vh, 400px)" }}
      >
        <svg
          viewBox={viewBox}
          preserveAspectRatio="xMidYMid meet"
          style={{
            width: "100%",
            height: "100%",
            maxWidth: "100%",
            maxHeight: "100%",
            filter: revealed
              ? "drop-shadow(0 0 20px hsl(142 76% 46% / 0.5))"
              : "drop-shadow(0 4px 20px hsl(45 93% 58% / 0.3))",
          }}
        >
          <path
            ref={pathRef}
            d={country.path}
            fill={revealed ? "hsl(142 76% 46%)" : "hsl(210 40% 98%)"}
            stroke={revealed ? "hsl(142 76% 36%)" : "hsl(45 93% 47%)"}
            strokeWidth="0.5"
            strokeLinejoin="round"
            className="transition-all duration-500"
          />
        </svg>
      </div>

      {revealed && (
        <div className="mt-6 text-center animate-fade-in">
          <span className="text-2xl font-bold text-success bg-success/20 px-6 py-3 rounded-xl border border-success/30 block mb-4">
            {country.nameFr}
          </span>
          <p className="text-sm text-muted-foreground max-w-md px-4 leading-relaxed">
            💡 {country.funFact}
          </p>
        </div>
      )}
    </div>
  );
}
