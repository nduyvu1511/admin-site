import { place1, place2, place3, place4 } from "@/assets"
import "swiper/css/navigation"
import "swiper/css"
import { Swiper, SwiperSlide } from "swiper/react"
import { PlaceItem } from "./placeItem"
import { Navigation } from "swiper"

export const PlaceSlide = () => {
  return (
    <Swiper
      className="custom-swiper"
      spaceBetween={48}
      slidesPerView={4}
      onSlideChange={() => {}}
      onSwiper={(swiper) => {}}
      modules={[Navigation]}
      navigation={true}
    >
      {[
        { image: place1, label: "Ho Chi Minh", path: "/" },
        { image: place2, label: "Cam Ranh", path: "/" },
        { image: place3, label: "Đà Lạt", path: "/" },
        { image: place4, label: "Tiền Giang", path: "/" },
      ].map((item, index) => (
        <SwiperSlide key={index}>
          <PlaceItem placeItem={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
