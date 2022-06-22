/* eslint-disable @next/next/no-img-element */
import { imageBlur } from "@/assets"
import { setPreviewImageUrl } from "@/modules"
import Image from "next/image"
import React from "react"
import { HiOutlineMinusSm, HiOutlinePlusSm } from "react-icons/hi"
import { MdOutlineClose } from "react-icons/md"
import { RiCloseLine } from "react-icons/ri"
import { useDispatch } from "react-redux"
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch"

interface ImageShowProps {
  url: string
}

export const ImageShow = ({ url }: ImageShowProps) => {
  const dispatch = useDispatch()
  return (
    <div className="image__show">
      <div className="image__show-container">
        <TransformWrapper
          initialScale={1}
          initialPositionX={0}
          initialPositionY={0}
        >
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <>
              <div className="tools">
                <button onClick={() => zoomIn()}>
                  <HiOutlinePlusSm />
                </button>
                <button onClick={() => zoomOut()}>
                  <HiOutlineMinusSm />
                </button>
                <button onClick={() => resetTransform()}>
                  <RiCloseLine />
                </button>
              </div>
              <TransformComponent>
                <Image
                  className="image-container"
                  src={url}
                  layout="fill"
                  alt=""
                  blurDataURL={imageBlur}
                  quality={100}
                  objectFit="contain"
                ></Image>
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </div>
      <div
        onClick={() => dispatch(setPreviewImageUrl(undefined))}
        className="image__show-overlay"
      >
        <MdOutlineClose className="image__show-overlay-icon" />
      </div>
    </div>
  )
}
