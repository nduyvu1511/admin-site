import { BreadcrumbItem } from "@/models"
import Link from "next/link"
import { RiArrowRightSLine } from "react-icons/ri"

interface BreadcrumbProps {
  breadcrumbList: BreadcrumbItem[]
}

export const Breadcrumb = ({ breadcrumbList }: BreadcrumbProps) => {
  return (
    <div className="breadcrumb">
      <ul className="breadcrumb__list">
        <li className="breadcrumb__list-item">
          <Link href="/">
            <a className="cursor-pointer breadcrumb__list-item-title">
              Trang chủ
            </a>
          </Link>
          <RiArrowRightSLine className="breadcrumb__list-item-icon" />
        </li>

        {breadcrumbList?.length > 0 &&
          breadcrumbList.map(
            (item, index) =>
              item.name && (
                <li key={index} className="breadcrumb__list-item">
                  <Link href={item.path}>
                    <a
                      className={`breadcrumb__list-item-title ${
                        index === breadcrumbList.length - 1
                          ? "breadcrumb__list-item-title-active"
                          : ""
                      }`}
                    >
                      {item.name}
                    </a>
                  </Link>
                  {index < breadcrumbList.length - 1 ? (
                    <RiArrowRightSLine className="breadcrumb__list-item-icon" />
                  ) : null}
                </li>
              )
          )}
      </ul>
    </div>
  )
}
