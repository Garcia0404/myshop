import { useEffect } from "react";
export const useBodyOverflow = (toggle: boolean, applyWrapped: boolean) => {
  useEffect(() => {
    const wrapped = document.getElementById("wrapped");
    if (toggle) {
      document.body.classList.remove("overflow-y-scroll");
      document.body.classList.add("overflow-y-hidden");
      if (applyWrapped) {
        wrapped?.classList.remove("invisible");
      }
    } else {
      document.body.classList.add("overflow-y-scroll");
      document.body.classList.remove("overflow-y-hidden");
      if (applyWrapped) {
        wrapped?.classList.add("invisible");
      }
    }
    return () => {
      document.body.classList.add("overflow-y-scroll");
      document.body.classList.remove("overflow-y-hidden");
      wrapped?.classList.add("invisible");
    };
  }, [toggle, applyWrapped]);
};
