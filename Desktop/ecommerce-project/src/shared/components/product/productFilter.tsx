import { limitProductList, listView, sortList } from "@/helper"
import { useRouter } from "next/router"
import { IoMdArrowRoundDown, IoMdArrowRoundUp } from "react-icons/io"
import { RiArrowUpDownLine } from "react-icons/ri"
import { useQueryProducts, useScrollTop } from "shared/hook"
import { Dropdown } from "../common"

interface ProductFilterProps {
  showGridView?: boolean
  onSelectGridView?: (view: number) => void
  gridView?: number
}

const ProductFilter = ({
  showGridView = false,
  onSelectGridView,
  gridView = 0,
}: ProductFilterProps) => {
  const router = useRouter()
  const { handleSortProducts } = useQueryProducts()
  const height = useScrollTop()

  return (
    <header
      className={`shop__products-header ${
        height > 90 ? "shop__products-header-active" : ""
      }`}
    >
      <div className="shop__products-header-item">
        <div className="shop__products-header-item-sort">
          <ul className="shop__products-header-item-sort-list">
            {sortList.map((item, index) => (
              <li
                className={`shop__products-header-item-sort-list-item ${
                  item.value === (router.query?.type_get || "")
                    ? "shop__products-header-item-sort-list-item-active"
                    : ""
                }`}
                onClick={() => {
                  handleSortProducts(item.value)
                }}
                key={index}
              >
                {item.title}
              </li>
            ))}

            <li
              className={`shop__products-header-item-sort-list-item ${
                router.query?.type_get?.includes("price")
                  ? "shop__products-header-item-sort-list-item-active"
                  : ""
              }`}
              onClick={() => {
                handleSortProducts(
                  router.query.type_get === "price_reduction"
                    ? "price_increase"
                    : "price_reduction"
                )
              }}
            >
              <p>Giá</p>
              {!router.query?.type_get?.includes("price") ? (
                <RiArrowUpDownLine />
              ) : null}
              {router.query?.type_get === "price_increase" ? (
                <IoMdArrowRoundDown />
              ) : null}
              {router.query?.type_get === "price_reduction" ? (
                <IoMdArrowRoundUp />
              ) : null}
            </li>
          </ul>
        </div>
      </div>

      <div className="shop__products-header-right">
        {showGridView ? (
          <div className="shop__products-header-right-view">
            <ul className="shop__products-view-list">
              {listView.map((item) => (
                <li
                  key={item.id}
                  className={`shop__view-item  ${
                    item.value === gridView ? "shop__view-item-active" : ""
                  }`}
                >
                  <button
                    onClick={() =>
                      onSelectGridView && onSelectGridView(item.value)
                    }
                    className="btn-reset shop__view-item-btn"
                  >
                    {item.icon}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="shop__products-header-right-limit">
          <Dropdown
            list={limitProductList}
            handleClick={(limit: number) =>
              router.push(
                {
                  query: {
                    ...router.query,
                    limit,
                    offset: 0,
                  },
                },
                undefined,
                { scroll: false, shallow: true }
              )
            }
          />
        </div>
      </div>
    </header>
  )
}

export default ProductFilter
