import { StarEmptyIcon } from "@/assets"
import { RootState } from "@/core/store"
import { Field, Form, Formik } from "formik"
import { useRouter } from "next/router"
import { useRef, useState } from "react"
import { CgSmile } from "react-icons/cg"
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md"
import { useSelector } from "react-redux"
import { useReview } from "shared/hook"
import { messageSchema } from "../../../core/schema"
import { ModalConfirm } from "../modal"
import { ReviewItem } from "./reviewItem"

export const ProductReview = () => {
  const language = "vni"
  const divRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const { currentReviewId } = useSelector((state: RootState) => state.common)

  const {
    data: reviews,
    handleAddReview,
    handleDeleteReview,
  } = useReview({
    shouldFetch: true,
    product_id: Number(router.query.productId) || 0,
  })

  const [isOpenReviewForm, setOpenReviewForm] = useState<boolean>(
    reviews?.length > 0
  )

  const handleAdd = (values: any, onSubmitProps: any) => {
    if (!values?.message) return

    handleAddReview({
      content: values.message,
      product_id: Number(router.query?.productId) || 0,
    })
    onSubmitProps.resetForm()
  }

  return (
    <div ref={divRef} className="product__review">
      <div className="product__review-form">
        <h3
          onClick={() => setOpenReviewForm(!isOpenReviewForm)}
          className="product__review-form-heading"
        >
          {language === "vni" ? "Thêm bình luận" : "Add a review"}
          {isOpenReviewForm ? (
            <MdOutlineKeyboardArrowUp />
          ) : (
            <MdOutlineKeyboardArrowDown />
          )}
        </h3>

        {isOpenReviewForm ? (
          <div className="product__review-form-wrapper">
            <Formik
              initialValues={{
                message: "",
              }}
              validationSchema={messageSchema}
              onSubmit={handleAdd}
            >
              {({ errors, touched, isValid }) => {
                return (
                  <Form className="address__form-body-form">
                    <div className="form-item-inline">
                      <Field
                        className={`form-item-input ${
                          errors.message ? "form-item-input-error" : ""
                        }`}
                        as="textarea"
                        rows={4}
                        id="detailAddress"
                        type="area"
                        placeholder={
                          language === "vni"
                            ? "Mời bạn để lại bình luận..."
                            : "Mời bạn để lại bình luận..."
                        }
                        name="message"
                      />
                      {errors.message && touched.message ? (
                        <p className="form-item-text-error">{errors.message}</p>
                      ) : null}
                    </div>

                    <button
                      type="submit"
                      className={`btn-primary btn-save ${
                        !isValid ? "btn-disabled" : ""
                      }`}
                    >
                      {language === "vni" ? "Thêm" : "Add"}
                    </button>
                  </Form>
                )
              }}
            </Formik>
          </div>
        ) : null}
      </div>

      {reviews?.length === 0 ? (
        <div className="rating-no-rating">
          {StarEmptyIcon}
          <p>Chưa có hỏi đáp nào cho sản phẩm này</p>
        </div>
      ) : null}

      {reviews?.length > 0 ? (
        <ul className="comment__list">
          {reviews.map((comment) => (
            <ReviewItem key={comment.id} comment={comment} />
          ))}
        </ul>
      ) : null}

      <ModalConfirm
        onConfirm={() =>
          handleDeleteReview({
            comment_id: currentReviewId,
            product_id: Number(router.query?.productId) || 0,
          })
        }
      />
    </div>
  )
}
