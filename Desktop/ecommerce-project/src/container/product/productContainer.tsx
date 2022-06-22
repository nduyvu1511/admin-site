import { ReactNode, useRef } from "react"

interface ProductContainerProps {
  leftChild: ReactNode
  rightChild: ReactNode
}

const ProductContainer = ({ leftChild, rightChild }: ProductContainerProps) => {
  const shopFilterRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <section className="product__container">
        <div ref={shopFilterRef} className="product__container-left">
          {leftChild}
        </div>

        <div className="product__container-separate"></div>

        <div className="product__container-right">{rightChild}</div>
      </section>
    </>
  )
}

export default ProductContainer
