interface CountdownProps {
  days?: number | string
  hours: number | string
  minutes: number | string
  seconds: number | string
}

export const Countdown = ({
  days,
  hours,
  minutes,
  seconds,
}: CountdownProps) => {
  const language = "vni"

  return (
    <div className="product__countdown">
      {days ? (
        <>
          <span className="product__countdown-item">
            {`0${days}`.slice(-2)}
          </span>
          <span className="separate">:</span>
        </>
      ) : null}
      <span className="product__countdown-item">{`0${hours}`.slice(-2)}</span>
      <span className="separate">:</span>
      <span className="product__countdown-item">{`0${minutes}`.slice(-2)}</span>
      <span className="separate">:</span>
      <span className="product__countdown-item">{`0${seconds}`.slice(-2)}</span>
      <p className="product__countdown-remains">
        {language === "vni" ? "thời gian còn lại" : "Remains time"}
      </p>
    </div>
  )
}
