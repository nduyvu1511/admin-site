import { companyIcon } from "@/assets"
import { Category } from "@/models"
import { API_URL } from "@/services"
import Image from "next/image"
import Link from "next/link"

export const CategoryItem = ({ category }: { category: Category }) => {
  return (
    <li key={category.id} className="category__item">
      <Link passHref href={`/category/${category.id}`}>
        <div className="cursor-pointer category__item-wrapper">
          <div className="image-container">
            <Image
              layout="fill"
              className="image"
              src={category.icon ? `${API_URL}${category.icon}` : companyIcon}
              alt=""
            />
          </div>
          <p className="category__item-link-name">{category.name}</p>
        </div>
      </Link>
    </li>
  )
}
