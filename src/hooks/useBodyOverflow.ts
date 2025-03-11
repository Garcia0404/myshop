import { useEffect } from "react";
export const useBodyOverflow = (toggle: boolean) => {
  useEffect(() => {
    if (toggle) {
      document.body.classList.remove("overflow-y-scroll");
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.add("overflow-y-scroll");
      document.body.classList.remove("overflow-y-hidden");
    }
    return () => {
      document.body.classList.add("overflow-y-scroll");
      document.body.classList.remove("overflow-y-hidden");
    };
  }, [toggle]);
};
