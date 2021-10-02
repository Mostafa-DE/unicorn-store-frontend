import { useState } from "react";

export default function useLoginDialog() {
  const [select, setSelect] = useState("...");
  const handleChangeSelect = (evnt) => {
    setSelect(evnt.target.value);
  };

  return [select, handleChangeSelect];
}
