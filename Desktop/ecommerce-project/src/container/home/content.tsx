import { ProductItem, ProductItemLoading } from "@/components"
import { isArrayHasValue } from "@/helper"
import { useProduct } from "shared/hook"
import { HomeSlideProduct } from "./homeSlide"

export const MainContent = () => {
  const { data: topProducts, isValidating: isTopLoading } = useProduct({
    key: "top_products",
    params: { type_get: "top_sale", limit: 12, offset: 2 },
  })
  const { data: newProducts, isValidating: isNewProductLoading } = useProduct({
    key: "products",
    params: { type_get: "new", limit: 12, offset: 2 },
  })

  return (
    <section className="home__content">
      <div className="home__content-right">
        <HomeSlideProduct
          path="/products/top/&type_get=top_sale"
          name="Bán Chạy"
          title="Đừng bỏ lỡ nhưng ưu đãi mới nhất"
          isLoading={isTopLoading && !isArrayHasValue(topProducts)}
        >
          <div className="home__content-products-grid grid grid-col-2 grid-col-sm-3 grid-col-lg-4 grid-col-1024-5 grid-col-xl-6">
            {!isTopLoading && isArrayHasValue(topProducts)
              ? topProducts
                  .slice(0, 12)
                  .map((product, index) => (
                    <ProductItem
                      isLoading={isTopLoading}
                      key={index}
                      product={product}
                    />
                  ))
              : Array.from({ length: 12 }).map((_, index) => (
                  <ProductItemLoading key={index} />
                ))}
          </div>
        </HomeSlideProduct>

        <HomeSlideProduct
          name="Sản phẩm mới"
          title="Những sản phẩm mới nhất đến từ shop"
          path="/products/new&type_get=new"
          isLoading={isNewProductLoading && !isArrayHasValue(newProducts)}
        >
          <div className="home__content-products-grid grid grid-col-2 grid-col-sm-3 grid-col-lg-4 grid-col-1024-5 grid-col-xl-6">
            {!isNewProductLoading && isArrayHasValue(newProducts)
              ? newProducts
                  .slice(0, 12)
                  .map((product, index) => (
                    <ProductItem
                      isLoading={isTopLoading}
                      key={index}
                      product={product}
                    />
                  ))
              : Array.from({ length: 12 }).map((_, index) => (
                  <ProductItemLoading key={index} />
                ))}
          </div>
        </HomeSlideProduct>
      </div>
    </section>
  )
}
