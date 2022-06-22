/* eslint-disable @next/next/no-img-element */
import { bannerLeft } from "@/assets"
import { API_URL } from "@/services"
import { useCategory } from "shared/hook"
import { Autoplay, Navigation, Pagination } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Swiper, SwiperSlide } from "swiper/react"
import { isArrayHasValue } from "../../shared/helper/functions"

export const MainBanner = () => {
  const { bannerUrls, isValidating } = useCategory(false)

  return (
    <div className="home__banner">
      {!isValidating && isArrayHasValue(bannerUrls) ? (
        <div className="home__banner-left">
          <img
            style={{ height: "100%" }}
            src={bannerLeft}
            // src={`${API_URL}${bannerUrls?.[0] || ""}`}
            alt=""
            className="img-fluid"
          />
        </div>
      ) : (
        <div className="home__banner-left home__banner-left-loading"></div>
      )}

      {!isValidating && isArrayHasValue(bannerUrls) ? (
        <div className="home__banner-right">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
          >
            {bannerUrls.map((banner, index) => (
              <SwiperSlide key={index}>
                <img src={`${API_URL}${banner}`} alt="" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className="home__banner-right home__banner-right-loading"></div>
      )}
    </div>
  )
}
