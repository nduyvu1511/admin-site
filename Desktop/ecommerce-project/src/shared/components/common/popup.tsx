import { popupImg } from "@/assets"
import Image from "next/image"
import { useState } from "react"
import { RiCloseFill } from "react-icons/ri"
import { Modal } from "../modal"

export const Popup = () => {
  const [isOpen, setOpen] = useState<boolean>(
    () => !sessionStorage.getItem("is_open_popup")
  )

  const handleClose = () => {
    setOpen(false)
    sessionStorage.setItem("is_open_popup", "true")
  }

  return (
    <>
      {isOpen ? (
        <div className="popup-container">
          <Modal
            direction="center"
            isShowModal={isOpen}
            handleClickModal={handleClose}
          >
            <div className="popup">
              <button
                onClick={handleClose}
                className="btn-reset popup-close-btn"
              >
                <RiCloseFill />
              </button>
              <div className="image-container">
                <Image className="image" src={popupImg} alt="" layout="fill" />
              </div>
            </div>
          </Modal>
        </div>
      ) : null}
    </>
  )
}
