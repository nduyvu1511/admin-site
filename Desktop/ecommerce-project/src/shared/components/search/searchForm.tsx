import { RootState } from "@/core/store"
import { convertViToEn } from "@/helper"
import { setKeyword, toggleSearchResult } from "@/modules"
import { useRouter } from "next/router"
import React, { memo, useEffect, useRef, useState } from "react"
import { IoCloseCircle } from "react-icons/io5"
import { RiSearchLine } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { useProduct } from "shared/hook"
import useDebounce from "shared/hook/useDebounce"

interface SearchFormProps {
  type?: "header" | "mobile"
  readonly?: boolean
}

export const SearchForm = memo(function SearchFormChild({
  readonly = false,
  type,
}: SearchFormProps) {
  const language = "vni"
  const dispatch = useDispatch()
  const router = useRouter()
  const secondRef = useRef<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState<string>(
    (router.query?.keyword || "") as string
  )

  const { handleSearchProduct, clearSearchResult } = useProduct({
    key: "products_search",
  })

  const {
    search: { keyword },
  } = useSelector((state: RootState) => state.product)
  const valueSearchTerm: string = useDebounce(value, 500)

  useEffect(() => {
    if (secondRef.current) {
      if (valueSearchTerm) {
        handleSearchProduct(convertViToEn(valueSearchTerm.toLowerCase().trim()))
        dispatch(setKeyword(valueSearchTerm))
      } else {
        clearSearchResult()
        dispatch(setKeyword(""))
      }
    } else {
      secondRef.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueSearchTerm, dispatch])

  const handleSubmit = () => {
    if (!value) return
    dispatch(toggleSearchResult(false))
    router.push({
      pathname: `/products/search?keyword=${value}`,
      query: {
        ...router.query,
        keyword: value,
        category_id: null,
        offset: 0,
      },
    })
  }

  useEffect(() => {
    type === "mobile" && inputRef.current?.focus()
  }, [])

  useEffect(() => {
    return () => {
      keyword && dispatch(setKeyword(""))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
      className="header__search-form"
    >
      <input
        readOnly={readonly}
        ref={inputRef}
        onFocus={() => !readonly && dispatch(toggleSearchResult(true))}
        onClick={() => !readonly && dispatch(toggleSearchResult(true))}
        className="header__search-input"
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
        }}
        placeholder={`${
          language === "vni" ? "Tìm kiếm sản phẩm..." : "Search for products..."
        }`}
      />

      <span
        onClick={() => setValue("")}
        className={`btn-reset header__search-input-clear ${
          value ? "header__search-input-clear-active" : ""
        }`}
      >
        <IoCloseCircle />
      </span>
      <button onClick={handleSubmit} className="btn-reset header__search-btn">
        <RiSearchLine />
      </button>
    </form>
  )
})
