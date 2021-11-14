import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NEXT_URL } from "@/config/index";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => checkIfUserLoggedIn(), []);

  /*--------------------Register------------------*/
  const register = async user => {
    // console.log(user);
    const createUser = await fetch(`${NEXT_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });

    const data = await createUser.json();

    if (createUser.ok) {
      setUser(data.user);
      router.push("/account/my-account");
    } else {
      setError(data.message);
    }
  };

  /*------------------------X---------------------*/

  /*----------------------Login-------------------*/
  const login = async ({ email: identifier, password }) => {
    const loginUser = await fetch(`${NEXT_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        identifier,
        password
      })
    });

    const data = await loginUser.json();

    if (loginUser.ok) {
      setUser(data.user);
      router.push("/account/my-account");
    } else {
      setError(data.message);
    }
  };

  /*------------------------X---------------------*/

  /*----------------------logout------------------*/
  const logout = async () => {
    const logoutUser = await fetch(`${NEXT_URL}/api/logout`, {
      method: "POST"
    });

    if (logoutUser.ok) {
      setUser(null);
      router.push("/account/login");
    }
  };

  /*------------------------X---------------------*/

  /*----------Check if user is logged in----------*/
  const checkIfUserLoggedIn = async user => {
    const userLoggedIn = await fetch(`${NEXT_URL}/api/user`);
    const data = await userLoggedIn.json();

    if (userLoggedIn.ok) {
      setUser(data.user);
    } else {
      setUser(null);
    }
  };

  /*------------------------X---------------------*/

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
