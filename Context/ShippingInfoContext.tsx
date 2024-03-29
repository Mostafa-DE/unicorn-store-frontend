import { useState, createContext, useEffect } from "react";

//TODO: add right types here
// @ts-ignore
export const ShippingInfoContext = createContext();

export const ShippingInfoProvider = ({ children }) => {
  const [shippingInfo, setShippingInfo] = useState({
    shippingItems: [],
  });

  /*---------Save Compare Product in localStorage-----------*/

  useEffect(() => {
    const shippingInformation = window.localStorage.getItem(
      "shippingInformation"
    );
    /*this condition very important, if you don't put it you may face some problem with rendering the app*/
    if (shippingInformation !== null) {
      setShippingInfo(JSON.parse(shippingInformation));
    }
    /*--------------------------------------------------X------------------------------------------------*/
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      "shippingInformation",
      JSON.stringify(shippingInfo)
    );
  }, [shippingInfo]);

  /*---------------------------X----------------------------*/

  const addToShippingInfo = (
    bag,
    firstName,
    lastName,
    address,
    phone,
    orderNumber,
    city,
    dateDelivered,
    TotalBag,
    DeliveryFees,
    discountValue
  ) => {
    const { shippingItems = [] } = shippingInfo;
    shippingItems.push({
      ...bag,
      firstName: firstName,
      lastName: lastName,
      address: address,
      phone: phone,
      orderNumber: orderNumber,
      city: city,
      dateDelivered: dateDelivered,
      Totalbag: TotalBag,
      DeliveryFees: DeliveryFees,
      discountValue: discountValue,
    });
    setShippingInfo({ shippingItems });
  };

  return (
    <ShippingInfoContext.Provider
      value={{
        shippingInfo,
        addToShippingInfo,
      }}
    >
      {children}
    </ShippingInfoContext.Provider>
  );
};
