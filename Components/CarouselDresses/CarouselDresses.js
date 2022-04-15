import Carousel from "react-elastic-carousel";
import ProductItems from "@/components/ProductItems/ProductItems";
import {breakPoints} from "@/helpers/breakPointCarousel";
import {AiOutlineLine} from "react-icons/ai";

export default function CarouselDresses({token, products}) {
    return (
        <div>
            <div className="containerTitle">
                <h1 className="h1Title"
                    data-aos="zoom-in"
                >
                    أبرز المنتجات
                </h1>
                <AiOutlineLine className="lineIcon"/>
            </div>
            <Carousel
                enableAutoPlay
                autoPlaySpeed={5000}
                breakPoints={breakPoints}
                disableArrowsOnEnd={false}
                className="carousel"
            >
                {products?.map((product) => (
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
