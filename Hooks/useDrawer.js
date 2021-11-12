import { useState } from "react";

export default function useDrawerMenu() {
  const [drawer, setDrawer] = useState(false);
  const openDrawer = () => {
    setDrawer(!drawer);
  };
  const closeDrawer = () => {
    setDrawer(false);
  };

  return [drawer, openDrawer, closeDrawer];
}
