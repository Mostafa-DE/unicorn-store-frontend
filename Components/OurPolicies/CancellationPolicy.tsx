import { AiOutlineLine } from "react-icons/ai";

function CancellationPolicy() {
  return (
    <>
      <div data-aos="fade-out" className="containerTitle">
        <h1 className="h1Title"> Cancellation Policy </h1>
        <AiOutlineLine className="lineIcon" />
      </div>
      <div className="text-start container containerAllText ">
        <h5 data-aos="fade-in">Order Cancellation Policy</h5>
        <p data-aos="fade-in" className="text-md-start">
          Orders can be cancelled prior to delivery only. Once orders are out
          for delivery, cancellation is not allowed.
        </p>
        <h5 data-aos="fade-in">Delivery Policy:</h5>
        <ul>
          <li data-aos="fade-in">
            Delivery will be within 24 hours, as long as order is received
            before 4pm.
          </li>
          <li data-aos="fade-in">
            Orders received after 4pm will be delivered within 48 hours.
          </li>
          <li data-aos="fade-in">
            Delivery fees will be added automatically (3 JD) Inside Amman and
            zarqa, (5 JD) Outside Amman.
          </li>
        </ul>
      </div>
    </>
  );
}

export default CancellationPolicy;
