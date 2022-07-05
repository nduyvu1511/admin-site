import { LayoutProps } from "@/models/common"
import { App } from "./app"

export const EmptyLayout = ({ children }: LayoutProps) => {
  return <App>{children}</App>
}
