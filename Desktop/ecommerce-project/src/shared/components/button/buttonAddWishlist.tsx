import { isArrayHasValue } from "@/helper"
import { Product } from "@/models"
import { useState } from "react"
import { BiLoaderCircle } from "react-icons/bi"
import { BsFillHeartFill } from "react-icons/bs"
import { useWishlist } from "shared/hook"

interface ButtonWishlistProps {
  product: Product
}

const ButtonWishlist = ({ product }: ButtonWishlistProps) => {
  const { toggleWishlist } = useWishlist(false)
  const { data: wishlists = [] } = useWishlist(false)
  const [currentId, setCurrentId] = useState<number>()

  const handleAddToWishlist = () => {
    if (currentId) return
    setCurrentId(product.product_tmpl_id)
    toggleWishlist(
      product,
      () => {
        setCurrentId(0)
      },
      () => {
        setCurrentId(0)
      }
    )
  }

  return (
    <>
      <button onClick={handleAddToWishlist} className="product__intro-sub-item">
        {currentId === product.product_tmpl_id ? (
          <BiLoaderCircle className="loader" />
        ) : (
          <BsFillHeartFill
            style={{
              fill:
                isArrayHasValue(wishlists) &&
                wishlists?.some(
                  (item) => item.product_id === product.product_tmpl_id
                )
                  ? "#dc3545"
                  : "#cacaca",
            }}
          />
        )}
      </button>
    </>
  )
}

export default ButtonWishlist
