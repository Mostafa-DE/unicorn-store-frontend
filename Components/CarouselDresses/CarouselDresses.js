import Carousel from "react-elastic-carousel";
import ProductItems from "@/components/ProductItems/ProductItems";
import { breakPoints } from "@/helpers/breakPointCarousel";
import { AiOutlineLine } from "react-icons/ai";

export default function CarouselDresses({
  turkeyDresses,
  localAbayas,
  menPagamas,
  token,
}) {
  return (
    <div>
      <div className="containerTitle">
        <h1 className="h1Title" data-aos="zoom-in">
          أبرز المنتجات
        </h1>
        <AiOutlineLine className="lineIcon" />
      </div>
      <Carousel
        enableAutoPlay
        autoPlaySpeed={5000}
        breakPoints={breakPoints}
        disableArrowsOnEnd={false}
        className="carousel"
      >
        {turkeyDresses?.map((product) => (
          <ProductItems
            pathname={product.productDetailsPage}
            key={product.id}
            product={product}
            token={token}
          />
        ))}

        {localAbayas?.map((product) => (
          <ProductItems
            pathname={product.productDetailsPage}
            token={token}
            key={product.id}
            product={product}
          />
        ))}

        {menPagamas?.map((product) => (
          <ProductItems
            pathname={product.productDetailsPage}
            token={token}
            key={product.id}
            product={product}
          />
        ))}
      </Carousel>
    </div>
  );
}
