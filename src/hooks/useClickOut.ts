import { RefObject, useEffect } from 'react';

const useClickOut = <T extends HTMLElement = HTMLElement>(ref: RefObject<T>, fn: () => void) => {
  useEffect(() => {
    const handleClick = (event: MouseEvent | TouchEvent) => {
      if(ref.current && !ref.current.contains(event.target as Node)) {
        fn();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    }
  });
}

export default useClickOut;