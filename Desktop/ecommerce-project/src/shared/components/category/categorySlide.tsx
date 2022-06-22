import { Category } from "@/models"
import Link from "next/link"
import React, { useRef, useState } from "react"
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md"

interface CategoryHeaderProps {
  categories: Category[]
}

export const CategorySlide = ({ categories }: CategoryHeaderProps) => {
  const [index, setIndex] = useState<number>(0)
  const categItemRef = useRef<HTMLLIElement>(null)
  const categListRef = useRef<HTMLUListElement>(null)

  return (
    <div className="category__slide">
      {index > 0 ? (
        <button
          onClick={() => index > 0 && setIndex(index - 1)}
          className="btn-reset category__slide-btn category__slide-btn-left"
        >
          <MdArrowBackIos />
        </button>
      ) : null}

      <ul
        ref={categListRef}
        style={{ transform: `translateX(-${index * 100}%)` }}
        className="category__slide-list"
      >
        {categories.map((item, index) => (
          <>
            <li
              ref={categItemRef}
              key={index}
              className="category__slide-list-item"
            >
              <Link href={`/category/${item.id}`}>
                <a>{item.name}</a>
              </Link>
            </li>
          </>
        ))}
      </ul>

      {index * 6 <= categories.length ? (
        <button
          onClick={() => setIndex(index + 1)}
          className="btn-reset category__slide-btn category__slide-btn-right"
        >
          <MdArrowForwardIos />
        </button>
      ) : null}
    </div>
  )
}
