/* eslint-disable @next/next/no-img-element */
import { pageNotFound } from "@/assets"
import { MainLayout } from "@/layout"
import Link from "next/link"

const NotFound = () => {
  return (
    <div className="container not-found">
      <img src={pageNotFound} alt="." />
      <h3>Không tìm thấy trang</h3>
      <Link href="/" passHref>
        <button className="btn-primary">Trở về trang chủ</button>
      </Link>
    </div>
  )
}

NotFound.Layout = MainLayout

export default NotFound
