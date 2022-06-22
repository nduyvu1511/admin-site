import { RatingRange, RatingRangePost } from "@/models"
import { useState } from "react"
import { AiFillStar } from "react-icons/ai"

interface IStar {
  count: RatingRange
  edit?: boolean
}

export const Stars = ({ count }: IStar) => {
  const [number, setNumber] = useState<RatingRange | 0>(count)
  const [numberHover, setNumberHover] = useState<RatingRange | 0>(count)
  const handleHover = (index: RatingRangePost) => {
    setNumberHover(index)
  }
  return (
    <p className="star-wrapper">
      {Array.from({ length: 5 }).map((item, index) =>
        count.toFixed(0) > index.toString() ? (
          <span
            onMouseEnter={() => handleHover((index + 1) as RatingRangePost)}
            onClick={() => {
              console.log(index + 1)
            }}
            className="star-icon-wrapper"
          >
            <AiFillStar className="star-icon star-icon-fill" key={index} />
          </span>
        ) : (
          <span
            onMouseEnter={() => handleHover((index + 1) as RatingRangePost)}
            className="star-icon-wrapper"
          >
            <AiFillStar className="star-icon star-icon-outline" key={index} />
          </span>
        )
      )}
    </p>
  )
}
