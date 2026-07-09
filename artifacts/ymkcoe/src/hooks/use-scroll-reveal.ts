import { useCallback, useEffect, useRef } from "react";

export function useScrollReveal() {
  const scrollRootRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const observedRef = useRef<Set<Element>>(new Set());

  const observeElements = useCallback(() => {
    const root = scrollRootRef.current;
    const observer = observerRef.current;
    if (!root || !observer) return;

    root.querySelectorAll<HTMLElement>("[data-scroll-reveal]:not(.revealed)").forEach((item) => {
      if (!observedRef.current.has(item)) {
        observer.observe(item);
        observedRef.current.add(item);
      }
    });
  }, []);

  useEffect(() => {
    const root = scrollRootRef.current;
    if (!root) return;

    // Adapt rootMargin to screen height: smaller margin on short screens so
    // elements reveal before they're fully past on fast scrolls
    const screenH = window.innerHeight;
    const rootMargin =
      screenH < 600
        ? "0px 0px 0px 0px"       // very short screen (landscape phone)
        : screenH < 900
        ? "0px 0px -5% 0px"        // phone/tablet portrait
        : "0px 0px -8% 0px";       // desktop

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observerRef.current?.unobserve(entry.target);
            observedRef.current.delete(entry.target);
          }
        });
      },
      {
        root,
        threshold: 0.08,
        rootMargin,
      },
    );

    observeElements();

    const mutationObserver = new MutationObserver(observeElements);
    mutationObserver.observe(root, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      observerRef.current?.disconnect();
      observerRef.current = null;
      observedRef.current.clear();
    };
  }, [observeElements]);

  return scrollRootRef;
}
