import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./Slider.module.css";

function Slider() {
  return (
    <div className={styles.slider}>
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
          <Link to="blog/mobile" className={styles.string}>
            Mobile
          </Link>
          <img src="/phone.jpg" />
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <Link to="blog/nintendo-switch" className={styles.string}>
            Nintendo Switch
          </Link>
          <img src="/nintendo.jpg" />
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <Link to="blog/playstation-4" className={styles.string}>
            PlayStation 4
          </Link>
          <img src="/ps4.jpg" />
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <Link to="blog/playstation-5" className={styles.string}>
            PlayStation 5
          </Link>
          <img src="/ps5.jpg" />
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <Link to="blog/windows" className={styles.string}>
            Windows
          </Link>
          <img src="/pc.jpg" />
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <Link to="blog/xbox-one" className={styles.string}>
            Xbox One
          </Link>
          <img src="/xboxone.jpg" />
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <Link to="blog/xbox-series-x-s" className={styles.string}>
            Xbox Series X|S
          </Link>
          <img src="/xboxXS.jpg" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Slider;
