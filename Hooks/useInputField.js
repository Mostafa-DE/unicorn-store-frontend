import { useState } from "react";

function useInputState() {
  const [value, setValue] = useState("");
  const handleChange = (evnt) => {
    setValue(evnt.target.value);
  };
  const reset = () => {
    setValue("");
  };
  return [value, handleChange, reset];
}

export default useInputState;
