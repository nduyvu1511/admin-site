import React from "react"

export const CategoryLoading = ({ length = 10 }) => {
  return (
    <div className="category__loading">
      <div className="category__loading-header"></div>
      {Array.from({ length }).map((_, index) => (
        <div key={index} className="category__loading-item">
          <div className="category__loading-item-img"></div>
          <div className="category__loading-item-name"></div>
        </div>
      ))}
    </div>
  )
}
