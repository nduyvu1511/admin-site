import { convertBase64 } from "@/helper"
import { setMessage } from "@/modules"
import _ from "lodash"
import { useState } from "react"
import { useDispatch } from "react-redux"

interface UseAttachmentRes {
  getBase64Images: (
    files: FileList,
    callback?: (props: Array<string>) => void
  ) => void
  deleteImage: (props: string) => void
  images: Array<string> | undefined
  setImages: (props: Array<string> | undefined) => void
  deleteImages: (props: Array<string>) => void
}

interface UseAttachmentProps {
  limit: number
  initImages?: Array<string>
}

const useAttachment = (props: UseAttachmentProps): UseAttachmentRes => {
  const { limit, initImages } = props
  const dispatch = useDispatch()

  const [images, setImages] = useState<Array<string> | undefined>(
    initImages && initImages?.length > 0 ? initImages : undefined
  )

  const getBase64Images = async (
    files: FileList,
    callback?: (props: Array<string>) => void,
    handleError?: Function
  ) => {
    try {
      const urls: any = await Promise.all(
        Array.from(files).map(async (item: File) => {
          return await convertBase64(item)
        })
      )

      if (
        limit > 1 &&
        (files?.length > limit ||
          (files?.length || 0) + (images?.length || 0) > limit)
      ) {
        dispatch(
          setMessage({
            title: `Bạn chỉ được chọn tối đa ${limit} ảnh`,
            type: "warning",
            direction: "top",
          })
        )
        return
      }

      if (urls) {
        if (!images) {
          setImages(urls)
          callback && callback(urls)
        } else {
          const newUrls = _.uniq([...urls, ...images])
          setImages(newUrls)
          callback && callback(newUrls)
        }
      } else {
        handleError && handleError()
        dispatch(
          setMessage({
            type: "warning",
            title: "Có lỗi xảy ra, vui lòng chọn lại ảnh",
            direction: "top",
          })
        )
      }
    } catch (error) {
      handleError && handleError()
      console.log(error)
    }
  }

  const deleteImages = (urls: Array<string>) => {
    if (images) {
      const newImages = [...urls].filter((item) =>
        images?.some((x) => x === item)
      )

      setImages(newImages?.length > 0 ? newImages : undefined)
    } else {
      setImages(undefined)
    }
  }

  const deleteImage = (url: string) => {
    if (images) {
      const newImages = [...images].filter((item) => item !== url)
      setImages(newImages?.length > 0 ? newImages : undefined)
    }
  }

  return {
    deleteImage,
    getBase64Images,
    images,
    setImages,
    deleteImages,
  }
}

export { useAttachment }
