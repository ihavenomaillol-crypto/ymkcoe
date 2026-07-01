import { useEffect, useRef } from "react";

export function useScrollTrigger(
  onIntersect: () => void,
  enabled: boolean,
  rootMargin = "250px",
) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          onIntersect();
        }
      },
      { rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [onIntersect, enabled, rootMargin]);

  return ref;
}
