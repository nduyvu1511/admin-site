/* eslint-disable @next/next/no-img-element */
import { API_URL } from "@/services"
import { useCategory } from "shared/hook"
import { Autoplay, Navigation, Pagination } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Swiper, SwiperSlide } from "swiper/react"
import { isArrayHasValue } from "../../shared/helper/functions"

export const SecondaryBanner = () => {
  const { bannerUrls, isValidating } = useCategory(false)

  return (
    <div className="secondary__banner">
      {!isValidating && isArrayHasValue(bannerUrls) ? (
        <div className="secondary__banner-list">
          <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={1}
            slidesPerGroup={2}
            navigation
            pagination={{ clickable: true }}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              992: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 20,
              },
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
        <div className="secondary__banner-loading"></div>
      )}
    </div>
  )
}
