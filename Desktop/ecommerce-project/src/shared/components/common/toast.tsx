import { RootState } from "@/core/store"
import { setMessage } from "@/modules"
import React, { useEffect, useState } from "react"
import { BsCheckCircleFill } from "react-icons/bs"
import {
  RiCloseCircleFill,
  RiErrorWarningFill,
  RiInformationFill,
} from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"

export const Toast = () => {
  const dispatch = useDispatch()
  // const [key, setKey] = useState<number>()

  const {
    message: { isOpen, title, duration, type, direction },
  } = useSelector((state: RootState) => state.common)

  useEffect(() => {
    let handler: any
    if (isOpen) {
      handler = setTimeout(() => {
        dispatch(setMessage({ isOpen: false, title: "" }))
      }, duration)
      // setKey(Number(handler))
    }

    return () => {
      clearTimeout(handler)
    }
  }, [isOpen])

  return (
    <>
      {isOpen && title ? (
        <div
          onClick={() => dispatch(setMessage({ isOpen: false, title: "" }))}
          className={`message ${direction === "top" ? "message-top" : ""} ${
            direction === "bottom" ? "message-bottom" : ""
          }`}
        >
          {type === "info" ? (
            <RiInformationFill className="message-icon message-icon-info" />
          ) : null}

          {type === "danger" ? (
            <RiCloseCircleFill className="message-icon message-icon-danger" />
          ) : null}

          {type === "warning" ? (
            <RiErrorWarningFill className="message-icon message-icon-warning" />
          ) : null}

          {type === "success" ? (
            <BsCheckCircleFill className="message-icon message-icon-success" />
          ) : null}

          <p className="message-title">{title}</p>
        </div>
      ) : null}
    </>
  )
}
