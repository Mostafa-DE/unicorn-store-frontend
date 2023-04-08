import {createContext, useState, useEffect} from "react";
import {useRouter} from "next/router";
import {NEXT_URL} from "@/config/index";

//TODO: add right types here
// @ts-ignore
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    //TODO: add right types here
    // @ts-ignore
    useEffect(() => {
        checkIfUserLoggedIn();
    }, []);

    const navigateUserPage = () => {
        if (router.pathname === "/account/checkout-login") return "/payment/shipping-info";
        if (router.pathname === "/payment/shipping-info") {
            router.reload();
            return "";
        }
        return "/account/my-account";
    }

    /*--------------------Register------------------*/
    const register = async (user) => {
        const createUser = await fetch(`${NEXT_URL}/api/register`, {
            method: "POST",
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
            setError(null);
        }
    };

    /*------------------------X---------------------*/

    /*----------------------Login-------------------*/
    const login = async ({email: identifier, password}) => {
        setError(null);
        const loginUser = await fetch(`${NEXT_URL}/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                identifier,
                password,
            }),
        });

        const data = await loginUser.json();

        if (!loginUser.ok) {
            setError(data.message);
            return;
        }

        setUser(data.user);
        await router.push(navigateUserPage());
    };

    /*------------------------X---------------------*/

    /*----------------------logout------------------*/
    const logout = async () => {
        const logoutUser = await fetch(`${NEXT_URL}/api/logout`, {
            method: "POST",
        });

        if (logoutUser.ok) {
            setUser(null);
            await router.reload();
        }
    };

    /*------------------------X---------------------*/

    /*----------Check if user is logged in----------*/
    const checkIfUserLoggedIn = async () => {
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
        <AuthContext.Provider value={{user, error, setError, register, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};
