import { toggleShowCompareModal } from "@/modules"
import { useDispatch } from "react-redux"
import { ModalHeading } from "../heading"
import { Modal } from "../modal"
import { Compare } from "./compare"

export const CompareModal = ({ isShowModal }: { isShowModal: boolean }) => {
  const dispatch = useDispatch()

  return (
    <Modal
      isShowModal={true}
      handleClickModal={() => dispatch(toggleShowCompareModal(false))}
      direction="center"
    >
      <ModalHeading
        handleClose={() => dispatch(toggleShowCompareModal(false))}
        title="So Sánh"
      />
      <div className="compare-modal">
        <Compare />
      </div>
    </Modal>
  )
}
