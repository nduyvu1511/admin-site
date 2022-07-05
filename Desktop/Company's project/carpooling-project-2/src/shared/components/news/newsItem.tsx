import { newsImage } from "@/assets"
import Image from "next/image"
import Link from "next/link"
import React from "react"

const NewsItem = () => {
  return (
    <div className="">
      <div className="mb-[24px]">
        <div className="relative aspect-1 overflow-hidden rounded-[30px] group">
          <Image
            className="select-none transform group-hover:scale-110 transition-all duration-500"
            src={newsImage}
            layout="fill"
            objectFit="cover"
            alt=""
          />
        </div>
      </div>

      <div className="">
        <div className="">
          <p className="line-clamp-1 normal-text text-gray-color-3 mb-[8px]">1/12/2022</p>
          <Link href="/">
            <a className="text-[28px] leading-[34px] text-primary font-medium">
              Tham khảo bảng giá bảo hiểm xe các hãng
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export { NewsItem }
