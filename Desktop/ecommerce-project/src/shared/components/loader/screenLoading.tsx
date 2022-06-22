import { toggleHTMLOverflow } from "@/helper"
import React, { useEffect } from "react"
import { BiLoaderAlt } from "react-icons/bi"

export const ScreenLoading = () => {
  useEffect(() => {
    toggleHTMLOverflow("hidden")

    return () => {
      toggleHTMLOverflow("unset")
    }
  }, [])

  return (
    <div className="screen__loading">
      <span>
        <BiLoaderAlt className="loader" />
      </span>
    </div>
  )
}
