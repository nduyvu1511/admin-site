import { Star } from "../star"

interface RatingCountProps {
  star: number
  starQuantity: number
  totalQuantity: number
}

export const RatingCount = ({
  star,
  starQuantity,
  totalQuantity,
}: RatingCountProps) => {

  return (
    <div className="rating__count">
      <Star ratingValue={star * 20} readonly size={13} allowHalfIcon />
      <div className="rating__count-wrapper">
        <div
          style={{ width: `${(starQuantity / totalQuantity) * 100}%` }}
          className="rating__count-value"
        ></div>
      </div>
      <span className="rating__count-count">{starQuantity}</span>
    </div>
  )
}
