import Carousel from "react-elastic-carousel";
import ProductItems from "@/components/ProductItems/ProductItems";
import { breakPoints } from "@/helpers/breakPointCarousel";
import { AiOutlineLine } from "react-icons/ai";
import { IProduct } from "@/Models/types";

interface ICarouselDressesProps {
  token: string;
  products: IProduct[][];
}

const CarouselDresses: React.FC<ICarouselDressesProps> = ({
  token,
  products,
}) => {

  if (products.length === 0) return <div></div>;
  return (
    <div>
      <div className="containerTitle">
        <h1 className="h1Title" data-aos="zoom-in" data-aos-once='true'>
          أبرز المنتجات
        </h1>
        <AiOutlineLine className="lineIcon" />
      </div>
      {/*
        //TODO: add right types here
        // @ts-ignore*/}
      <Carousel
        enableAutoPlay
        autoPlaySpeed={10000}
        breakPoints={breakPoints}
        disableArrowsOnEnd={false}
        className="carousel"
        isRTL={false}
      >
        {products.map((productsArrayData) =>
          productsArrayData.map((product) => (
            <ProductItems
              pathname={product.productDetailsPage}
              key={product.id}
              product={product}
              token={token}
            />
          ))
        )}
      </Carousel>
    </div>
  );
};

export default CarouselDresses;
