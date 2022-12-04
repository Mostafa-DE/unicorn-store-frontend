import { AiOutlineLine } from "react-icons/ai";

function SalesPolicies() {
  return (
    <>
      <div data-aos="fade-out" data-aos-once='true' className="containerTitle">
        <h1 className="h1Title"> Sales Policies </h1>
        <AiOutlineLine className="lineIcon" />
      </div>
      <div className="text-start container containerAllText">
        <h5 data-aos="fade-in" data-aos-once='true'>No Refunds/Exchange Only</h5>
        <p data-aos="fade-in" data-aos-once='true' className="text-md-start">
          We accept returns on an exchange basis only. No refunds are allowed,
          with add delivery fees 3JD inside amman and zarqa, 5JD outside amman
          except if the product is defective and returned within 7 days of
          purchase
        </p>
        <p data-aos="fade-in" data-aos-once='true' className="text-md-start">
          You can exchange unopened/sealed items in the original packaging
          within 7 days of your purchase. If more than 7 days have passed since
          your purchase, we cannot offer you an exchange.
        </p>
        <h5 data-aos="fade-in" data-aos-once='true'>Exchange requirements</h5>
        <p data-aos="fade-in" data-aos-once='true' className="text-md-start">
          The following criteria must be met to qualify for a refund:
        </p>
        <ul>
          <li data-aos="fade-in" data-aos-once='true'>Product is defective.</li>
          <li data-aos="fade-in" data-aos-once='true'>
            Product must be unopened and kept in original packaging.
          </li>
          <li data-aos="fade-in" data-aos-once='true'>Product must be unused.</li>
        </ul>
        <p data-aos="fade-in" data-aos-once='true' className="text-md-start">
          In order to ensure the above criteria have been met, all returns will
          be thoroughly inspected. If the product does not meet the
          above-mentioned criteria, we reserve the right not to exchange the
          product.
        </p>
        <h5 data-aos="fade-in" data-aos-once='true'>No Returns or Exchanges</h5>
        <ul>
          <li data-aos="fade-in" data-aos-once='true'>personal items</li>
          <li data-aos="fade-in" data-aos-once='true'>Single-use products</li>
        </ul>
        <h5 data-aos="fade-in" data-aos-once='true'>Return process</h5>
        <p data-aos="fade-in" data-aos-once='true' className="text-md-start">
          If wish to return a recently purchased product from unicorns , then
          you may contact us by phone or email so that we pick up the item and
          process the exchange.
        </p>
        <p data-aos="fade-in" data-aos-once='true' className="text-md-start">
          The goods must be properly packaged so as to avoid damage during
          transit. If the product is found damaged or used beyond what it takes
          for us to reasonably inspect it, then we may reject a refund. Upon
          receipt of the returned item, we will fully examine it and notify you
          via email or phone whether you are entitled to a return.
        </p>
        <p data-aos="fade-in" data-aos-once='true' className="text-md-start">
          Reminder!! You will be solely responsible for covering the shipping
          costs.
        </p>
        <p data-aos="fade-in" data-aos-once='true' className="text-md-start">
          To follow up on the status of your return, please contact us at{" "}
          <a
            data-aos="fade-in"
            data-aos-once='true'
            className="link"
            href="https://mail.google.com/mail/?view=cm&source=mailto&to=aya551555.com"
          >
            unicornStore51@gmail.com
          </a>{" "}
          or call us at{" "}
          <a data-aos="fade-in" data-aos-once='true' className="link" href="tel:0787731525">
            0787834878
          </a>
        </p>
      </div>
    </>
  );
}

export default SalesPolicies;
