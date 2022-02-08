import { ReactNode } from 'react';

export interface IModal {
  children?: ReactNode;
  isShowModal: Boolean;
  handleClickModal: Function;
  direction: 'left' | 'right' | 'center';
  stack?: boolean;
  unsetSize?: boolean;
}

const Modal = ({
  children,
  isShowModal,
  handleClickModal,
  direction,
  stack,
  unsetSize,
}: IModal) => {
  const handleClick = () => {
    handleClickModal && handleClickModal();
  };

  return (
    <>
      <section
        className={`modal modal-${direction} ${
          isShowModal ? 'modal-active' : ''
        } ${stack ? 'modal-stack' : ''} ${unsetSize ? 'modal-size-auto' : ''}`}>
        {children}
      </section>
      <div
        onClick={handleClick}
        className={`overlay ${isShowModal ? 'overlay-active' : ''} ${
          stack ? 'overlay-stack' : ''
        }`}></div>
    </>
  );
};

export default Modal;
