import { RiCloseLine } from "react-icons/ri"

export const ModalHeading = ({
  title,
  handleClose,
}: {
  title: string
  handleClose?: Function
}) => {
  return (
    <header className="menu__modal-heading">
      {handleClose && (
        <button
          onClick={() => handleClose && handleClose()}
          className="btn-reset menu__modal-heading-close"
        >
          <RiCloseLine />
        </button>
      )}
      <p>{title}</p>
    </header>
  )
}
