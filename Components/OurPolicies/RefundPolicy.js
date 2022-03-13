import { AiOutlineLine } from "react-icons/ai";

export default function RefundPolicy() {
  return (
    <>
      <div data-aos="fade-out" className="containerTitle">
        <h1 className="h1Title"> Refund policy </h1>
        <AiOutlineLine className="lineIcon" />
      </div>
      <div data-aos="fade-in" className="text-start container containerAllText">
        <p data-aos="fade-in" className="text-md-start">
          Unicorns Store does not offer Refunds, however customers have the
          right to exchange products provided the following:
        </p>
        <ul>
          <li data-aos="fade-in">
            To exchange product must be from the original buyer and confirmed
            through the order email.
          </li>
          <li data-aos="fade-in">
            The product must be sealed and kept in its original condition.
          </li>
          <li data-aos="fade-in">
            The product can be exchanged within 7 days from the date of
            purchase.
          </li>
          <li data-aos="fade-in">
            The product can be exchanged with another product of the same or
            higher value in which case the difference should be settled.
          </li>
          <li data-aos="fade-in">
            The standard warranty on items, excluding accessories, is 6 months.
          </li>
          <li data-aos="fade-in">
            Exchanged item usually take up to 3 business days.
          </li>
        </ul>
      </div>
    </>
  );
}
