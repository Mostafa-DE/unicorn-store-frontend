import Carousel from "react-elastic-carousel";
import ProductItems from "@/components/ProductItems";
import { breakPoints } from "@/helpers/breakPointCarousel";
import { AiOutlineLine } from "react-icons/ai";

export default function CarouselDresses({
  turkeyDresses,
  localAbayas,
  menPagamas,
  token,
}) {
  // const breakPoints = [
  //   { width: 1, itemsToShow: 1 },
  //   { width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
  //   { width: 850, itemsToShow: 3 },
  //   { width: 1150, itemsToShow: 4, itemsToScroll: 2 },
  //   { width: 1450, itemsToShow: 5 },
  //   { width: 1750, itemsToShow: 6 },
  // ];

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
        {turkeyDresses.map((product) => (
          <ProductItems
            pathname={product.productDetailsPage}
            key={product.id}
            product={product}
            token={token}
          />
        ))}

        {localAbayas.map((product) => (
          <ProductItems
            pathname={product.productDetailsPage}
            token={token}
            key={product.id}
            product={product}
          />
        ))}

        {menPagamas.map((product) => (
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
