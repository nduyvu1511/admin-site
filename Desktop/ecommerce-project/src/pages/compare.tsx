import { Breadcrumb, Compare as CompareChild } from "@/components"
import { MainLayout } from "@/layout"
import { HeaderMobile } from "@/components"

const Compare = () => {
  return (
    <>
      <HeaderMobile centerChild={<p>So sánh</p>} />
      <div className="container">
        <Breadcrumb breadcrumbList={[{ name: "So sánh", path: "" }]} />
        <CompareChild type="page" />
      </div>
    </>
  )
}
Compare.Layout = MainLayout

export default Compare
