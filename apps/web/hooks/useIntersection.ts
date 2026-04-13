"use client";
import { useEffect, useRef, useState } from "react";
export function useIntersection(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, options);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);
  return { ref, isVisible };
}
