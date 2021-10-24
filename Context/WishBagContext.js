import { useState, createContext, useEffect } from "react";

export const WishBagContext = createContext();

export const WishBagProvider = ({ children }) => {
  const [wishBag, setWishBag] = useState({
    wishItems: [],
    itemsCount: 0,
    wishBagTotal: 0,
  });

  /*---------Save Compare Product in localStorage-----------*/

  useEffect(() => {
    const shoppingcart = window.localStorage.getItem("wishBag");
    /*this condition very important, if you don't put it you may face some problem with rendering the app*/
    if (shoppingcart !== null) {
      setWishBag(JSON.parse(shoppingcart));
    }
    /*--------------------------------------------------X------------------------------------------------*/
  }, []);

  useEffect(() => {
    window.localStorage.setItem("wishBag", JSON.stringify(wishBag));
  }, [wishBag]);

  /*---------------------------X----------------------------*/

  // calculate total amount for shopping wishBag and qty of product
  const calculateBagTotal = (wishItems) => {
    const itemsCount = wishItems.reduce((prev, curr) => prev + curr.qty, 0);
    const totalBag = wishItems.reduce(
      (prev, curr) => prev + curr.qty * curr.price,
      0
    );
    return { itemsCount, totalBag };
  };

  // add product to shopping wishBag
  const addToWishBag = (product) => {
    const { wishItems = [] } = wishBag;
    const isProductExist = wishItems.findIndex(
      (item) => item.name === product.name
    );
    if (isProductExist === -1) {
      // false then do ==>
      wishItems.push({
        ...product,
        qty: 1,
        isProductExist: true,
      });
    } else {
      console.log("this item already exist in your wish list");
    }
    const total = calculateBagTotal(wishItems);
    setWishBag({ wishItems, ...total });
  };

  // remove product from shopping wishBag
  const removeFromWishBag = (product) => {
    const { wishItems = [] } = wishBag;
    const isProductExist = wishItems.findIndex(
      (item) => item.id === parseInt(product.IdProductExist)
    );
    if (isProductExist !== -1) {
      // true then do ==>
      wishItems.splice(isProductExist, 1);
    }
    const total = calculateBagTotal(wishItems);
    setWishBag({ wishItems, ...total });
  };

  return (
    <WishBagContext.Provider
      value={{
        wishBag,
        addToWishBag,
        removeFromWishBag,
      }}
    >
      {children}
    </WishBagContext.Provider>
  );
};
