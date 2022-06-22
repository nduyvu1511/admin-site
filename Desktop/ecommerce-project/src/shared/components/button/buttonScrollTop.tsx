import { RiArrowUpLine } from "react-icons/ri"
import { useScrollTop } from "shared/hook"

export const ButtonScrollTop = () => {
  const height = useScrollTop()

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <>
      {height > 500 ? (
        <button onClick={handleScrollToTop} className="btn__scroll btn-reset">
          <RiArrowUpLine />
        </button>
      ) : null}
    </>
  )
}

export default ButtonScrollTop
