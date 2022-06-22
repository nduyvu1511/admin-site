import { toggleHTMLOverflow } from "@/helper"
import { ReactNode, useEffect, useRef, useState } from "react"
import { RiCloseFill } from "react-icons/ri"

export interface IModal {
  children?: ReactNode
  isShowModal?: Boolean
  handleClickModal: Function
  direction: "left" | "right" | "center"
  stack?: boolean
  unsetSize?: boolean
  isShowConfirmModal?: boolean
  heading?: string
  disableOverLay?: boolean
  fullWidth?: boolean
  preventScrolling?: boolean
  disableAnimation?: boolean
}

export const Modal = ({
  children,
  handleClickModal,
  direction,
  stack,
  unsetSize,
  heading,
  isShowConfirmModal,
  fullWidth,
  disableOverLay = false,
  disableAnimation = false,
}: IModal) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    toggleHTMLOverflow("hidden")
    return () => {
      toggleHTMLOverflow("unset")
    }
  }, [])

  useEffect(() => {
    const modal = modalRef.current
    const overlay = overlayRef.current

    modal?.classList.add(`modal-${direction}-active`)
    overlay?.classList.add(`overlay-active`)

    return () => {
      modal?.classList.remove(`modal-${direction}-active`)
      overlay?.classList.remove(`overlay-active`)
    }
  }, [])

  const handleClick = () => {
    handleClickModal && handleClickModal()
  }

  return (
    <>
      <section
        style={{ transition: disableAnimation ? "unset" : "all 0.2s ease" }}
        ref={modalRef}
        className={`modal modal-${direction} ${stack ? "modal-stack" : ""} ${
          unsetSize ? "modal-size-auto" : ""
        } ${fullWidth ? "modal-full" : ""}`}
      >
        {heading ? (
          <header className="modal__header">
            <h3 className="modal__header-heading">{heading}</h3>
            <button onClick={handleClick} className="btn-reset">
              <RiCloseFill />
            </button>
          </header>
        ) : null}
        {children}
      </section>

      <div
        ref={overlayRef}
        style={{ transition: disableAnimation ? "unset" : "all 0.2s ease" }}
        onClick={() => !disableOverLay && handleClick()}
        className={`overlay ${stack ? "overlay-stack" : ""} ${
          isShowConfirmModal || disableOverLay ? "overlay-disabled" : ""
        } `}
      ></div>
    </>
  )
}
