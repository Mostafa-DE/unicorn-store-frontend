import Carousel from "react-elastic-carousel";
import ProductItems from "@/components/ProductItems/ProductItems";
import {breakPoints} from "@/helpers/breakPointCarousel";
import {IProduct} from "@/Models/types";

interface ICarouselDressesProps {
    token: string;
    products: IProduct[];
}

const CarouselDresses: React.FC<ICarouselDressesProps> = (
    {
        token,
        products
    }
) => {

    if (products.length === 0) {
        return <div></div>;
    }

    return (
        <div>
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
                    <ProductItems
                        pathname={product.productDetailsPage}
                        key={product.id}
                        product={product}
                        token={token}
                    />
                )}
            </Carousel>
        </div>
    );
};

export default CarouselDresses;
