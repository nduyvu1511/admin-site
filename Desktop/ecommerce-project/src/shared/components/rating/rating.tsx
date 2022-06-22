/* eslint-disable @next/next/no-img-element */
import { StarEmptyIcon } from "@/assets"
import { RootState } from "@/core/store"
import { CommentRating, StarString } from "@/models"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { AiFillStar, AiOutlineStar } from "react-icons/ai"
import { RiLoader4Line } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useProductRating, useStatisticalRating } from "shared/hook"
import { Pagination } from "../button"
import { Star } from "../star"
import { RatingCount } from "./ratingCount"
import RatingItem from "./ratingItem"

const LIMIT_RATING = 12

export const Rating = () => {
  const router = useRouter()
  const product_id = Number(router.query?.productId) || 0

  const { product } = useSelector((state: RootState) => state.product)
  const {
    data: { data: ratingList = [], data_count = 0 } = { data: [] },
    isValidating,
    changePage,
    filterProductRatings,
  } = useProductRating({
    product_id,
    shouldFetch: true,
    type: "product",
    limit: LIMIT_RATING,
  })
  const {
    data: {
      detail_star_rating: ratingGroup = [],
      rating_total = 0,
      star_avg = 0,
    } = { data: [] },
    isValidating: isRatingGroupLoading,
  } = useStatisticalRating(product_id)

  const [offset, setOffset] = useState<number>(0)
  const [starCounts, setStarCounts] = useState<StarString[]>([])

  const handleChangePage = (_offset: number) => {
    if (_offset === offset) return
    changePage({
      params: {
        hasFilter: starCounts?.length > 0,
        offset: _offset,
        star_ratings: starCounts,
      },
      cb: () => {
        setOffset(_offset)
        document
          .querySelector(".product__rating")
          ?.scrollIntoView({ behavior: "smooth" })
      },
    })
  }

  const toggleStarCounts = (count: StarString) => {
    if (starCounts?.includes(count)) {
      const newStarCounts = [...starCounts].filter((item) => item !== count)
      filterProductRatings(
        { product_tmpl_id: product_id, star_ratings: newStarCounts },
        () => {
          setStarCounts(newStarCounts)
          if (offset) setOffset(0)
        }
      )
    } else {
      const newStarCounts = [...starCounts, count]
      filterProductRatings(
        { product_tmpl_id: product_id, star_ratings: newStarCounts },
        () => {
          setStarCounts(newStarCounts)
          if (offset) setOffset(0)
        }
      )
    }
  }

  const isActive = (count: StarString) => starCounts?.includes(count)

  return (
    <div className="product__rating">
      <header className="product__rating-header">
        <h3>Đánh Giá - Nhận Xét Từ Khách Hàng</h3>

        <div className="product__rating-header-summary">
          <div className="product__rating-header-summary-info">
            <div className="product__rating-header-info">
              <p className="product__rating-summary-count">
                {product?.star_rating || 0}
              </p>
              <div className="">
                <Star readonly size={22} ratingValue={(star_avg || 0) * 20} />
                <p className="product__rating-header-desc">
                  {rating_total || 0} nhận xét
                </p>
              </div>
            </div>

            <div className="product__rating-header-summary-separate"></div>

            <div className="product__rating-header-summary-statistical">
              <div className="product__rating-rating-group">
                {ratingGroup?.length > 0 &&
                  ratingGroup.map((rating, index) => (
                    <RatingCount
                      key={index}
                      star={Number(rating.star_rating) || 0}
                      starQuantity={Number(rating.rating_count) || 0}
                      totalQuantity={rating_total}
                    />
                  ))}
              </div>
            </div>
          </div>

          <div className="product__rating-header-summary-separate show-on-desktop"></div>

          <div className="product__rating-header-summary-filters">
            <ul className="rating__filter-list">
              {[5, 4, 3, 2, 1].map((number) => (
                <li
                  onClick={() => toggleStarCounts((number + "") as StarString)}
                  key={number}
                  className={`rating__filter-list-item ${
                    isActive((number + "") as StarString)
                      ? "rating__filter-list-item-active"
                      : ""
                  }`}
                >
                  {number}
                  {isActive((number + "") as StarString) ? (
                    <AiFillStar />
                  ) : (
                    <AiOutlineStar />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      {isValidating ? (
        <div className="loader-container">
          <RiLoader4Line className="loader" />
        </div>
      ) : null}

      {!isValidating && ratingList?.length === 0 ? (
        <div className="rating-no-rating">
          {StarEmptyIcon}
          <p>Chưa có đánh giá nào cho sản phẩm này</p>
        </div>
      ) : null}

      {/* Raging list */}
      {!isValidating && ratingList?.length > 0 ? (
        <div className="product__rating-body">
          {ratingList.map((rating: CommentRating) => (
            <RatingItem rating={rating} key={rating.comment_id} />
          ))}
        </div>
      ) : null}

      {/* Pagination */}
      {data_count > LIMIT_RATING ? (
        <div className="product__rating-pagination">
          <Pagination
            totalPage={Math.ceil(data_count / LIMIT_RATING)}
            currentOffset={offset}
            onPaginate={(_offset: number) => handleChangePage(_offset)}
          />
        </div>
      ) : null}
    </div>
  )
}
