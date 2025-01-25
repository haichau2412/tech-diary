import { useEffect, RefObject } from "react";

const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent | FocusEvent) => void,
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent | FocusEvent) => {
      if (
        !ref.current ||
        (event.target && ref.current.contains(event.target as Node))
      ) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
