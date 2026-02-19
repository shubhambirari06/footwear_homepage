import { useEffect, useRef, useState } from 'react';

export const useLazyImage = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!imageRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const src = img.dataset.src || '';
          
          if (src) {
            img.src = src;
            img.onload = () => setIsLoaded(true);
            img.onerror = () => setIsLoaded(false);
          }
          
          observer.unobserve(img);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(imageRef.current);
    
    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return { imageRef, isLoaded };
};
