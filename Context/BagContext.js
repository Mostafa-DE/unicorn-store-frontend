import { useState, createContext, useEffect } from "react";

export const BagContext = createContext();

export const BagProvider = ({ children }) => {
  const [bag, setBag] = useState({
    items: [],
    itemsCount: 0,
    cartTotal: 0,
  });

  /*---------Save Compare Product in localStorage-----------*/

  useEffect(() => {
    const shoppingcart = window.localStorage.getItem("shoppingBag");
    /*this condition very important, if you don't put it you may face some problem with rendering the app*/
    if (shoppingcart !== null) {
      setBag(JSON.parse(shoppingcart));
    }
    /*--------------------------------------------------X------------------------------------------------*/
  }, []);

  useEffect(() => {
    window.localStorage.setItem("shoppingBag", JSON.stringify(bag));
  }, [bag]);

  /*---------------------------X----------------------------*/

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
  const addToBag = (product, size) => {
    const { items = [] } = bag;
    const isProductExist = items.findIndex((item) => item.id === product.id);
    const isSizeExist = items.findIndex((item) => item.size === size);
    console.log(`isSizeExist: ${isSizeExist}`);
    console.log(`isProductExist: ${isProductExist}`);
    if (isProductExist === -1) {
      // false then do ==>
      items.push({
        ...product,
        qty: 1,
        size: size,
      });
    } else if (isSizeExist === -1) {
      items.push({
        ...product,
        qty: 1,
        size: size,
      });
    } else {
      items[isSizeExist].qty++;
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
