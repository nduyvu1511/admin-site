import { Breadcrumb, Modal, ModalHeading } from "@/components"
import { AccountOption } from "@/container"
import { RootState } from "@/core/store"
import { BreadcrumbItem } from "@/models"
import { setOpenModalAccountOption } from "@/modules"
import { ReactNode } from "react"
import { RiMenuFill } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { HeaderMobile } from "@/components"

interface AccountContainerProps {
  children: ReactNode
  heading: string
  breadcrumbList: BreadcrumbItem[]
  headerMobileTitle: string
}

export const AccountContainer = (props: AccountContainerProps) => {
  const { children, heading, breadcrumbList, headerMobileTitle } = props

  const dispatch = useDispatch()
  const { isOpenModalOptionAccount } = useSelector(
    (state: RootState) => state.common
  )

  return (
    <>
      <HeaderMobile centerChild={<p>{headerMobileTitle}</p>} />

      <div className="account-container">
        <div className="container">
          <Breadcrumb breadcrumbList={breadcrumbList} />
          <div className="account-wrapper">
            <div className="account__left">
              <AccountOption />
            </div>
            <div className="account__right">
              <section className="account__option-layout">
                <header className="account__option-layout-header">
                  <div>
                    <h3>{heading}</h3>
                  </div>
                  <button
                    onClick={() =>
                      dispatch(
                        setOpenModalAccountOption(!isOpenModalOptionAccount)
                      )
                    }
                    className="btn-reset account__option-menu-btn"
                  >
                    <RiMenuFill />
                  </button>
                </header>
                <div className="account__option-layout-body">{children}</div>
              </section>
            </div>
          </div>
        </div>

        {isOpenModalOptionAccount ? (
          <Modal
            direction="right"
            isShowModal={isOpenModalOptionAccount}
            handleClickModal={() => dispatch(setOpenModalAccountOption(false))}
          >
            <ModalHeading
              title="Account"
              handleClose={() => dispatch(setOpenModalAccountOption(false))}
            />
            <AccountOption />
          </Modal>
        ) : null}
      </div>
    </>
  )
}
