/* eslint-disable @next/next/no-img-element */
import { Modal, Pagination, RatingForm } from "@/components"
import { AccountContainer } from "@/container"
import { formatMoneyVND } from "@/helper"
import { MainAuthLayout } from "@/layout"
import { PurchasedProduct } from "@/models"
import { API_URL } from "@/services"
import Link from "next/link"
import React, { useRef, useState } from "react"
import { CgSmileNone } from "react-icons/cg"
import { RiLoader4Line } from "react-icons/ri"
import { useProductRating } from "shared/hook"

const LIMIT = 12

const Purchase = () => {
  const purchaseListRef = useRef<HTMLUListElement>(null)
  const [purchase, setPurchase] = useState<PurchasedProduct | undefined>()
  const {
    data: rating,
    isValidating,
    updateCommentRating,
    deleteCommentRating,
    changePage,
  } = useProductRating({ shouldFetch: true, type: "purchase", limit: LIMIT })

  const [offset, setOffset] = useState<number>(0)

  const handleChangePage = (_offset: number) => {
    changePage({
      params: { offset: _offset, hasFilter: false },
      cb: () => {
        purchaseListRef.current?.scrollIntoView({ behavior: "smooth" })
        setOffset(_offset)
      },
    })
  }

  return (
    <>
      <AccountContainer
        headerMobileTitle="Đơn mua"
        breadcrumbList={[
          { path: "/account", name: "Tài khoản" },
          { name: "Đơn mua", path: "" },
        ]}
        heading="Danh sách đơn mua"
      >
        {isValidating ? (
          <div className="loader-container">
            <RiLoader4Line className="loader" />
          </div>
        ) : rating?.data?.length === 0 ? (
          <div className="list--empty">
            <CgSmileNone />
            <p>Bạn chưa hoàn thành đơn hàng nào </p>
          </div>
        ) : null}

        {!isValidating && rating?.data?.length > 0 ? (
          <ul ref={purchaseListRef} className="purchase__list">
            {(rating.data as any).map(
              (item: PurchasedProduct, index: number) => (
                <li key={index} className="purchase__list-item">
                  <div className="purchase__item">
                    <div className="purchase__item-top">
                      <div className="purchase__item-avatar">
                        <Link
                          passHref
                          href={`/product/${item.product.product_tmpl_id}`}
                        >
                          <img
                            className="cursor-pointer"
                            src={`${API_URL}${
                              item?.product.image_url?.[0] || ""
                            }`}
                            alt=""
                          />
                        </Link>
                      </div>

                      <div className="purchase__item-content">
                        <Link href={`/product/${item.product.product_tmpl_id}`}>
                          <a className="purchase__item-content-name">
                            {item.product.product_name}
                          </a>
                        </Link>
                        <div className="purchase__item-content-qty">
                          Số lượng: <span>{item.product.qty_product}</span>
                          <p>x {formatMoneyVND(item.product.price_unit)}</p>
                        </div>
                      </div>

                      <div className="purchase__item-price">
                        <p>{formatMoneyVND(item.product.price_unit)}</p>
                      </div>
                    </div>

                    <div className="purchase__item-middle">
                      <p className="purchase__item-total-price">
                        Tổng tiền:
                        <span>
                          {formatMoneyVND(item.product?.amount_total || 0)}
                        </span>
                      </p>
                    </div>

                    <div className="purchase__item-actions">
                      <button className="btn-primary">Mua lại</button>
                      <button
                        onClick={() => setPurchase(item)}
                        className="btn-primary-outline"
                      >
                        {item?.comment_rating?.editable
                          ? "Xem đánh giá của bạn"
                          : "Đánh giá"}{" "}
                      </button>
                    </div>
                  </div>
                </li>
              )
            )}
          </ul>
        ) : null}

        {(rating?.data_count || 0) > LIMIT ? (
          <div className="product__rating-pagination">
            <Pagination
              totalPage={Math.ceil(rating?.data_count / LIMIT)}
              currentOffset={offset}
              onPaginate={(_offset: number) => handleChangePage(_offset)}
            />
          </div>
        ) : null}
      </AccountContainer>

      <section className="purchase__modal">
        {purchase ? (
          <Modal
            isShowModal={!!purchase?.history_line_id}
            direction="center"
            heading={
              purchase?.comment_rating?.editable
                ? "Chỉnh sửa đánh giá sản phẩm"
                : "Đánh giá sản phẩm"
            }
            disableOverLay={true}
            handleClickModal={() => setPurchase(undefined)}
          >
            <div className="rating__form-wrapper">
              <RatingForm
                onCloseModal={() => setPurchase(undefined)}
                onAddRating={(ratingComment) => {
                  updateCommentRating(
                    {
                      ...ratingComment,
                      history_line_id: purchase.history_line_id,
                    },
                    () => {
                      setPurchase(undefined)
                    }
                  )
                }}
                purchaseForm={purchase}
                onDeleteRating={(deleteForm) =>
                  deleteCommentRating(deleteForm, () => {
                    setPurchase(undefined)
                  })
                }
              />
            </div>
          </Modal>
        ) : null}
      </section>
    </>
  )
}

Purchase.Layout = MainAuthLayout

export default Purchase
