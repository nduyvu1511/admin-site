import Link from "next/link"
import { ReactChild } from "react"
import { CgArrowLongRight } from "react-icons/cg"

interface HomeSlideProductProps {
  children: ReactChild
  path: string
  name: string
  title?: string
  isLoading?: boolean
}

export const HomeSlideProduct = ({
  children,
  path,
  name,
  title,
  isLoading = false,
}: HomeSlideProductProps) => {
  return (
    <section className="home__content-products">
      {!isLoading ? (
        <div className="home__heading">
          <div className="home__heading-text">
            <h3>{name}</h3>
            {title ? <p>{title}</p> : null}
          </div>

          <Link href={path} passHref>
            <span className="home__heading-btn">
              {"Xem tất cả"}
              <CgArrowLongRight />
            </span>
          </Link>
        </div>
      ) : (
        <div className="product__slide__loading-header">
          <div className="product__slide__loading-header-left">
            <div className="product__slide__loading-header-left-title"></div>
            <div className="product__slide__loading-header-left-desc"></div>
          </div>
          <div className="product__slide__loading-header-right"></div>
        </div>
      )}
      {children}
    </section>
  )
}
