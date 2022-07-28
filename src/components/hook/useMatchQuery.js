import { useEffect, useState } from 'react';

const useMatchQuery = (query = '(max-width: 768px)') => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const handler = (e) => setMatches(e.matches);

    window.matchMedia(query).addEventListener('change', handler);
    setMatches(window.matchMedia(query)?.matches);
    return () => {
      window.removeEventListener('change', handler);
    };
  }, [query]);

  return matches;
};

export { useMatchQuery };
