/* eslint-disable @next/next/no-img-element */
import { isObjectHasValue } from "@/helper"
import { AttributeProduct, Category as ICategory } from "@/models"
import { setOpenModalFilter } from "@/modules"
import productApi from "@/services/productApi"
import { useRouter } from "next/router"
import { useCallback, useRef } from "react"
import { useDispatch } from "react-redux"
import { useQueryProducts } from "shared/hook"
import useSWR from "swr"
import { CategoryGrid } from "../category/categoryGrid"
import { CategoryList } from "../category/categoryList"
import { InputRange } from "../inputs"
import { Star } from "../star"
import { Attribute } from "./attributes"

interface ShopFilterProps {
  categories: ICategory[] | undefined
  isCloseModal?: boolean
}

export interface Price {
  min: number
  max: number
}

export const ShopFilter = (props: ShopFilterProps) => {
  const { categories, isCloseModal = false } = props
  const router = useRouter()
  const divRef = useRef<HTMLDivElement>(null)
  const prices = useRef<Price>()
  const dispatch = useDispatch()

  const { filterAttribute, filterPrice, filterStarRating } = useQueryProducts()

  const { data: attributeList } = useSWR(
    "product_attributes",
    () =>
      productApi
        .getProductAttributeList(Number(router.query?.category_id) || 0)
        .then((res: any) => res?.result?.data || []),
    {
      revalidateOnFocus: false,
    }
  )

  const handleFilterPrice = () => {
    if (!prices.current) return
    filterPrice(prices.current)
    isCloseModal && dispatch(setOpenModalFilter(false))
  }

  const handleFilterAttribute = (parentId: string, childId: string) => {
    filterAttribute(parentId, childId)
    isCloseModal && dispatch(setOpenModalFilter(false))
  }

  const handleFilterStarRating = (star: string) => {
    filterStarRating(star)
    isCloseModal && dispatch(setOpenModalFilter(false))
  }

  const isShowDeleteFilterBtn = () => {
    const { category_id, type_get, offset = 0, limit, ...query } = router.query
    return Number(offset) || 0 > 0 || isObjectHasValue(query)
  }

  return (
    <div className="shop__filter">
      <div className="shop__filter-category shop__filter-item">
        {/* <Link href="/category">
          <a className="shop__filter-heading">Tất Cả Danh Mục</a>
        </Link> */}

        {categories && (categories?.length || 0) > 0 ? (
          <CategoryList
            onClick={() => isCloseModal && dispatch(setOpenModalFilter(false))}
            categoryList={categories}
            idActive={Number(router.query?.category_id) || 0}
          />
        ) : null}

        {categories && (categories?.length || 0) > 0 ? (
          <CategoryGrid modalType="filter" categories={categories} />
        ) : null}
      </div>

      <div className="shop__filter-star shop__filter-item">
        <h3 className="shop__filter-heading">Đánh giá</h3>
        <ul className="shop__filter-star__list">
          {[3, 4, 5].map((star, index) => (
            <li
              onClick={() => handleFilterStarRating(star + "")}
              key={index}
              className={`shop__filter-star__list-item ${
                Number(router.query?.["star_rating"]) === star
                  ? "shop__filter-star__list-item-active"
                  : ""
              }`}
            >
              <Star readonly size={18} ratingValue={star * 20} />
              <p>Từ {star} sao</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Attributes */}
      {attributeList?.length > 0 &&
        attributeList.map((item: AttributeProduct, index: number) =>
          item.display_content === "min_max_value" ? (
            <div
              key={index}
              ref={divRef}
              className="shop__filter-item shop__filter-price"
            >
              <h3 className="shop__filter-heading">Lọc theo giá</h3>
              {item.max_value && item.min_value ? (
                <InputRange
                  min={item.min_value}
                  max={item.max_value}
                  onChange={({ min, max }: { min: number; max: number }) => {
                    prices.current = { max, min }
                  }}
                />
              ) : null}
              <button
                onClick={handleFilterPrice}
                className="btn-primary-outline"
              >
                Áp dụng
              </button>
            </div>
          ) : (
            <Attribute
              key={index}
              attribute={item}
              attributesActive={router.query[`attributes_${item.attribute_id}`]}
              onFilterAttribute={(parentId, childId) =>
                handleFilterAttribute(parentId, childId)
              }
            />
          )
        )}

      {isShowDeleteFilterBtn() ? (
        <div
          onClick={() => {
            router.push(`/category/${router.query?.category_id || 0}?offset=0`)
            isCloseModal && dispatch(setOpenModalFilter(false))
          }}
          className="shop__filter-item"
        >
          <div className="btn-primary shop__filter-item-clear-btn">
            Xóa bộ lọc
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default ShopFilter
