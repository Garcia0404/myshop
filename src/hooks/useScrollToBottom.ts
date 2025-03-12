import { useEffect } from "react";

export const useScrollToBottom = (callback: () => void) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback();
          console.log('final')
        }
      },
      {
        root: null, // Observa el documento entero
        rootMargin: '1px',
        threshold: 1.0,
      }
    );

    const sentinel = document.createElement('div');
    sentinel.style.width = '100%';
    sentinel.style.height = '1px';
    document.body.appendChild(sentinel);
    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      document.body.removeChild(sentinel);
    };
  }, [callback]);
};