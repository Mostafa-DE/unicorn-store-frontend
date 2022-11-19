import { useState } from "react";

export default function useToggle() {
  const [state, setState] = useState(false);
  const handleOpen = () => {
    setState(!state);
  };
  const handleClose = () => {
    setState(false);
  };

  return [state, handleOpen, handleClose];
}
