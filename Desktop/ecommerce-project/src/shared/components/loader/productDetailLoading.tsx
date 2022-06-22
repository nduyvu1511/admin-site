export const ProductDetailLoading = () => {
  return (
    <div className="product__detail-loading grid grid-col-1 grid-col-lg-2">
      <div className="product__detail-loading-left">
        <div className="product__detail-loading-item product__detail-loading-image"></div>
        <div className="product__detail-loading-image-list">
          {Array.from({ length: 5 }).map((item, index) => (
            <div
              key={index}
              className={`product__detail-loading-item product__detail-loading-image-list-item ${
                index > 2 ? "product__detail-loading-image-list-item-hide" : ""
              }`}
            ></div>
          ))}
        </div>
      </div>

      <div className="product__detail-loading-right">
        <div className="product__detail-loading-item product__detail-loading-title"></div>
        <div className="product__detail-loading-item product__detail-loading-rating"></div>
        <div className="product__detail-loading-item product__detail-loading-price"></div>
        <div className="product__detail-loading-item product__detail-loading-button"></div>
        <div className="product__detail-loading-item product__detail-loading-tags"></div>
        <div className="product__detail-loading-item product__detail-loading-share"></div>
      </div>
    </div>
  )
}
