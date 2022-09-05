import { useEffect, RefObject } from 'react';

type Event = MouseEvent | TouchEvent;

const useOutsideClick = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Event) => void
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      const el = ref?.current;
      if (!el || el.contains((event?.target as Node) || null)) {
        return;
      }

      handler(event);
    };
    document.addEventListener('click', listener, true);

    return () => {
      document.removeEventListener('click', listener, true);
    };
  }, [ref, handler]);
};

export default useOutsideClick;
