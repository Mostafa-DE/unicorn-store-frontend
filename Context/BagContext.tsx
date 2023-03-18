import {createContext, useState} from "react";
import {NEXT_URL} from "@/config/index";

//TODO: add right types here
// @ts-ignore
export const BagContext = createContext();

export const BagProvider = ({children, shoppingBag}) => {
    const [bag, setBag] = useState(shoppingBag);

    const getShoppingBag = async () => {
        const bagRes = await fetch(`${NEXT_URL}/api/cart/`)
        const bag = await bagRes.json()
        setBag(bag)
    }

    const createCartItem = async ({...data}) => {
        const res = await fetch(`${NEXT_URL}/api/cart/create-item/`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({...data, cartId: bag.id})
        })
        return await res.json()
    }


    return (
        <BagContext.Provider
            value={{
                bag,
                getShoppingBag,
                createCartItem
            }}
        >
            {children}
        </BagContext.Provider>
    );
};
