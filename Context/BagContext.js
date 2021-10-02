import { useState, createContext, useEffect } from "react";

export const BagContext = createContext();

export const BagProvider = ({ children }) => {
  const [bag, setBag] = useState({
    items: [],
    itemsCount: 0,
    cartTotal: 0,
  });

  // calculate total amount for shopping bag and qty of product
  const calculateBagTotal = (items) => {
    const itemsCount = items.reduce((prev, curr) => prev + curr.qty, 0);
    const totalBag = items.reduce(
      (prev, curr) => prev + curr.qty * curr.price,
      0
    );
    return { itemsCount, totalBag };
  };

  // add product to shopping bag
  const addToBag = (product, size, color) => {
    const { items = [] } = bag;
    const isProductExist = items.findIndex((item) => item.id === product.id);
    if (isProductExist === -1) {
      // false then do ==>
      items.push({
        ...product,
        qty: 1,
        size: size,
        color: color,
      });
    } else {
      // true then do ==>
      items[isProductExist].qty++;
    }
    const total = calculateBagTotal(items);
    setBag({ items, ...total });
  };

  // remove product from shopping bag
  const removeFromBag = (product) => {
    const { items = [] } = bag;
    const isProductExist = items.findIndex((item) => item.id === product.id);
    if (isProductExist !== -1) {
      // true then do ==>
      items.splice(isProductExist, 1);
    }
    const total = calculateBagTotal(items);
    setBag({ items, ...total });
  };

  // increase QTY from shopping bag
  const increaseQty = (product) => {
    const { items = [] } = bag;
    const isProductExist = items.findIndex((item) => item.id === product.id);
    items[isProductExist].qty++;
    const total = calculateBagTotal(items);
    setBag({ items, ...total });
  };

  // decrease QTY from shopping bag
  const decreaseQty = (product) => {
    const { items = [] } = bag;
    const isProductExist = items.findIndex((item) => item.id === product.id);
    items[isProductExist].qty--;
    const total = calculateBagTotal(items);
    setBag({ items, ...total });
  };

  return (
    <BagContext.Provider
      value={{
        bag,
        addToBag,
        removeFromBag,
        increaseQty,
        decreaseQty,
      }}
    >
      {children}
    </BagContext.Provider>
  );
};
