import { ModalContainer } from "@/container"
import { LayoutProps } from "@/models"
import { useDispatch } from "react-redux"

export const LoginLayout = ({ children }: LayoutProps) => {
  const dispatch = useDispatch()

  return (
    <>
      <section className="main__layout">
        <main>{children}</main>
        <ModalContainer />
      </section>
    </>
  )
}
