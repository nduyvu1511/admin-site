import { RootState } from "@/core/store"
import { Comment } from "@/models"
import { setCurrentReviewId, setOpenModalConfirm } from "@/modules"
import { API_URL } from "@/services"
import Image from "next/image"
import { BiTrash } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { avatar } from "../../assets"

interface CommentItemProps {
  comment: Comment
}

export const ReviewItem = ({ comment }: CommentItemProps) => {
  const dispatch = useDispatch()
  const { userInfo: { id = 0 } = { userInfo: undefined } } = useSelector(
    (state: RootState) => state.user
  )

  return (
    <>
      <li className="comment__list-item">
        <div className="comment__list-item-img image-container">
          <Image
            src={comment?.avatar ? `${API_URL}${comment.avatar}` : avatar}
            alt=""
            layout="fill"
            className="image"
          />
        </div>
        <div className="comment__list-item-content">
          <p className="comment__list-item-content-info">
            <span className="comment__list-item-content-info-author">
              {comment.partner_name}
            </span>
            <span className="comment__list-item-content-info-date">
              {comment.date}
            </span>
          </p>
          <div
            className="comment__list-item-content-comment"
            dangerouslySetInnerHTML={{ __html: comment.message }}
          ></div>
        </div>

        {comment.partner_id === id ? (
          <button
            onClick={() => {
              dispatch(
                setOpenModalConfirm({
                  isOpen: true,
                  title: "Bạn có chắc chắn muốn xóa bình luận này?",
                })
              )
              dispatch(setCurrentReviewId(comment.id))
            }}
            className="btn-reset comment__list-item-delete"
          >
            <BiTrash />
          </button>
        ) : null}
      </li>
    </>
  )
}
