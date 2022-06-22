import {
  Breadcrumb, HeaderMobile,
  Modal,
  ModalHeading,
  ProductItem,
  ProductItemLoading,
  ShopFilter
} from "@/components"
import ProductFilter from "@/components/product/productFilter"
import { RootState } from "@/core/store"
import { isArrayHasValue, isObjectHasValue } from "@/helper"
import { MainLayout } from "@/layout"
import { setOpenModalFilter } from "@/modules"
import { useRouter } from "next/router"
import React, { useEffect } from "react"
import { FiFilter } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { useQueryProducts } from "shared/hook"

const ProductList = () => {
  const router = useRouter()
  const { isOpenModalFilter } = useSelector((state: RootState) => state.common)
  const dispatch = useDispatch()
  const {
    products,
    handleFilter,
    handleChangePage,
    isFetching,
    isLimit,
    isLoadingMore,
  } = useQueryProducts()

  useEffect(() => {
    if (!isObjectHasValue(router.query)) return
    handleFilter({ ...router.query, offset: Number(router.query?.offset) || 0 })
  }, [router.query])

  return (
    <>
      <HeaderMobile
        showSearchInput
        rightChild={
          <button
            onClick={() => dispatch(setOpenModalFilter(true))}
            className="shop__products-view-filter-btn btn-reset"
          >
            <FiFilter />
          </button>
        }
      />
      <section className="product__list">
        <div className="container">
          <Breadcrumb
            breadcrumbList={[{ name: "Danh sách sản phẩm", path: "/" }]}
          />

          <ProductFilter />

          <div className="product__list-inner">
            <div
              className={`product__list-container grid grid-col-2 grid-col-sm-3 grid-col-lg-4
              grid-col-1024-5 grid-col-xl-6`}
            >
              {isFetching
                ? Array.from({ length: 24 }).map((_, index) => (
                    <ProductItemLoading key={index} />
                  ))
                : null}

              {!isFetching &&
                products?.length > 0 &&
                products.map((product, index) => (
                  <ProductItem key={index} product={product} />
                ))}
            </div>

            {!isLimit && isArrayHasValue(products) ? (
              <button
                onClick={() => handleChangePage()}
                className="btn-primary-outline shop__pagination-btn"
              >
                {isLoadingMore ? "Đang tải..." : "Xem Thêm"}
              </button>
            ) : null}
          </div>
        </div>
      </section>

      {isOpenModalFilter ? (
        <Modal
          isShowModal={isOpenModalFilter}
          handleClickModal={() => dispatch(setOpenModalFilter(false))}
          direction="right"
        >
          <ModalHeading
            handleClose={() => dispatch(setOpenModalFilter(false))}
            title="Lọc sản phẩm"
          />
          <ShopFilter isCloseModal={true} categories={[]} />
        </Modal>
      ) : null}
    </>
  )
}

ProductList.Layout = MainLayout

export default ProductList

// export const getStaticProps: GetStaticProps = async () => {
//   return {
//     props: {},
//   }
// }
