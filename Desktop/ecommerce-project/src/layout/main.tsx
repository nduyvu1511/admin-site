import { Footer, Header } from "@/components"
import { ModalContainer } from "@/container"
import ChatContainer from "@/container/chat/chatContainer"
import { LayoutProps } from "@/models"
import { App } from "./app"

export const MainLayout = ({ children }: LayoutProps) => {
  return (
    <App>
      <section className="main__layout">
        <Header />
        <main>{children}</main>
        <Footer />
        <ModalContainer />
        <ChatContainer />
      </section>
    </App>
  )
}
