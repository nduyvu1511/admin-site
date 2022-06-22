/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { filterNotFound } from "@/assets"
import {
  BoxGridLoading,
  Breadcrumb, CategoryLoading,
  HeaderMobile,
  Modal,
  ModalHeading,
  ProductItem,
  ProductItemList,
  ProductItemLoading,
  ShopFilter
} from "@/components"
import ProductFilter from "@/components/product/productFilter"
import ProductContainer from "@/container/product/productContainer"
import { RootState } from "@/core/store"
import {
  DEFAULT_LIMIT_PRODUCT,
  isArrayHasValue,
  isObjectHasValue
} from "@/helper"
import { MainLayout } from "@/layout"
import {
  AttributeReq,
  BreadcrumbItem,
  Category as ICategory,
  ParentChildCategoryList,
  Product
} from "@/models"
import { setOpenModalFilter } from "@/modules"
import productApi from "@/services/productApi"
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect, useRef, useState } from "react"
import { FiFilter } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { useQueryProducts } from "shared/hook"

interface CategoryProps {
  products: Product[]
  category: ParentChildCategoryList
}

const ProductList = ({ products, category }: CategoryProps) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const offset = Number(router.query?.offset) || 0
  const limit = Number(router.query?.limit) || DEFAULT_LIMIT_PRODUCT
  const language = "vni"
  const shopFilterRef = useRef<HTMLDivElement>(null)
  const { isOpenModalFilter } = useSelector((state: RootState) => state.common)

  const {
    products: productList,
    isLimit,
    handleFilter,
    isLoadingMore,
    setProducts,
    setLimit,
    handleChangePage,
    isFetching,
  } = useQueryProducts()

  const [currentListView, setCurrentListView] = useState<number>(4)
  const [breadcrumbList, setBreadcrumbList] = useState<BreadcrumbItem[]>([])

  // Run in first mounting and category changes
  useEffect(() => {
    const { category_id, ...query } = router.query
    if (isObjectHasValue(query)) return

    setProducts(products?.slice(0, limit) || [])
    setLimit((products?.length || 0) <= limit)
  }, [router.query.category_id])

  // Get breadcrumb list by category
  useEffect(() => {
    if (isArrayHasValue(category?.parent_category))
      [
        setBreadcrumbList([
          { name: "Danh Mục", path: "/category" },
          ...category.parent_category.map((item) => ({
            name: item.name,
            path: `/category/${item.id}`,
          })),
        ]),
      ]
  }, [router.query.category_id])

  // Run in first mounting and query changes
  useEffect(() => {
    const { category_id, ...query } = router.query
    if (!isObjectHasValue(query)) return

    let noAttribute: any = {}
    let attribute: any = {}

    Object.keys(router.query).forEach((key) => {
      if (
        key.includes("attributes_") ||
        key === "price_range" ||
        key === "star_rating"
      ) {
        attribute[key] = router.query[key]
      } else {
        noAttribute[key] = router.query[key]
      }
    })

    if (isObjectHasValue(attribute)) {
      const attribute_ids = Object.keys(attribute).reduce(
        (prev: AttributeReq[], curr) =>
          [...prev].concat({
            attribute_id: Number(curr.split("attributes_")[1]) || 0,
            display_content: curr.includes("attributes_")
              ? "only_text"
              : curr === "price_range"
              ? "min_max_value"
              : curr,
            max_value:
              curr === "price_range"
                ? Number(attribute[curr][0]) > Number(attribute[curr][1])
                  ? Number(attribute[curr][0]) || 0
                  : Number(attribute[curr][1]) || 0
                : 0,
            min_value:
              curr === "price_range"
                ? Number(attribute[curr][0]) < Number(attribute[curr][1])
                  ? Number(attribute[curr][0]) || 0
                  : Number(attribute[curr][1]) || 0
                : curr === "star_rating"
                ? Number(attribute[curr])
                : 0,
            value_ids: curr.includes("attributes_")
              ? typeof attribute[curr] === "string"
                ? [Number(attribute[curr])]
                : attribute[curr].map((x: string) => Number(x))
              : [],
          }),
        []
      )

      handleFilter({
        ...noAttribute,
        categ_id: Number(category_id),
        limit,
        offset,
        category_id: Number(category_id),
        attribute_ids,
      })
    } else {
      handleFilter({
        ...query,
        limit,
        offset,
        category_id: Number(category_id),
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  if (router.isFallback) {
    return (
      <div className="container">
        <div className="shop__loading">
          <div className="shop__loading-left">
            <CategoryLoading length={16} />
          </div>
          <div className="shop__loading-right">
            <div className="shop__loading-right-header">
              <BoxGridLoading height={50} col={1} length={1} />
            </div>
            <div className="shop__loading-right-products grid grid-col-2 grid-col-sm-3 grid-col-lg-4">
              {Array.from({ length: 24 }).map((_, index) => (
                <ProductItemLoading key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Product list
  const ProductList = () => (
    <>
      <ProductFilter
        showGridView
        gridView={currentListView}
        onSelectGridView={(count) => setCurrentListView(count)}
      />

      {/* Product list */}
      <div
        className={`product__list-container grid ${
          currentListView === 1 ? "" : `grid-col-2 grid-col-sm-3 grid-col-lg-3`
        } grid-col-xl-${currentListView}`}
      >
        {/* {!isLoading && isObjectHasValue(products) ? */}
        {isArrayHasValue(productList) && !isFetching ? (
          <>
            {currentListView === 1
              ? productList.map((product, index) => (
                  <ProductItemList key={index} product={product} />
                ))
              : productList.map((product, index) => (
                  <ProductItem key={index} product={product} />
                ))}
          </>
        ) : null}

        {/* Show when product status is fetching and has no data */}
        {isFetching
          ? Array.from({ length: 24 }).map((_, index) => (
              <ProductItemLoading key={index} />
            ))
          : null}
      </div>

      {!isArrayHasValue(productList) && (!isFetching || !isLoadingMore) ? (
        <div className="shop__products--not-found">
          <img src={filterNotFound} alt="" />
          <p>
            Không có sản phẩm nào. Bạn thử tắt điều kiện lọc và tìm lại nhé?
          </p>
          <Link href={`/category/${Number(router.query.category_id)}?offset=0`}>
            <a className="btn-primary">Xóa bộ lọc</a>
          </Link>
        </div>
      ) : null}

      {!isLimit && isArrayHasValue(products) ? (
        <button
          onClick={() => handleChangePage()}
          className="btn-primary-outline shop__pagination-btn"
        >
          {isLoadingMore ? "Đang tải..." : "Xem Thêm"}
        </button>
      ) : null}
    </>
  )

  return (
    <section className="product__wrapper">
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

      <section className="shop-container">
        <div className="container">
          <Breadcrumb breadcrumbList={breadcrumbList} />

          <ProductContainer
            leftChild={
              <ShopFilter categories={category.child_category || []} />
            }
            rightChild={<ProductList />}
          ></ProductContainer>
        </div>
      </section>

      {/* Modal filter in mobile */}
      {isOpenModalFilter ? (
        <Modal
          isShowModal={isOpenModalFilter}
          handleClickModal={() => dispatch(setOpenModalFilter(false))}
          direction="right"
        >
          <ModalHeading
            handleClose={() => dispatch(setOpenModalFilter(false))}
            title={`${
              language === "vni" ? "Lọc sản phẩm" : "Filter products"
            } `}
          />
          <ShopFilter
            isCloseModal={true}
            categories={category?.child_category || []}
          />
        </Modal>
      ) : null}
    </section>
  )
}

ProductList.Layout = MainLayout

export default ProductList

export const getStaticPaths: GetStaticPaths = async () => {
  const res: any = await productApi.getCategories()
  const categories = res?.result?.data || []

  return {
    paths: categories.map((item: ICategory) => ({
      params: {
        category_id: item.id + "",
      },
    })),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const category_id = Number(context.params?.category_id) || 0

  const res: any = await productApi.getChildCategories(category_id)
  const product: any = await productApi.getProductList({
    category_id,
    limit: DEFAULT_LIMIT_PRODUCT + 1,
  })

  return {
    props: {
      category: res?.result?.data || {},
      products: product?.result || [],
    },
    revalidate: 10,
  }
}
