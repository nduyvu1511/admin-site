import { companyIcon } from "@/assets"
import { Category } from "@/models"
import { API_URL } from "@/services"
import Image from "next/image"
import { useEffect, useState } from "react"
import { RiLoader4Fill } from "react-icons/ri"
import { useCategory } from "shared/hook"
import { CategoryGrid } from "./categoryGrid"
import { ImFileEmpty } from "react-icons/im"

export const CategoryMobile = () => {
  const [currentId, setCurrentId] = useState<number>(0)
  const {
    data: categories,
    getChildCategories,
    setChildCategories,
    childCategories,
    isChildCategoryFetching,
  } = useCategory(false)

  useEffect(() => {
    if (!categories?.[0]?.id) return
    const id = categories[0].id
    getChildCategories(id)
    setCurrentId(id)

    return () => {
      setChildCategories([])
    }
  }, [])

  return (
    <div className="category__select">
      <ul className="category__left-list">
        {categories?.length > 0 &&
          categories.map((item: Category) => (
            <li
              onClick={() => {
                setCurrentId(item.id)
                getChildCategories(item.id)
              }}
              key={item.id}
              className={`category__left-list-item ${
                item.id === currentId ? "category__left-list-item-active" : ""
              }`}
            >
              <div className="image-container">
                <Image
                  src={item?.icon ? `${API_URL}${item.icon}` : companyIcon}
                  layout="fill"
                  alt=""
                  className="image"
                  quality={20}
                />
              </div>
              <p>{item.name}</p>
            </li>
          ))}
      </ul>

      <div className="category__select-right">
        {!isChildCategoryFetching &&
        childCategories &&
        childCategories?.length > 0 ? (
          <CategoryGrid modalType="category" categories={childCategories} />
        ) : null}

        {!isChildCategoryFetching && childCategories?.length === 0 ? (
          <div className="category__select-right-no-category">
            <ImFileEmpty />
            <p>Không có danh mục nào được tìm thấy</p>
          </div>
        ) : null}

        {isChildCategoryFetching ? (
          <div className="category__select-right-loading">
            <RiLoader4Fill className="loader" />
          </div>
        ) : null}
      </div>
    </div>
  )
}
