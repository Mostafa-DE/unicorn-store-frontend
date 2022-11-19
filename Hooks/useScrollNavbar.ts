import { useState, useEffect } from "react";

export default function useScrollNavbar() {
  const [scrollState, setScrollState] = useState("top");

  useEffect(() => {
    let listener = null;
    listener = document.addEventListener("scroll", () => {
      var scrolled = document.scrollingElement.scrollTop;
      if (scrolled >= 100) {
        if (scrollState !== "amir") {
          setScrollState("amir");
        }
      } else {
        if (scrollState !== "top") {
          setScrollState("top");
        }
      }
    });
    return () => {
      document.removeEventListener("scroll", listener);
    };
  }, [scrollState]);

  return [scrollState];
}
