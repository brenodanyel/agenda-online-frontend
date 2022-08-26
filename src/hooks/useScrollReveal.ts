import { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';

export function useScrollReveal() {
  useEffect(() => {
    const reveal = ScrollReveal({
      origin: "top",
      distance: "20px",
      duration: 1000,
      reset: false,
    });

    reveal.reveal(".reveal", { delay: 500, interval: 200 });
  }, []);
}