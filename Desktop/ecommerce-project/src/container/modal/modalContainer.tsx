import { logo } from "@/assets"
import {
  AddressForm,
  CartModal,
  CategoryMobile,
  CompareModal,
  ImageShow,
  LoginForm,
  Modal,
  ModalHeading,
  ModalProductDetail,
  Navigation,
  OTP,
  PromotionModal,
  ScreenLoading,
  SearchForm,
  SearchResult,
  Toast,
} from "@/components"
import { RootState } from "@/core/store"
import {
  setOpenModalAddressForm,
  setOpenCartModal,
  setOpenCategoryModal,
  setOpenLoginModal,
  setOpenNavLeftModal,
  setOpenOtpLoginModal,
  setOpenSearchModal,
} from "@/modules"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { BiArrowBack } from "react-icons/bi"
import { IoCloseCircleSharp } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux"

export const ModalContainer = () => {
  const dispatch = useDispatch()
  const { product } = useSelector((state: RootState) => state.product)
  const {
    isOpenModalProduct,
    isOpenCartModal,
    isOpenSearchModal,
    isOpenCategoryModal,
    isOpenNavLeftModal,
    isOpenScreenLoading,
    isOpenAddressForm,
    isOpenModalCoupons,
    isOpenOtpLoginModal,
    isOpenLoginSMSModal,
    isOpenLoginModal,
    previewImageUrl,
  } = useSelector((state: RootState) => state.common)
  const { isShowCompareModal } = useSelector(
    (state: RootState) => state.compare
  )

  return (
    <section className="modal__container">
      {isShowCompareModal ? (
        <div className="modal__container-compare">
          <CompareModal isShowModal={isShowCompareModal} />
        </div>
      ) : null}

      {isOpenModalProduct && product ? <ModalProductDetail /> : null}

      {isOpenCartModal ? (
        <Modal
          isShowModal={isOpenCartModal}
          handleClickModal={() => dispatch(setOpenCartModal(false))}
          direction="right"
        >
          <div className="cart__modal-wrapper">
            <ModalHeading
              handleClose={() => dispatch(setOpenCartModal(false))}
              title="Giỏ Hàng"
            />
            <CartModal />
          </div>
        </Modal>
      ) : null}

      {isOpenNavLeftModal ? (
        <Modal
          isShowModal={isOpenNavLeftModal}
          handleClickModal={() => dispatch(setOpenNavLeftModal(false))}
          direction="left"
        >
          <div className="menu__mobile">
            <header className="menu__mobile-header">
              <Link passHref href="/">
                <div onClick={() => dispatch(setOpenNavLeftModal(false))}>
                  <div className="image-container menu__mobile-header-img">
                    <Image src={logo} alt="" layout="fill" className="image" />
                  </div>
                </div>
              </Link>
              <button
                onClick={() => dispatch(setOpenNavLeftModal(false))}
                className="btn-reset"
              >
                <IoCloseCircleSharp />
              </button>
            </header>
            {/* <CategoryDropdown /> */}
            <Navigation
              handleClickModal={() => dispatch(setOpenNavLeftModal(false))}
            />
          </div>
        </Modal>
      ) : null}

      {isOpenCategoryModal ? (
        <Modal
          direction="right"
          isShowModal={isOpenCategoryModal}
          handleClickModal={() => {
            dispatch(setOpenCategoryModal(false))
          }}
        >
          <ModalHeading
            handleClose={() => dispatch(setOpenCategoryModal(false))}
            title="Danh mục"
          />
          <CategoryMobile />
        </Modal>
      ) : null}

      {/* Search Mobile */}
      {isOpenSearchModal ? (
        <Modal
          fullWidth
          direction="right"
          disableAnimation
          isShowModal={true}
          handleClickModal={() => dispatch(setOpenSearchModal(false))}
        >
          <div className="nav__mobile-search-wrapper">
            <div className="search__mobile-modal">
              <button
                onClick={() => dispatch(setOpenSearchModal(false))}
                className="btn-reset search__mobile-modal-btn-back"
              >
                <BiArrowBack />
              </button>
              <SearchForm type="mobile" />
            </div>

            <div className="search__result-sm">
              <SearchResult isCloseModal={true} />
            </div>
          </div>
        </Modal>
      ) : null}

      {isOpenAddressForm ? (
        <div className="modal__address">
          <Modal
            unsetSize={true}
            disableOverLay={true}
            direction="center"
            isShowModal={true}
            heading={"Địa chỉ mới"}
            isShowConfirmModal={true}
            handleClickModal={() => dispatch(setOpenModalAddressForm(false))}
          >
            <AddressForm />
          </Modal>
        </div>
      ) : null}

      <Toast />

      {isOpenModalCoupons ? (
        <div className="promotion__modal-container">
          <PromotionModal />
        </div>
      ) : null}

      {isOpenOtpLoginModal ? (
        <div className="modal__otp-container">
          <Modal
            disableAnimation
            unsetSize
            disableOverLay
            direction="center"
            handleClickModal={() => dispatch(setOpenOtpLoginModal(false))}
          >
            <OTP view="modal" type="updatePhoneNumber" />
          </Modal>
        </div>
      ) : null}

      {isOpenLoginSMSModal ? (
        <div className="modal__otp-container">
          <Modal
            disableAnimation
            unsetSize
            disableOverLay
            direction="center"
            handleClickModal={() => dispatch(setOpenOtpLoginModal(false))}
          >
            <OTP view="modal" type="login" />
          </Modal>
        </div>
      ) : null}

      {isOpenLoginModal ? (
        <div className="modal__otp-container">
          <Modal
            unsetSize
            disableAnimation
            disableOverLay
            direction="center"
            handleClickModal={() => dispatch(setOpenLoginModal(false))}
          >
            <LoginForm view="modal" />
          </Modal>
        </div>
      ) : null}

      {isOpenScreenLoading ? <ScreenLoading /> : null}

      {previewImageUrl ? <ImageShow url={previewImageUrl} /> : null}
    </section>
  )
}
