/* eslint-disable @next/next/no-img-element */
import { isArrayHasValue } from "@/helper"
import { setPreviewImageUrl } from "@/modules"
import { API_URL } from "@/services"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Swiper, SwiperSlide } from "swiper/react"

interface IProductImage {
  images: Array<string>
  type: "modal" | "detail"
  isStock: boolean
}

export const ProductImg = ({ images, type, isStock }: IProductImage) => {
  const dispatch = useDispatch()
  const [swiper, setSwiper] = useState<any>({})
  const [activeIndex, setActiveIndex] = useState<number>(0)

  return (
    <>
      <div
        className={`product__img-show-container ${
          type === "modal" ? "product__img-show-container-modal" : ""
        }`}
      >
        {/* stock status */}
        {isStock ? (
          <span className="product-status product-status--in-stock">
            Còn hàng
          </span>
        ) : (
          <span className="product-status product-status--out-of-stock">
            Hết hàng
          </span>
        )}

        <Swiper
          slidesPerView={1}
          loop={false}
          onInit={(ev) => {
            ev.init()
            setSwiper(ev)
          }}
          onSlideChange={(e) => setActiveIndex(e.activeIndex)}
        >
          {isArrayHasValue(images)
            ? images.map((img, index) => (
                <SwiperSlide
                  style={{
                    cursor: `${type === "detail" ? "zoom-in" : "default"}`,
                  }}
                  onClick={() =>
                    dispatch(setPreviewImageUrl(`${API_URL}${img}`))
                  }
                  key={index}
                >
                  <img className="img-fluid" src={`${API_URL}${img}`} alt="" />
                </SwiperSlide>
              ))
            : null}
        </Swiper>

        <div className="product__img-show-sub">
          {/* <Swiper
            slidesPerView={7}
            loop={false}
            onInit={(ev) => {
              ev.init()
              setSwiper(ev)
            }}
            onSlideChange={(e) => setActiveIndex(e.activeIndex)}
          >
            {isArrayHasValue(images)
              ? images.map((img, index) => (
                  <SwiperSlide
                    style={{
                      cursor: `${type === "detail" ? "zoom-in" : "default"}`,
                    }}
                    key={index}
                  >
                    <div
                      key={index}
                      onClick={() => {
                        swiper?.slideTo(index)
                      }}
                      className={`product__img-show-sub-child ${
                        index === activeIndex ? "active" : ""
                      }`}
                    >
                      <img
                        className="product__img-show-sub-item"
                        src={`${API_URL}${img}`}
                        alt=""
                      />
                    </div>
                  </SwiperSlide>
                ))
              : null}
          </Swiper> */}
          {images.map((img, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  swiper?.slideTo(index)
                }}
                className={`product__img-show-sub-child ${
                  index === activeIndex ? "active" : ""
                }`}
              >
                <img
                  className="product__img-show-sub-item"
                  src={`${API_URL}${img}`}
                  alt=""
                />
              </div>
            )
          })}
        </div>
        {/* <div className="product__img-show-label">23%</div> */}
      </div>
    </>
  )
}

export default ProductImg
