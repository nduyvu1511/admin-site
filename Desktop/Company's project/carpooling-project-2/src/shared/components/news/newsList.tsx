import React from "react"
import { NewsItem } from "./newsItem"

const NewsList = () => {
  return (
    <div className="grid grid-cols-3 gap-[60px]">
      <div className="">
        <NewsItem />
      </div>
      <div className="">
        <NewsItem />
      </div>
      <div className="">
        <NewsItem />
      </div>
    </div>
  )
}

export { NewsList }
