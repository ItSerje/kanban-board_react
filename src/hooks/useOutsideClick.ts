// // import React, { useEffect, useRef } from 'react';

// const useOutsideClick = (
//   callback: () => void
// ): [React.MutableRefObject<HTMLElement | null | undefined>] => {
//   const ref = useRef<HTMLDivElement>(null!);

//   useEffect(() => {
//     const handleClick = ({ target }: MouseEvent): void => {
//       if (ref.current && !ref.current.contains(target as Node)) {
//         callback();
//       }
//     };

//     document.addEventListener('click', handleClick, true);

//     return () => {
//       document.removeEventListener('click', handleClick, true);
//     };
//   }, [ref, callback]);

//   return ref;
// };

// export default useOutsideClick;

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

      handler(event); // Call the handler only if the click is outside of the element passed.
    };
    document.addEventListener('click', listener, true);
    // document.addEventListener('mousedown', listener);
    // document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('click', listener, true);
      //   document.removeEventListener('mousedown', listener);
      //   document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]); // Reload only if ref or handler changes
};

export default useOutsideClick;
