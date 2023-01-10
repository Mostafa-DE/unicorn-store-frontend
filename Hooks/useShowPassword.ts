import { useState } from "react";

export default function useShowPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return [showPassword, handleShowPassword] as const;
}
