import {useState, createContext, useEffect} from "react";

export const CompareContext = createContext();

export const CompareProvider = ({children}) => {
    const [productsCompare, setProductsCompare] = useState({
        compareItems: [],
        itemsCount: 0
    });

    /*---------Save Compare Product in localStorage-----------*/

    useEffect(() => {
        const shoppingcart = window.localStorage.getItem("compareProduct");
        /*this condition very important, if you don't put it you may face some problem with rendering the app*/
        if (shoppingcart !== null) {
            setProductsCompare(JSON.parse(shoppingcart));
        }
        /*--------------------------------------------------X------------------------------------------------*/
    }, []);

    useEffect(() => {
        window.localStorage.setItem(
            "compareProduct",
            JSON.stringify(productsCompare)
        );
    }, [productsCompare]);

    /*---------------------------X----------------------------*/

    // calculate total products that compared
    const calculateBagTotal = compareItems => {
        const itemsCount = compareItems.reduce((prev, curr) => prev + curr.qty, 0);
        return {itemsCount};
    };

    // add product to products list Compare
    const addToCompare = product => {
        const {compareItems = []} = productsCompare;
        const isProductExist = compareItems.findIndex(
            item => item.slug === product.slug
        );
        if (isProductExist === -1) {
            // false then do ==>
            compareItems.push({
                ...product,
                qty: 1,
                isProductExist: true
            });
        }
        const total = calculateBagTotal(compareItems);
        setProductsCompare({compareItems, ...total});
    };

    // remove product from products list Compare
    const removeFromCompare = product => {
        const {compareItems = []} = productsCompare;
        const isProductExist = compareItems.findIndex(
            item => item.id === product.id
        );
        if (isProductExist !== -1) {
            // true then do ==>
            compareItems.splice(isProductExist, 1);
        }
        const total = calculateBagTotal(compareItems);
        setProductsCompare({compareItems, ...total});
    };

    // remove all products in compare list
    const removeAllProducts = () => {
        setProductsCompare({});
    };

    return (
        <CompareContext.Provider
            value={{
                productsCompare,
                addToCompare,
                removeFromCompare,
                removeAllProducts
            }}
        >
            {children}
        </CompareContext.Provider>
    );
};
