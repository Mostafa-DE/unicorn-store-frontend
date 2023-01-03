import {createContext, useState, useEffect, useCallback} from "react";
import {useRouter} from "next/router";
import {NEXT_URL} from "@/config/index";

//TODO: add right types here
// @ts-ignore
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const fetchData = useCallback(async () => {
        await getCurrentUserAndProfile();
    }, []);

    useEffect(() => {
        fetchData()
            .catch(err => console.log(err));
    }, [fetchData]);

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

        if (!createUser.ok) {
            setError(data.message);
            return;
        }
        setMessage("User created successfully, please login to continue...");
        await router.push("/account/my-account");
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

        if (!loginUser.ok) {
            setError("Username or password is incorrect, please try again with correct credentials");
            return;
        }

        if (router.pathname === "/account/checkout-login") {
            await router.push("/payment/shipping-info");
            return;
        }
        if (router.pathname === "/payment/shipping-info") {
            await router.reload();
            return;
        }
        await getCurrentUserAndProfile();
        setMessage("Hi, Welcome to unicorns store");
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

        const data = await logoutUser.json();

        if (logoutUser.ok) {
            await getCurrentUserAndProfile();
            setMessage(data.message);
        }
    };

    const getCurrentUserAndProfile = async () => {
        const currentUser = await fetch(`${NEXT_URL}/api/auth/user`);
        const currentUserProfile = await fetch(`${NEXT_URL}/api/auth/get-user-profile`);
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

    const updateProfile = async (profileData) => {
        const userRes = await fetch(`${NEXT_URL}/api/auth/update-user-profile`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(profileData),
        });
        if (!userRes.ok) {
            setError("Something went wrong, please try again");
            return;
        }
        setMessage("Profile updated successfully");
        await getCurrentUserAndProfile();
    }

    return (
        <AuthContext.Provider value={{
            user,
            userProfile,
            error,
            setError,
            message,
            setMessage,
            register,
            login,
            logout,
            updateProfile,
            getCurrentUserAndProfile,
        }}>
            {children}
        </AuthContext.Provider>
    );
};
