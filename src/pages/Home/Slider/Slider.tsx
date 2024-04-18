import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { memo, useRef } from "react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./Slider.module.css";

const Slider = memo(() => {
  const swiperNavNextRef = useRef(null);
  const swiperNavPrevRef = useRef(null);

  return (
    <section className={styles.slider}>
      <div className={styles.title}>Категорії</div>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onInit={(swiper: any) => {
          swiper.params.navigation.prevEl = swiperNavPrevRef.current;
          swiper.params.navigation.nextEl = swiperNavNextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination, Navigation]}
        initialSlide={3}
        className={styles.swiper}
      >
        <div className={styles.navigation}>
          <button
            className={styles.navigationButton}
            ref={swiperNavPrevRef}
            title="Попередній слайд"
          >
            <NavigateBeforeIcon sx={{ height: "45px", width: "45px" }} />
          </button>
          <button
            className={styles.navigationButton}
            ref={swiperNavNextRef}
            title="Наступний слайд"
          >
            <NavigateNextIcon sx={{ height: "45px", width: "45px" }} />
          </button>
        </div>

        <SwiperSlide className={styles.swiperSlide}>
          <Link to={`/blog/mobile`}>
            <span className={styles.string}>Mobile</span>
            <img src="/phone.webp" alt="Геймерський мобільний телефон" />
          </Link>
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <Link to={`/blog/nintendo-switch`}>
            <span className={styles.string}>Nintendo Switch</span>
            <img src="/nintendo.webp" alt="Ігрова консоль nintendo switch" />
          </Link>
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <Link to={`/blog/playstation-4`}>
            <span className={styles.string}>PlayStation 4</span>
            <img src="/ps4.webp" alt="Ігрова консоль playstation 4" />
          </Link>
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <Link to={`/blog/playstation-5`}>
            <span className={styles.string}>PlayStation 5</span>
            <img src="/ps5.webp" alt="Ігрова консоль playstation 5" />
          </Link>
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <Link to={`/blog/windows`}>
            <span className={styles.string}>Windows</span>
            <img
              src="/pc.webp"
              alt="Ігровий ноутбук з операційною системою windows"
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <Link to={`/blog/xbox-one`}>
            <span className={styles.string}>Xbox One</span>
            <img src="/xboxone.webp" alt="Ігрова консоль xbox one" />
          </Link>
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <Link to={`/blog/xbox-series-x-s`}>
            <span className={styles.string}>Xbox Series X|S</span>
            <img src="/xboxXS.webp" alt="Ігрова консоль xbox series" />
          </Link>
        </SwiperSlide>
      </Swiper>
    </section>
  );
});

export default Slider;
