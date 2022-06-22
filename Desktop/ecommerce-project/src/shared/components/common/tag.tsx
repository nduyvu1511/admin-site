import React, { useState } from "react"

interface TagProps {
  name: string
  id: number
  onChange?: (id?: number) => void
  size?: "sm" | "md" | "lg"
  disabled?: boolean
  isActive?: boolean
}

export const Tag = ({
  name,
  onChange,
  id,
  size = "lg",
  disabled = false,
  isActive = false,
}: TagProps) => {
  const [active, setActive] = useState<boolean>(isActive)

  const handleOnClick = () => {
    if (active) {
      setActive(false)
      onChange && onChange()
    } else {
      setActive(true)
      onChange && onChange(id)
    }
  }
  return (
    <span
      onClick={handleOnClick}
      className={`tag ${active ? "tag-active" : ""} tag-${size} ${
        disabled ? "tag-disabled" : ""
      }`}
    >
      {name}
    </span>
  )
}
