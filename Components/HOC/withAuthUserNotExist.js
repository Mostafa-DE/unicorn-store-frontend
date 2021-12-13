import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

const withAuth = WrappedComponent => {
  return props => {
    if (typeof window !== "undefined") {
      const { user } = useContext(AuthContext);

      const router = useRouter();

      if (!user) {
        router.replace("/");
        return null;
      }

      return <WrappedComponent {...props} />;
    }
    return null;
  };
};

export default withAuth;
