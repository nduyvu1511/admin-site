import { RiCloseFill } from 'react-icons/ri';
import { IoIosCloseCircleOutline } from 'react-icons/io';

interface ModalConfirmProps {
  title: string;
  handleClose: Function;
  handleConfirm: Function;
  isShowModal: boolean;
}

const ModalConfirm = ({
  title,
  handleClose,
  isShowModal,
  handleConfirm,
}: ModalConfirmProps) => {
  return (
    <>
      {isShowModal ? (
        <>
          <div className="fixed w-96 h-96 z-[2001] rounded-[10px] p-6 bg-white dark:bg-dark-bg-opacity transform left-1/2 top-[30%] -translate-y-1/2 -translate-x-1/2 fade-in">
            <div className="flex flex-col justify-between h-full">
              <header className="flex items-center justify-end">
                <button onClick={() => handleClose()}>
                  <RiCloseFill className="text-2xl dark:text-dark-text text-light-text" />
                </button>
              </header>

              <div className="flex-1 flex flex-col items-center py-6">
                <IoIosCloseCircleOutline className="text-7xl text-red-400 mb-3" />
                <div className="text-center px-6">
                  <h3 className="mr-4 flex-1 text-2xl font-normal dark:text-dark-text text-light-text mb-3">
                    Are you sure?
                  </h3>
                  <p className="text-[15px] font-normal dark:text-dark-text text-light-text leading-5">
                    {title}
                  </p>
                </div>
              </div>

              <footer className="flex items-center justify-center">
                <button
                  onClick={() => handleClose()}
                  className="btn-primary bg-slate-400 font-semibold text-sm">
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleClose();
                    handleConfirm();
                  }}
                  className="btn-primary ml-4 bg-red-400 font-semibold text-sm">
                  Delete
                </button>
              </footer>
            </div>
          </div>
          <div className="fixed z-[2000] inset-0 bg-black-03 fade-in"></div>
        </>
      ) : null}
    </>
  );
};

export default ModalConfirm;
