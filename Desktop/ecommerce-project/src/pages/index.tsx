import { avatar as avatarBlank } from "@/assets"
import {
  CategoryItem,
  HeaderMobile,
  HomeCategory,
  navMobileLinks,
  Popup,
} from "@/components"
import {
  MainBanner,
  MainContent,
  ProductSaleContainer,
  SecondaryBanner,
} from "@/container"
import { MainLayout } from "@/layout"
import { setOpenCartModal } from "@/modules"
import { API_URL } from "@/services"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { AiOutlineUser } from "react-icons/ai"
import { BiCart } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { useCartOrder, useCategory, useWishlist } from "shared/hook"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { RootState } from "../core"

// export async function getStaticProps() {
//   return {
//     revalidate: 10,
//   }
// }

const Home = () => {
  useWishlist(true)
  const { data: categories } = useCategory(true)
  const { carts } = useCartOrder()
  const router = useRouter()
  const dispatch = useDispatch()
  const { token, userInfo: { avatar = "" } = { userInfo: undefined } } =
    useSelector((state: RootState) => state.user)

  return (
    <>
      <HeaderMobile
        showSearchInput
        rightChild={
          <>
            {token ? (
              <Link passHref href="/account">
                <div className="image-container">
                  <Image
                    src={avatar ? `${API_URL}${avatar}` : avatarBlank}
                    alt=""
                    layout="fill"
                    className="image"
                    objectFit="cover"
                  />
                </div>
              </Link>
            ) : (
              <button
                onClick={() => router.push(`/${token ? "account" : "login"}`)}
                className="btn-reset header__main-top-actions-icon-mobile"
              >
                <AiOutlineUser />
              </button>
            )}

            <button
              onClick={() => dispatch(setOpenCartModal(true))}
              className="btn-reset header__main-top-actions-icon-mobile"
            >
              <BiCart />
              <span className="cart__quantity-absolute">{carts.length}</span>
            </button>
          </>
        }
      />

      <section className="home">
        {/* <div className="container">
          <CategorySlide categories={categories} />
        </div> */}
        <div className="category__slide"></div>

        <div className="container">
          <MainBanner />
        </div>

        {/* saleProduct */}
        <ProductSaleContainer />

        <div className="container">
          <HomeCategory />
        </div>

        <div className="container">
          <SecondaryBanner />
        </div>

        {/* Content */}
        <div className="container">
          <MainContent />
        </div>

        <br />

        {/* Category */}
        <div className="container">
          <div className="home__category">
            <ul className="home__category-list grid grid-col-2 grid-col-sm-3 grid-col-md-4 grid-col-lg-6 grid-col-xl-8">
              {categories.map(
                (cate) =>
                  cate.icon && <CategoryItem key={cate.id} category={cate} />
              )}
            </ul>
          </div>
        </div>
      </section>

      <div className="nav__mobile">
        <ul className="nav__mobile-list">
          {navMobileLinks.map((nav) => (
            <li
              key={nav.id}
              onClick={() =>
                nav.onClick
                  ? dispatch(nav.onClick && nav.onClick(true))
                  : router.push(nav.id)
              }
              className="nav__mobile-list-item"
            >
              {nav.icon}
              <p>{nav.name}</p>
            </li>
          ))}
        </ul>
      </div>

      <Popup />

      {/* <a href="tel:0909099580" className="btn-primary btn-call">
        <FiPhoneCall />
      </a> */}
    </>
  )
}

Home.Layout = MainLayout

export default Home
