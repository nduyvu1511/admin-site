import React from "react"

interface BoxGridLoading {
  length: number
  col?: number
  height: number
}

export const BoxGridLoading = ({
  length,
  col = 2,
  height = 200,
}: BoxGridLoading) => {
  return (
    <div className={`box__loading grid grid-col-1 grid-col-lg-${col}`}>
      {Array.from({ length }).map((_, index) => (
        <div
          style={{ height: `${height}px` }}
          key={index}
          className="box__loading-item"
        ></div>
      ))}
    </div>
  )
}
