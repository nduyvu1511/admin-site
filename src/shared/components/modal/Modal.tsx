import { ReactNode } from 'react';
import { RiCloseFill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { toggleModalConfirm } from '../../../modules/modal/modalSlice';

export interface IModal {
  children?: ReactNode;
  isShowModal: Boolean;
  handleClickModal: Function;
  direction: 'left' | 'right' | 'center';
  stack?: boolean;
  heading?: string;
  unsetSize?: boolean;

  isShowModalConfirm?: boolean;
}

const Modal = ({
  children,
  isShowModal,
  handleClickModal,
  isShowModalConfirm,
  unsetSize,
  direction,
  stack,
  heading,
}: IModal) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    !isShowModalConfirm ? handleClickModal() : dispatch(toggleModalConfirm());
  };

  return (
    <>
      <>
        <section
          className={`modal-show fixed z-[2002] transform ${
            stack ? 'z-[2003]' : ''
          } 
          ${
            direction === 'center'
              ? `max-h-[90vh] left-1/2 top-1/2 -translate-x-1/2 
              -translate-y-1/2 animate-[slide-down]`
              : `w-[300px] h-screen inset-0 transition-all duration-300 ${
                  isShowModal ? 'translate-x-0' : '-translate-x-full'
                }`
          } ${
            unsetSize && direction === 'center'
              ? 'w-auto'
              : 'w-[96vw] md:w-[90vw] lg:w-[50vw]'
          }`}>
          {/* modal content */}

          <div
            className={`${
              direction === 'center' ? 'max-h-[90vh]' : 'h-screen'
            } overflow-y-auto shadow-2xl border border-solid border-black-01 dark:border-white-01 ${
              direction === 'center'
                ? 'px-4 py-3 md:px-8 md:py-6 lg:px-16 lg:py-6 rounded-xl'
                : 'px-4 py-3'
            } bg-white dark:bg-dark-bg-opacity text-light-text dark:text-dark-text`}>
            {heading ? (
              <header className="flex items-center justify-between pt-4 py-8">
                <h1 className="text-lg md:text-2xl font-semibold ">
                  {heading}
                </h1>
                <button
                  className="dark:bg-dark-bg-opacity dark:bg-light-bg bg-slate-100 w-9 h-9 rounded-[50%] flex items-center justify-center"
                  onClick={handleClick}>
                  <RiCloseFill className="text-2xl text-light-text dark:text-dark-text" />
                </button>
              </header>
            ) : null}

            {children}
          </div>
        </section>

        {isShowModal ? (
          <div
            onClick={handleClick}
            className={`fade-in fixed inset-0 z-[2001] cursor-pointer bg-modal-bg transition-all duration-300  ${
              stack ? 'z-[2002]' : ''
            }`}></div>
        ) : null}
      </>
    </>
  );
};

export default Modal;
