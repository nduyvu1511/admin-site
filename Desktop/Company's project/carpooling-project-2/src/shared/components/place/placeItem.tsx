import { LocationIcon } from "@/assets"
import Image from "next/image"
import { useRouter } from "next/router"

interface PlaceItemProps {
  placeItem: {
    label: string
    image: any
    path: string
  }
}

export const PlaceItem = ({ placeItem: { image, label, path } }: PlaceItemProps) => {
  const router = useRouter()

  return (
    <div onClick={() => router.push(path)} className="cursor-pointer">
      <div className="mb-[24px]">
        <div className="relative aspect-1 overflow-hidden rounded-[30px] group">
          <Image
            className="select-none transform group-hover:scale-110 transition-all duration-500"
            src={image}
            layout="fill"
            objectFit="cover"
            alt=""
          />
        </div>
      </div>
      <div className="flex justify-start items-center">
        <span className="w-[38px] h-[38px] rounded-[50%] border border-solid border-gray-color-2 flex-center">
          <LocationIcon />
        </span>
        <p className="text-primary text-[28px] font-[500] leading-[34px] ml-[24px]">{label}</p>
      </div>
    </div>
  )
}
