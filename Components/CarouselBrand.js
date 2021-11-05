import Carousel from "react-elastic-carousel";
import { breakPoints } from "@/helpers/breakPointCarousel";

export default function CarouselBrand() {
  return (
    <div style={{ margin: "8rem 0 0 0" }}>
      <Carousel
        enableAutoPlay
        autoPlaySpeed={5000}
        breakPoints={breakPoints}
        className="carousel"
      >
        <img src="/images/test/test1.jpg" width={200} height={150} />
        <img src="/images/test/test2.jpg" width={200} height={150} />
        <img src="/images/test/test3.jpg" width={200} height={150} />
        <img src="/images/test/test1.jpg" width={200} height={150} />
        <img src="/images/test/test1.jpg" width={200} />
        <img src="/images/test/test1.jpg" width={200} />
        <img src="/images/test/test1.jpg" width={200} />
        <img src="/images/test/test1.jpg" width={200} />
        <img src="/images/test/test1.jpg" width={200} />
        <img src="/images/test/test1.jpg" width={200} />
      </Carousel>
    </div>
  );
}
