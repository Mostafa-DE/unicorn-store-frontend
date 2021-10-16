import { useState } from "react";

export default function useLoginDialog() {
  const [openCategory, setOpenCategory] = useState(false);

  const handleOpenCategory = () => {
    setOpenCategory(!openCategory);
  };

  return [openCategory, handleOpenCategory];
}
