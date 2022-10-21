import { useState } from "react";

export default function useLoginDialog() {
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (evnt) => {
    setSearchTerm(evnt.target.value);
  };

  return [searchTerm, handleChange];
}
