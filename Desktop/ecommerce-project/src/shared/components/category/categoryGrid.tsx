import { companyIcon } from "@/assets"
import { Category } from "@/models"
import { setOpenCategoryModal, setOpenModalFilter } from "@/modules"
import { API_URL } from "@/services"
import Image from "next/image"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"

interface CategoryListProps {
  categories: Category[]
  modalType: "filter" | "category"
}

export const CategoryGrid = ({ categories, modalType }: CategoryListProps) => {
  const router = useRouter()
  const dispatch = useDispatch()

  return (
    <>
      {categories?.length > 0 ? (
        <ul className="category__grid-list">
          {categories.map((item: Category) => (
            <li
              onClick={() => {
                router.push(`/category/${item.id}`)
                modalType === "category"
                  ? dispatch(setOpenCategoryModal(false))
                  : dispatch(setOpenModalFilter(false))
              }}
              key={item.id}
              className={`category__grid-list-item ${
                Number(router.query?.category_id) === item.id
                  ? "category__grid-list-item-active"
                  : ""
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
      ) : null}
    </>
  )
}
