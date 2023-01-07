import {createContext, useState, useEffect, useCallback, Dispatch, SetStateAction} from "react";
import {useRouter} from "next/router";
import {NEXT_URL} from "@/config/index";


interface IUserProfile {
    phone: string;
    address: string;
    city: string;
    building_number: string
}

interface IUser {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
    date_joined: string;
}


type LoginResponse = Promise<{ ok: boolean; errorMessage?: string; }>;
type RegisterResponse = Promise<{ ok: boolean; errorMessage?: string }>;
type LoginParams = Pick<IUser, "username"> & { password: string };
type RegisterParams = Omit<IUser, "date_joined" | "is_active"> & { password: string };

export interface IAuthContextProps {
    user: IUser;
    userProfile: IUserProfile;
    error: string;
    setError: Dispatch<SetStateAction<string | null>>;
    message: string;
    setMessage: Dispatch<SetStateAction<string | null>>;
    register: ({...args}: RegisterParams) => RegisterResponse;
    login: ({...args}: LoginParams) => LoginResponse;
    logout: () => Promise<void>;
    updateProfile: ({...args}: IUserProfile) => Promise<void>;
    getCurrentUserAndProfile: () => Promise<void>;
}


export const AuthContext = createContext<IAuthContextProps | null>(null);

export const AuthProvider = ({children, currentUser, currentProfile}) => {
    const router = useRouter();
    const {pathname} = router;

    const [user, setUser] = useState(currentUser);
    const [userProfile, setUserProfile] = useState(currentProfile);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);


    const register = async (user: RegisterParams): RegisterResponse => {
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
            let error: string;
            if (data?.username) error = data.username[0];
            if (data?.email) error = data.email[0];
            return {ok: false, errorMessage: error};
        }
        setMessage("User created successfully, please login to continue...");
        await router.push("/account/my-account");
        return {ok: true};
    };

    const login = async ({username, password}: LoginParams): LoginResponse => {
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
            const message = "Username or password is incorrect, please try again with correct credentials"
            setError(message);
            return {ok: false, errorMessage: message};
        }

        await getCurrentUserAndProfile();
        if (pathname === "/account/checkout-login") await router.push("/payment/shipping-info");
        // if (pathname === "/payment/shipping-info") await router.reload();
        if (pathname === "/account/login") await router.push("/account/my-account");

        setMessage("Hi, Welcome to unicorns store");
        return {ok: true};
    };

    const logout = async (): Promise<void> => {
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
            if (pathname === "/account/my-account") await router.push("/");
        }
    };

    const getCurrentUserAndProfile = async (): Promise<void> => {
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

    const updateProfile = async (profileData): Promise<void> => {
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
