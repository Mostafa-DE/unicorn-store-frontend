import { useState, createContext, useEffect } from "react";

export const WishBagContext = createContext();

export const WishBagProvider = ({ children }) => {
  const [wishBag, setWishBag] = useState({
    items: [],
    itemsCount: 0,
    wishBagTotal: 0,
  });

  // calculate total amount for shopping wishBag and qty of product
  const calculateBagTotal = (items) => {
    const itemsCount = items.reduce((prev, curr) => prev + curr.qty, 0);
    const totalBag = items.reduce(
      (prev, curr) => prev + curr.qty * curr.price,
      0
    );
    return { itemsCount, totalBag };
  };

  // add product to shopping wishBag
  const addToWishBag = (product) => {
    const { items = [] } = wishBag;
    const isProductExist = items.findIndex((item) => item.id === product.id);
    if (isProductExist === -1) {
      // false then do ==>
      items.push({
        ...product,
        qty: 1,
      });
    }
    const total = calculateBagTotal(items);
    setWishBag({ items, ...total });
  };

  // remove product from shopping wishBag
  const removeFromWishBag = (product) => {
    const { items = [] } = wishBag;
    const isProductExist = items.findIndex((item) => item.id === product.id);
    if (isProductExist !== -1) {
      // true then do ==>
      items.splice(isProductExist, 1);
    }
    const total = calculateBagTotal(items);
    setWishBag({ items, ...total });
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
