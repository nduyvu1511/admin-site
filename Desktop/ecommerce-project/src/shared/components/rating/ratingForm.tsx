/* eslint-disable @next/next/no-img-element */
import {
  AttachmentRes,
  DeleteRatingProps,
  PurchasedProduct,
  RatingRangePost,
  TagRating,
  UpdateRatingProps,
} from "@/models"
import { setMessage, setOpenModalConfirm } from "@/modules"
import { API_URL } from "@/services"
import ratingApi from "@/services/ratingApi"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { AiOutlineCamera } from "react-icons/ai"
import { IoMdClose } from "react-icons/io"
import { useDispatch } from "react-redux"
import { useAttachment, useAuth, useInputText } from "shared/hook"
import { Tag } from "../common"
import { ModalConfirm } from "../modal/modalConfirm"
import { Star } from "../star"

interface RatingFormProps {
  onAddRating: (props: UpdateRatingProps) => void
  purchaseForm: PurchasedProduct
  isShowFooter?: boolean
  onCloseModal?: Function
  onDeleteRating?: (props: DeleteRatingProps) => void
}

export const RatingForm = ({
  onAddRating,
  purchaseForm,
  isShowFooter = true,
  onCloseModal,
  onDeleteRating,
}: RatingFormProps) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { token } = useAuth()

  const { deleteImage, images, getBase64Images, setImages } = useAttachment({
    limit: 5,
    initImages:
      purchaseForm?.comment_rating?.image_urls?.length > 0
        ? purchaseForm.comment_rating.image_urls.map(
            (item) => `${API_URL}${item.image_url}`
          )
        : undefined,
  })

  // Rating input field
  const commentRating = purchaseForm?.comment_rating?.content || ""
  const inputProps = useInputText(
    commentRating.includes("<p>")
      ? commentRating.slice(3, commentRating.length - 4)
      : commentRating
  )

  // Star rating
  const [ratingVal, setRatingVal] = useState<RatingRangePost | undefined>(
    purchaseForm?.comment_rating?.star_rating_int
  )

  // rating tags
  const [ratingTags, setRatingTags] = useState<TagRating[] | undefined>()
  const [ratingTagIds, setRatingTagId] = useState<Array<number> | undefined>(
    () => {
      const ratingTags = purchaseForm?.comment_rating?.rating_tag
      if (!ratingTags || ratingTags?.length === 0) return undefined
      return ratingTags.map((item) => item.tag_id)
    }
  )

  // Rating image ids after upload successfully to server
  const [attachmentIds, setAttachmentIds] = useState<Array<number>>()
  const [ratingImageIdsLoading, setRatingImageIdsLoading] = useState<
    Array<string> | undefined
  >()
  const [ratingImageIds, setRatingImageIds] = useState<Array<number>>()

  // Get rating tags if update
  useEffect(() => {
    if (purchaseForm?.comment_rating?.editable) {
      getRatingTags().then((tags: TagRating[]) => setRatingTags(tags))
    }
  }, [])

  // Functions

  const getRatingTags = async () => {
    const res: any = await ratingApi.getRatingTags({
      product_id: Number(router?.query?.productId) || 0,
    })
    const tags = res?.result
    return tags?.length > 0 ? tags : undefined
  }

  const handleClearRatingForm = () => {
    setImages(undefined)
    setRatingVal(undefined)
    setAttachmentIds(undefined)
    setRatingTagId(undefined)
    setRatingTags(undefined)
    setRatingImageIdsLoading(undefined)
    setRatingImageIds(undefined)
  }

  const handleToggleTag = (tagId: number) => {
    if (!ratingTagIds) {
      setRatingTagId([tagId])
    } else {
      if (ratingTagIds.includes(tagId)) {
        const newTags = [...ratingTagIds].filter((id) => id !== tagId)
        setRatingTagId(newTags?.length > 0 ? newTags : undefined)
      } else {
        setRatingTagId([...ratingTagIds, tagId])
      }
    }
  }

  const handleDeleteCommentRating = () => {
    purchaseForm?.history_line_id &&
      purchaseForm?.product &&
      onDeleteRating &&
      onDeleteRating({
        history_line_id: purchaseForm.history_line_id,
        product_id: purchaseForm.product.product_id,
        token,
      })
  }

  const handleAddRating = () => {
    ratingVal &&
      inputProps.value &&
      onAddRating &&
      onAddRating({
        star_rating: ratingVal,
        content: inputProps.value,
        tag_ids: ratingTagIds || [],
        attachment_ids: attachmentIds || [],
        product_id: purchaseForm?.product.product_id,
        image_ids: ratingImageIds || [],
        token,
      })
  }

  const handleUploadImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !purchaseForm?.product?.product_id) return

    try {
      getBase64Images(e.target.files, async (urls: Array<string>) => {
        setRatingImageIdsLoading(urls)

        const res: any = await ratingApi.createAttachment({
          product_id: purchaseForm.product.product_tmpl_id,
          token,
          attachments: urls.map((url) => ({
            file: url.replace(/^data:image\/\w+;base64,/, ""),
            type: "picture",
          })),
        })

        setRatingImageIdsLoading(undefined)

        const imageIds: AttachmentRes[] = res?.result?.data
        if (imageIds?.length > 0) {
          setAttachmentIds(imageIds.map((item) => item.attachment_id))
          setRatingImageIds(imageIds.map((item) => item.image_id))
        } else {
          dispatch(
            setMessage({
              type: "warning",
              title: "Có lỗi xảy ra, vui lòng chọn lại ảnh",
              direction: "top",
            })
          )
        }
        setRatingImageIdsLoading(undefined)
      })
    } catch (error) {
      setRatingImageIdsLoading(undefined)
    }
  }

  return (
    <>
      <div className="rating__form-container">
        <header className="rating__form-header">
          <div className="rating__form-header-img">
            <img
              src={`${API_URL}${purchaseForm?.product?.image_url?.[0] || ""}`}
              alt=""
            />
          </div>
          <div className="rating__form-header-info">
            <p className="rating__form-header-info-name">
              {purchaseForm?.product?.product_name || ""}
            </p>
            <p className="rating__form-header-info-variant"></p>
          </div>
        </header>

        {/* body */}
        <div className="rating__form">
          <div className="rating__form-star">
            <Star
              initialValue={ratingVal}
              allowHover={false}
              onClick={(val: number) => {
                setRatingVal((val / 20) as RatingRangePost)
                if (!ratingTags) {
                  getRatingTags().then((tags: TagRating[]) =>
                    setRatingTags(tags)
                  )
                }
              }}
              ratingValue={0}
              size={35}
              iconsCount={5}
            />
          </div>

          {ratingVal ? (
            <div className="rating__form-wrapper">
              {ratingTags ? (
                <div className="rating__form-tags">
                  {ratingTags.map((item: TagRating) => (
                    <Tag
                      key={item.tag_id}
                      id={item.tag_id}
                      name={item.tag_content}
                      onChange={() => handleToggleTag(item.tag_id)}
                      isActive={ratingTagIds?.includes(item.tag_id)}
                    />
                  ))}
                </div>
              ) : null}

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleAddRating()
                }}
                className="rating__form-form"
              >
                <textarea
                  {...inputProps}
                  placeholder="Nhập nội dung đánh giá..."
                  rows={4}
                ></textarea>

                {!isShowFooter ? (
                  <button
                    type="submit"
                    className={`btn-primary ${
                      !ratingVal || !inputProps.value ? "btn-disabled" : ""
                    }`}
                  >
                    Thêm đánh giá
                  </button>
                ) : null}
              </form>

              <div className="rating__form-attachment">
                <input
                  onChange={(e) => handleUploadImages(e)}
                  hidden
                  type="file"
                  accept="image/png, image/gif, image/jpeg"
                  multiple
                  id="rating-attachment"
                />
                <label
                  htmlFor="rating-attachment"
                  className={`btn-primary-outline ${
                    images?.length === 5 ||
                    (purchaseForm?.comment_rating?.attachment_ids?.length > 0 &&
                      purchaseForm?.comment_rating?.editable)
                      ? "btn-disabled"
                      : ""
                  }`}
                >
                  <AiOutlineCamera />
                  Thêm hình ảnh
                  <span style={{ marginLeft: "8px" }}>{`${
                    images?.length || 0
                  } / 5`}</span>
                </label>

                {images ? (
                  <div className="rating__form-attachment-image">
                    {images.map((url, index) => (
                      <div
                        key={index}
                        className="rating__form-attachment-image-item"
                      >
                        {/* {purchaseForm?.comment_rating?.attachment_ids
                          ?.length === 0 ? ( */}
                        <span
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteImage(url)
                          }}
                          className="btn-reset rating__form-attachment-image-item-delete"
                        >
                          <IoMdClose />
                        </span>
                        {/* ) : null} */}

                        {/* {ratingImageIdsLoading &&
                        !ratingImageIdsLoading?.includes(url) ? (
                          <span className="rating__form-attachment-image-item-loading">
                            <RiLoader4Fill className="loader" />
                          </span>
                        ) : null} */}

                        <div className="image-container">
                          <Image
                            src={url}
                            alt=""
                            layout="fill"
                            quality={20}
                            className="image"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>

        {isShowFooter ? (
          <footer className="rating__form-footer">
            <button
              onClick={() => {
                handleClearRatingForm()
                onCloseModal && onCloseModal()
              }}
              className="btn-primary"
            >
              Trở lại
            </button>

            {purchaseForm?.comment_rating?.comment_id ? (
              <button
                onClick={() =>
                  dispatch(
                    setOpenModalConfirm({
                      isOpen: true,
                      title: "Nếu đồng ý, bạn sẽ xóa đi đánh giá này",
                    })
                  )
                }
                className="btn-primary rating__form-footer-danger-btn"
              >
                Xóa đánh giá
              </button>
            ) : null}

            <button
              className={`btn-primary ${
                !ratingVal || !inputProps.value ? "btn-disabled" : ""
              }`}
              onClick={handleAddRating}
            >
              Hoàn thành
            </button>
          </footer>
        ) : null}
      </div>

      <ModalConfirm onConfirm={handleDeleteCommentRating} />
    </>
  )
}
