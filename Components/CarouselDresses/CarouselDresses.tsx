import Carousel from "react-elastic-carousel";
import ProductItems from "@/components/ProductItems/ProductItems";
import {breakPoints} from "@/helpers/breakPointCarousel";
import {AiOutlineLine} from "react-icons/ai";
import {useContext} from "react";
import {LanguageContext} from "@/context/LanguageContext";
import {languages} from "./TranslateText";

export default function CarouselDresses({ token, products }) {
  if (products.length === 0) return;
  return (
    <div>
      <div className="containerTitle">
        <h1 className="h1Title" data-aos="zoom-in">
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
        {products.map((product) =>
          product.map((productArrayData) => (
            <ProductItems
              //TODO: add right types here
              // @ts-ignore
              pathname={productArrayData.productDetailsPage}
              key={productArrayData.id}
              product={productArrayData}
              token={token}
            />
          ))
        )}
      </Carousel>
    </div>
  );
export default function CarouselDresses({token, products}) {
    if (products.length === 0) return;
    const {language} = useContext(LanguageContext)
    const {mainTitle} = languages[language];

    return (
        <div>
            <div className="containerTitle">
                <h1 className="h1Title"
                    data-aos="zoom-in"
                >
                    {mainTitle}
                </h1>
                <AiOutlineLine className="lineIcon"/>
            </div>
            <Carousel
                enableAutoPlay
                autoPlaySpeed={10000}
                breakPoints={breakPoints}
                disableArrowsOnEnd={false}
                className="carousel"
                isRTL={false}
            >
                {products.map((product) => (
                    product.map(productArrayData => (
                        <ProductItems
                            pathname={productArrayData.productDetailsPage}
                            key={productArrayData.id}
                            product={productArrayData}
                            token={token}
                        />
                    ))

                ))}
            </Carousel>
        </div>
    );
}
