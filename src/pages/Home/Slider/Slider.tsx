import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./Slider.module.css";

function Slider() {
  return (
    <section className={styles.slider}>
      <h2 className={styles.title}>Категорії</h2>
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
        <SwiperSlide className={styles.swiperSlide}>
          <Link to={`/blog/mobile`}>
            <span className={styles.string}>Mobile</span>
            <img src="/phone.jpg" />
          </Link>
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <Link to={`/blog/nintendo-switch`}>
            <span className={styles.string}>Nintendo Switch</span>
            <img src="/nintendo.jpg" />
          </Link>
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <Link to={`/blog/playstation-4`}>
            <span className={styles.string}>PlayStation 4</span>
            <img src="/ps4.jpg" />
          </Link>
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <Link to={`/blog/playstation-5`}>
            <span className={styles.string}>PlayStation 5</span>
            <img src="/ps5.jpg" />
          </Link>
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <Link to={`/blog/windows`}>
            <span className={styles.string}>Windows</span>
            <img src="/pc.jpg" />
          </Link>
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <Link to={`/blog/xbox-one`}>
            <span className={styles.string}>Xbox One</span>
            <img src="/xboxone.jpg" />
          </Link>
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <Link to={`/blog/xbox-series-x-s`}>
            <span className={styles.string}>Xbox Series X|S</span>
            <img src="/xboxXS.jpg" />
          </Link>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}

export default Slider;
