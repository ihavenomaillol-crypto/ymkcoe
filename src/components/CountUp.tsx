import { useEffect, useState, useRef } from "react";

interface CountUpProps {
  end: number;
  duration?: number; // duration in ms
  suffix?: string;
  useGrouping?: boolean;
}

export function CountUp({ end, duration = 1500, suffix = "", useGrouping = true }: CountUpProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTimestamp: number | null = null;
          
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // Ease-out quad formula for smooth deceleration
            const easeProgress = progress * (2 - progress);
            setCount(Math.floor(easeProgress * end));
            
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(end);
            }
          };
          
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [end, duration]);

  const formattedCount = useGrouping ? count.toLocaleString() : count.toString();

  return <span ref={elementRef}>{formattedCount}{suffix}</span>;
}
