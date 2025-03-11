import { RefObject, useEffect } from "react";

export const useClickOutside = (
  ref: RefObject<HTMLDivElement>,
  callback: () => void,
  ref2?: RefObject<HTMLDivElement>
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      //Si el click fué fuera del elemento
      if (ref2?.current) {
        if (
          ref.current &&
          !ref.current.contains(event.target as Node) &&
          !ref2?.current.contains(event.target as Node)
        ) {
          callback();
        }
      } else {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          callback();
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, callback]);
};
