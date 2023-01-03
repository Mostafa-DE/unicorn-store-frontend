import {createContext, useState, useEffect} from "react";
import {useRouter} from "next/router";
import {API_URL, NEXT_URL} from "@/config/index";

//TODO: add right types here
// @ts-ignore
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        getCurrentUserAndProfile();
    }, []);

    const register = async (user) => {
        const createUser = await fetch(`${NEXT_URL}/api/auth/register`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        const data = await createUser.json();

        if (createUser.ok) {
            setUser(data.user);
            await router.push("/account/my-account");
        } else {
            setError(data.message);
        }
    };

    const login = async ({username, password}) => {
        const loginUser = await fetch(`${NEXT_URL}/api/auth/login/`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        const user = await loginUser.json();
        if (!loginUser.ok) {
            setError("Username or password is incorrect, please try again with correct credentials");
            return;
        }
        setUser(user);
        if (router.pathname === "/account/checkout-login") {
            await router.push("/payment/shipping-info");
            return;
        }
        if (router.pathname === "/payment/shipping-info") {
            await router.reload();
            return;
        }
        await router.push("/account/my-account");
    };

    const logout = async () => {
        const logoutUser = await fetch(`${NEXT_URL}/api/auth/logout`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username: user?.username}),
        });

        if (logoutUser.ok) setUser(null);
    };

    const getCurrentUserAndProfile = async () => {
        const currentUser = await fetch(`${NEXT_URL}/api/auth/user`);
        const currentUserProfile = await fetch(`${NEXT_URL}/api/auth/user-profile`);
        const currentUserData = await currentUser.json();
        const currentUserProfileData = await currentUserProfile.json();

        if (currentUser.ok && currentUserProfile.ok) {
            setUser(currentUserData);
            setUserProfile(currentUserProfileData);
        } else {
            setUser(null);
            setUserProfile(null);
        }
    };

    return (
        <AuthContext.Provider value={{user, userProfile, error, setError, register, login, logout, getCurrentUserAndProfile}}>
            {children}
        </AuthContext.Provider>
    );
};
