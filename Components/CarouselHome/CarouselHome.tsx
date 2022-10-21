import styles from "@/components/CarouselHome/CarouselHome.module.css";
import Carousel from "react-bootstrap/Carousel";

export default function CarouselHome() {
  const heightImgs = 550;
  const styleCaption = {
    color: "#000",
  };

  return (
    <div style={{ margin: "5rem 0 0 0" }}>
      <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./images/unicorn/mainModelWomen.jpg"
            alt="First slide"
            height={heightImgs}
          />
          <Carousel.Caption>
            <h3 style={styleCaption}>First slide label</h3>
            <p style={styleCaption}>
              Nulla vitae elit libero, a pharetra augue mollis interdum.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./images/unicorn/mainModelWomen2.jpg"
            alt="Second slide"
            height={heightImgs}
          />

          <Carousel.Caption>
            <h3 style={styleCaption}>Second slide label</h3>
            <p style={styleCaption}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./images/test/test3.jpg"
            alt="Third slide"
            height={heightImgs}
          />

          <Carousel.Caption>
            <h3 style={styleCaption}>Third slide label</h3>
            <p style={styleCaption}>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
