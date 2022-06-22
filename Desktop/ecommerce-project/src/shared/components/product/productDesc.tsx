import React, { useRef, useState } from "react"

export const ProductDesc = ({ desc }: { desc: string }) => {
  const [show, setShow] = useState<boolean>(false)
  const divRef = useRef<HTMLDivElement>(null)

  const shouldShow = show && (divRef.current?.clientHeight || 0 > 500)
  const height = divRef.current?.clientHeight || 500

  return (
    <div className="product__detail-desc">
      <div
        ref={divRef}
        className={`product__detail-desc-content ${
          shouldShow ? "" : "product__detail-desc-content-hide"
        }`}
      >
        <div className="product__tab-content-text">
          <div
            style={{ overflow: "hidden" }}
            className="product__tab-content-desc"
            dangerouslySetInnerHTML={{
              __html: desc || "",
            }}
          ></div>

          {!desc ? <p>Không có mô tả nào cho sản phẩm này</p> : null}
        </div>

        {!show ? <div className="gradient"></div> : null}
      </div>

      <button onClick={() => setShow(!show)} className="btn-primary-outline">
        {shouldShow || 0 > 500 ? "Ẩn bớt nội dung" : "Xem thêm nội dung"}
      </button>
    </div>
  )
}
