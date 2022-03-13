import { AiOutlineLine } from "react-icons/ai";

export default function ShippingPolicy() {
  return (
    <>
      <div data-aos="fade-out" className="containerTitle">
        <h1 className="h1Title"> Shipping policy </h1>
        <AiOutlineLine className="lineIcon" />
      </div>
      <div className="text-start container containerAllText">
        <h5 data-aos="fade-in">Shipping policy</h5>
        <p data-aos="fade-in" className="text-md-start">
          All orders are processed during business days (excluding weekends and
          holidays) after receiving your order confirmation email.
        </p>
        <p data-aos="fade-in" className="text-md-start">
          Deliveries are made between Saturday and Thursday.
        </p>
        <h5 data-aos="fade-in">Domestic Shipping Rates and Estimates</h5>
        <p data-aos="fade-in" className="text-md-start">
          Shipping charges for your order will be calculated and displayed at
          checkout.
        </p>
        <p data-aos="fade-in" className="text-md-start">
          Delivery fees will be added automatically (3 JD) Inside Amman and
          zarqa, (5 JD) Outside Amman for any order.
        </p>
        <h5 data-aos="fade-in">Local delivery</h5>
        <p data-aos="fade-in" className="text-md-start">
          Deliveries are made within 24 hours if the order is placed before 4pm,
          and within 48 hours delivery if the order is placed after 4pm. We will
          contact you with the phone number you provided at checkout to notify
          you on the day & time of our arrival.
        </p>
        <h5 data-aos="fade-in">International Shipping</h5>
        <p data-aos="fade-in" className="text-md-start">
          Sorry 😔, but we don't ship internationally at the time being.
        </p>
      </div>
    </>
  );
}
