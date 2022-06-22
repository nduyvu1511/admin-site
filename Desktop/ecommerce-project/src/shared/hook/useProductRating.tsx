import { RootState } from "@/core/store"
import {
  CommentRating,
  DeleteRatingProps,
  DeleteRatingRes,
  GetRatingsByStarParams,
  PurchasedProduct,
  StarString,
  UpdateRatingPropsWithLineId,
} from "@/models"
import { setMessage, setOpenScreenLoading } from "@/modules"
import { API_URL } from "@/services"
import ratingApi from "@/services/ratingApi"
import { useDispatch, useSelector } from "react-redux"
import useSWR from "swr"

interface RatingSWR {
  data: { data_count: number; data: CommentRating[] }
  error: any
  isValidating: boolean
  deleteCommentRating: (props: DeleteRatingProps, callback: Function) => void
  updateCommentRating: (
    props: UpdateRatingPropsWithLineId,
    callback: Function
  ) => void
  changePage: (params: ChangePageParams) => void
  filterProductRatings: (params: GetRatingsByStarParams, cb?: Function) => void
}

type Type = "purchase" | "product"

interface UseRatingProps {
  shouldFetch: boolean
  product_id?: number
  limit?: number
  type: Type
}

interface ChangePageParams {
  params: {
    offset: number
    hasFilter: boolean
    star_ratings?: StarString[]
  }
  cb: Function
  onError?: Function
}

const useProductRating = ({
  shouldFetch,
  product_id,
  type,
  limit = 12,
}: UseRatingProps): RatingSWR => {
  const dispatch = useDispatch()
  const { token } = useSelector((state: RootState) => state.user)

  const fetcher = async (offset = 0) => {
    try {
      if (type === "purchase") {
        const res: any = await ratingApi.getProductsPurchased({
          token,
          limit,
          offset,
        })
        return res?.result?.data || []
      }

      const res: any = await ratingApi.getRatingsByProduct({
        comment_type: ["rating"],
        product_id: product_id || 0,
        limit,
        offset,
      })

      return res?.result?.data?.rating || []
    } catch (error) {
      console.log(error)
    }

    return []
  }

  const { data, error, isValidating, mutate } = useSWR(
    "product_ratings",
    shouldFetch ? () => fetcher(0) : null,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      dedupingInterval: 1000,
    }
  )

  const filterProductRatings = async (
    params: GetRatingsByStarParams,
    cb?: Function
  ) => {
    try {
      if (!params.star_ratings?.length) {
        const ratings = await fetcher(0)
        cb && cb()
        mutate(ratings || [], false)
        return
      }

      const res: any = await ratingApi.getRatingByStar({ ...params, limit })
      cb && cb()
      mutate(
        {
          data: res?.result?.data?.data || [],
          data_count: res?.result?.data?.data_count || 0,
        },
        false
      )
      return res?.result?.data || { data: [], data_count: 0 }
    } catch (error) {
      console.log(error)
      cb && cb()
    }
    return { data: [], data_count: 0 }
  }

  const changePage = async ({
    cb,
    params: { hasFilter, offset = 0, star_ratings },
    onError,
  }: ChangePageParams) => {
    try {
      const ratings = hasFilter
        ? await filterProductRatings({
            offset: offset * limit,
            product_tmpl_id: product_id || 0,
            star_ratings: star_ratings || [],
          })
        : await fetcher(offset * limit)

      mutate(ratings, false)
      cb()
    } catch (error) {
      onError && onError()
    }
  }

  const deleteCommentRating = async (
    deleteRating: DeleteRatingProps,
    callback: Function
  ) => {
    if (!token) return

    const res: any = await ratingApi.deleteRatingProduct({
      ...deleteRating,
      token,
    })

    if (!res?.result?.success) return

    const comment: DeleteRatingRes = res?.result?.data
    if (comment) {
      mutate(
        {
          ...data,
          data: [...data?.data].map((item: PurchasedProduct) =>
            item.history_line_id === comment.history_line_id
              ? {
                  ...item,
                  comment_rating: {
                    comment_id: false,
                    partner_id: false,
                    partner_name: false,
                    partner_avatar: false,
                    content: false,
                    product_id: { id: false, name: false },
                    id: false,
                    name: false,
                    date: false,
                    editable: false,
                    star_rating: false,
                    star_rating_int: 0,
                    rating_tag: [],
                    attachment_ids: [],
                  },
                }
              : item
          ),
        },
        false
      )

      callback()
      dispatch(setMessage({ title: "Xóa đánh giá thành công" }))
    }
  }

  const updateCommentRating = async (
    commentRating: UpdateRatingPropsWithLineId,
    callback: Function
  ) => {
    if (!token) return
    dispatch(setOpenScreenLoading(true))

    try {
      const res: any = await ratingApi.updateRatingProduct(commentRating)
      dispatch(setOpenScreenLoading(false))
      if (res?.result?.success) {
        const comment_rating: CommentRating = res.result.data?.data?.[0]
        if (!comment_rating) return

        if (type === "product") {
        } else if (type === "purchase") {
          if (!res?.result?.success) return

          mutate(
            {
              ...data.data_count,
              data: [...data.data].map((item: PurchasedProduct) =>
                item.history_line_id === commentRating.history_line_id
                  ? {
                      ...item,
                      comment_rating: {
                        ...comment_rating,
                        content: comment_rating.message,
                        editable: true,
                        image_urls:
                          item?.comment_rating?.image_urls?.length > 0
                            ? item?.comment_rating?.image_urls?.map(
                                (item) => `${API_URL}${item.image_url}`
                              )
                            : [],
                      },
                    }
                  : item
              ),
            },
            true
          )

          callback()
        }

        dispatch(setMessage({ title: "Thêm đánh giá thành công!" }))
      }
    } catch (error) {
      dispatch(setOpenScreenLoading(false))
    }
  }

  return {
    data,
    error,
    isValidating,
    deleteCommentRating,
    updateCommentRating,
    changePage,
    filterProductRatings,
  }
}

export { useProductRating }
