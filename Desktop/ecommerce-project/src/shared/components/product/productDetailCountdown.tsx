import React from "react"
import { useCountdown } from "shared/hook"
import { Countdown } from "../common"

const ProductDetailCountdown = ({ targetDate }: { targetDate: string }) => {
  const [days, hours, minutes, seconds] = useCountdown({ targetDate })

  return (
    <Countdown hours={hours} minutes={minutes} days={days} seconds={seconds} />
  )
}

export default ProductDetailCountdown
