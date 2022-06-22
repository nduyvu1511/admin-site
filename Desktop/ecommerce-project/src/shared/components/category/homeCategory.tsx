import { CategoryItem } from "@/components"
import { HomeSlideProduct } from "@/container"
import { isArrayHasValue } from "@/helper"
import { Category as ICategory } from "@/models"
import { useCategory } from "shared/hook"
import { Navigation } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Swiper, SwiperSlide } from "swiper/react"
import { CategoryItemLoading } from "../loader"

export const HomeCategory = () => {
  const { data: parentCategories = [], isValidating } = useCategory(false)

  return (
    <HomeSlideProduct
      path="/category"
      name="Danh mục sản phẩm"
      isLoading={isValidating && !isArrayHasValue(parentCategories)}
    >
      <Swiper
        modules={[Navigation]}
        slidesPerView={4}
        spaceBetween={10}
        slidesPerGroup={4}
        navigation
        loop={false}
        breakpoints={{
          500: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          576: {
            slidesPerView: 6,
            slidesPerGroup: 6,
          },
          768: {
            spaceBetween: 20,
            slidesPerView: 8,
            slidesPerGroup: 8,
          },
          992: {
            slidesPerView: 9,
            slidesPerGroup: 9,
          },
          1024: {
            slidesPerView: 10,
            slidesPerGroup: 10,
          },
          1200: {
            slidesPerView: 12,
            slidesPerGroup: 12,
          },
        }}
      >
        {isValidating && !isArrayHasValue(parentCategories)
          ? Array.from({ length: 12 }).map((_, index) => (
              <SwiperSlide key={index}>
                <CategoryItemLoading />
              </SwiperSlide>
            ))
          : null}

        {!isValidating && isArrayHasValue(parentCategories)
          ? parentCategories.map((cate: ICategory, index) => (
              <SwiperSlide key={index}>
                <CategoryItem category={cate} />
              </SwiperSlide>
            ))
          : null}
      </Swiper>
    </HomeSlideProduct>
  )
}
