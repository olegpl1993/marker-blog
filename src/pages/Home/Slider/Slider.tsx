import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./Slider.module.css";

function Slider() {
  const navigate = useNavigate();

  const handleClick = (category: string) => {
    navigate(`/blog/${category}`);
  };

  return (
    <div className={styles.slider}>
      <div className={styles.title}>Категорії</div>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        initialSlide={3}
        className={styles.swiper}
      >
        <SwiperSlide
          className={styles.swiperSlide}
          onClick={() => handleClick("mobile")}
        >
          <span className={styles.string}>Mobile</span>
          <img src="/phone.jpg" />
        </SwiperSlide>
        <SwiperSlide
          className={styles.swiperSlide}
          onClick={() => handleClick("nintendo-switch")}
        >
          <span className={styles.string}>Nintendo Switch</span>
          <img src="/nintendo.jpg" />
        </SwiperSlide>
        <SwiperSlide
          className={styles.swiperSlide}
          onClick={() => handleClick("playstation-4")}
        >
          <span className={styles.string}>PlayStation 4</span>
          <img src="/ps4.jpg" />
        </SwiperSlide>
        <SwiperSlide
          className={styles.swiperSlide}
          onClick={() => handleClick("playstation-5")}
        >
          <span className={styles.string}>PlayStation 5</span>
          <img src="/ps5.jpg" />
        </SwiperSlide>
        <SwiperSlide
          className={styles.swiperSlide}
          onClick={() => handleClick("windows")}
        >
          <span className={styles.string}>Windows</span>
          <img src="/pc.jpg" />
        </SwiperSlide>
        <SwiperSlide
          className={styles.swiperSlide}
          onClick={() => handleClick("xbox-one")}
        >
          <span className={styles.string}>Xbox One</span>
          <img src="/xboxone.jpg" />
        </SwiperSlide>
        <SwiperSlide
          className={styles.swiperSlide}
          onClick={() => handleClick("xbox-series-x-s")}
        >
          <span className={styles.string}>Xbox Series X|S</span>
          <img src="/xboxXS.jpg" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Slider;
