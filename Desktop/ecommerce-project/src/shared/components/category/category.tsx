import { companyIcon } from "@/assets"
import { isArrayHasValue } from "@/helper"
import { Category as ICategory } from "@/models"
import { API_URL } from "@/services"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useRef, useState } from "react"
import { VscChevronDown, VscChevronRight } from "react-icons/vsc"

interface CategoryProps {
  showChild?: boolean
  categories: ICategory[]
  handleClickModal?: Function
  toggleCategoryDropdown?: Function
  type?: "large" | "small" | "full"
}

export const Category = ({
  handleClickModal,
  toggleCategoryDropdown,
  categories,
  showChild = true,
}: CategoryProps) => {
  const { asPath, query } = useRouter()
  const limit = Number(query?.limit) || 12
  const childCategory = useRef<HTMLDivElement>(null)

  const categoryIdActive = asPath.includes("category_id")
    ? asPath.split("category_id=")[1].split("&")[0]
    : 0

  const [isOpenCategoryChild, setOpenCategoryChild] = useState({
    isOpen: false,
    id: 0,
  })
  const handleCategoryItemClick = () => {
    handleClickModal && handleClickModal()
    toggleCategoryDropdown && toggleCategoryDropdown()
  }

  if (!isArrayHasValue(categories)) return null

  return (
    <div className="header__category">
      <ul className="header__category-list">
        {categories.map((car1) => (
          <li
            key={car1.id}
            className={`header__category-list-item ${
              car1?.children && car1?.children.length > 0
                ? "header__category-list-item-has-child"
                : ""
            } ${
              categoryIdActive === car1.name ||
              +categoryIdActive === car1.id ||
              (car1.children.length > 0 &&
                car1.children.some((item) => item.name === categoryIdActive)) ||
              (car1.children.length > 0 &&
                car1.children.some((item) => item.id === +categoryIdActive))
                ? "header__category-list-item-active"
                : ""
            }`}
          >
            <div className="header__category-list-item-link-wrapper">
              <Link
                href={`/shop?category_id=${car1.id}${
                  limit > 12 ? `&limit=${limit}` : ""
                }`}
                passHref
              >
                <div
                  onClick={handleCategoryItemClick}
                  className="header__category-list-item-link cursor-pointer"
                >
                  <div className="header__category-list-item-link-img image-container">
                    <Image
                      src={`${API_URL}${car1.icon}` || companyIcon}
                      alt={car1.name}
                      className="image"
                      layout="fill"
                    />
                  </div>
                  <p>{car1.name}</p>
                </div>
              </Link>

              {/* button open child category */}
              {car1.children?.length > 0 && showChild && (
                <>
                  <VscChevronRight className="hide-on-screen-smaller-1200 btn-right" />
                  <button
                    onClick={() =>
                      setOpenCategoryChild({
                        id: car1.id,
                        isOpen:
                          isOpenCategoryChild.id === car1.id
                            ? !isOpenCategoryChild.isOpen
                            : true,
                      })
                    }
                    className="btn-reset"
                  >
                    <VscChevronDown
                      className={`hide-on-screen-larger-1200 btn-down 
                       ${
                         isOpenCategoryChild.id &&
                         isOpenCategoryChild.isOpen &&
                         car1.id === isOpenCategoryChild.id
                           ? "btn-down-active"
                           : ""
                       }`}
                    />
                  </button>
                </>
              )}
            </div>

            {/* Child category */}
            {car1.children && showChild && (
              <>
                <div
                  ref={childCategory}
                  className={`header__category-child ${
                    car1?.children?.[0]?.parent_id === isOpenCategoryChild.id &&
                    isOpenCategoryChild.isOpen
                      ? "header__category-child-active"
                      : ""
                  }`}
                >
                  <ul className="header__category-child-list">
                    {car1.children.map((car2) => (
                      <li
                        key={car2.id}
                        onClick={() => handleClickModal && handleClickModal()}
                        className={`header__category-child-list-item ${
                          categoryIdActive === car2.name ||
                          +categoryIdActive === car2.id
                            ? "header__category-child-list-item-active"
                            : ""
                        }`}
                      >
                        <Link
                          href={`/shop?category_id=${car2.id}${
                            limit > 12 ? `&limit=${limit}` : ""
                          }`}
                          passHref
                        >
                          <div
                            onClick={handleCategoryItemClick}
                            className="header__category-child-list-item-link cursor-pointer "
                          >
                            <div className="header__category-child-list-item-link-img image-container">
                              <Image
                                src={`${API_URL}${car2.icon}` || companyIcon}
                                alt={car2.name}
                                className="image"
                                layout="fill"
                              />
                            </div>

                            <p> {car2.name}</p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
