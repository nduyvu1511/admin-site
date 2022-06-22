import React, { useEffect, useRef, useState } from "react"
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import { useClickOutside, useDebounce } from "shared/hook"

interface QuantityInput {
  quantity: number
  onChangeQuantity?: Function
  disabled?: boolean
}

export const InputQuantity = ({
  quantity,
  onChangeQuantity,
  disabled,
}: QuantityInput) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputQuantity, setInputQuantity] = useState<number>(quantity)
  const [triggerName, setTriggerName] = useState<"input" | "button">()
  const qty = useDebounce(inputQuantity, 500)
  const secondRef = useRef<boolean>(false)

  useEffect(() => {
    if (triggerName === "button") return

    if (secondRef.current) {
      onChangeQuantity && onChangeQuantity(qty)
    } else {
      secondRef.current = true
    }
    if (qty === 0) {
      setInputQuantity(1)
    }
  }, [qty])

  useEffect(() => {
    setInputQuantity(quantity)
  }, [quantity])

  useClickOutside([inputRef], () => {
    if (inputQuantity <= 0) {
      setInputQuantity(1)
      onChangeQuantity && onChangeQuantity(1)
    }
  })

  const handleChangeQuantity = (type: String) => {
    setTriggerName("button")
    switch (type) {
      case "Descrease":
        if (inputQuantity > 1) {
          setInputQuantity(inputQuantity - 1)
          onChangeQuantity && onChangeQuantity(inputQuantity - 1)
        }
        break
      case "Increase":
        setInputQuantity((prev) => prev + 1)
        onChangeQuantity && onChangeQuantity(inputQuantity + 1)
        break
    }
  }

  const updateQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    const re = /^[0-9\b]+$/

    if (value === "" || re.test(value)) {
      setTriggerName("input")
      setInputQuantity(+value)
    }
  }

  return (
    <div
      className={`input__quantity ${
        disabled ? "input__quantity-disabled" : ""
      }`}
    >
      <button
        onClick={() => handleChangeQuantity("Descrease")}
        className={`input__quantity-btn input__quantity-minus ${
          quantity === 1 ? "opacity-50 btn-disabled" : ""
        }`}
      >
        <AiOutlineMinus />
      </button>
      <input
        ref={inputRef}
        className="input__quantity-input"
        type="number"
        value={inputQuantity}
        onChange={updateQuantity}
        min={1}
      />
      <button
        onClick={() => handleChangeQuantity("Increase")}
        className="input__quantity-btn input__quantity-plus"
      >
        <AiOutlinePlus />
      </button>
    </div>
  )
}
