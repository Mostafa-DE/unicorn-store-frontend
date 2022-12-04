import { useState, useEffect } from "react";

export default function useScrollNavbar() {
  const [scrollState, setScrollState] = useState("top");

  const handleScroll = (): void => {
      let scrolled = document.scrollingElement.scrollTop;
      if (scrolled >= 100) {
        if (scrollState !== "scrolled") {
          setScrollState("scrolled");
        }
      } else {
        if (scrollState !== "top") {
          setScrollState("top");
        }
      }
    }

  useEffect(() => {
    document.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  });

  return [scrollState];
}
