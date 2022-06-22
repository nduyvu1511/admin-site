import {
  Breadcrumb,
  CategoryItem,
  CategoryItemLoading,
  HeaderMobile,
} from "@/components"
import { MainLayout } from "@/layout"
import { useRouter } from "next/router"
import React from "react"
import { useCategory } from "shared/hook"

const AllCategory = () => {
  const router = useRouter()
  const { data: categories, isValidating } = useCategory(true, 0)

  const isValid = (categories?.length || 0) > 0 && !isValidating
  return (
    <>
      <HeaderMobile centerChild={<p>Tất cả danh mục</p>} />

      <section className="category__section">
        <div className="container">
          <Breadcrumb
            breadcrumbList={[{ name: "Tất cả danh mục", path: "" }]}
          />
          <div className="category__section-wrapper">
            <ul
              className={`category__section__list grid grid-col-2 grid-col-xs-3 grid-col-sm-4 grid-col-md-5 grid-col-lg-6 grid-col-1024-7 grid-col-xl-8 ${
                !isValid ? "category__section__list-loading" : ""
              }`}
            >
              {isValid
                ? categories.map((item, index) => (
                    <div
                      onClick={() => router.push(`/category/${item.id}`)}
                      key={index}
                      className="category__section__list-item"
                    >
                      <CategoryItem category={item} />
                    </div>
                  ))
                : Array.from({ length: 24 }).map((_, index) => (
                    <CategoryItemLoading key={index} />
                  ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

AllCategory.Layout = MainLayout

export default AllCategory
