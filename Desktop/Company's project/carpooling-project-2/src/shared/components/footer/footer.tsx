import { BCTIcon, LogoIcon } from "@/assets"
import Link from "next/link"
import React from "react"

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="grid grid-cols-4">
          <div className="cursor-pointer">
            <Link passHref href="/">
              <div className="cursor-pointer">
                <LogoIcon />
                <span className="text-16 font-semibold text-primary leading-[20px]">
                  Đặt xe đường dài
                </span>
              </div>
            </Link>
          </div>

          {[
            {
              heading: "Hỗ trợ",
              child: [
                { label: "Câu hỏi thường gặp", path: "/" },
                { label: "Quy chế hoạt động", path: "/" },
                { label: "Điều khoản sử dụng", path: "/" },
                { label: "Chính sách bảo mật", path: "/" },
              ],
            },
            {
              heading: "Khách hàng",
              child: [
                { label: "Tải ứng dụng Customer", path: "/" },
                { label: "Thông tin mới nhất", path: "/" },
                { label: "Vận chuyển", path: "/" },
              ],
            },
            {
              heading: "Tài xế",
              child: [
                { label: "Tải ứng dụng Driver", path: "/" },
                { label: "Hướng dẫn đăng ký", path: "/" },
                { label: "Chương trình thưởng", path: "/" },
                { label: "Chương trình đặc biệt", path: "/" },
              ],
            },
          ].map((item, index) => (
            <div key={index} className="">
              <p className="font-[700] mb-[24px] text-gray-color-4 leading-[26px] text-16">
                {item.heading}
              </p>
              <ul>
                {item.child.map((item, index) => (
                  <li className="mb-[12px] last:mb-0" key={index}>
                    <Link href={item.path}>
                      <a className="font-[400] text-gray-color-4 leading-[26px] text-16">
                        {item.label}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="my-[48px]"></div>

        <div className="">
          <div className="mb-24">
            <Link href="/">
              <a className="text-16 font-bold text-gray-color-4 leading-">Exxe.vn</a>
            </Link>
          </div>

          <div className="flex items-center mb-24">
            <div className="flex-1">
              <div className="">
                <p className="text-16 leading-26 text-gray-color-4 font-normal">
                  Địa chỉ: Số 45, ngõ 94, phố Ngọc Khánh, Phường Giảng Võ, Quận Ba Đình, TP. Hà Nội.
                  Số đăng ký kinh doanh: 0109832983. Ngày cấp: 25/11/2021. Nơi cấp: Sở Kế hoạch và
                  đầu tư Hà Nội
                </p>
              </div>
            </div>

            <div className="">
              <BCTIcon />
            </div>
          </div>

          <div className="flex lg:items-center lg:justify-between flex-col lg:flex-row">
            <div className="">
              <p className="font-normal leading-24 text-16 text-gray-color-4">
                © 2022 Công ty Cổ Phần Exxe.Vn
              </p>
            </div>

            <div className="flex items-center">
              <Link href="/">
                <a className="mr-24 text-16 leading-24 text-gray-color-4 font-normal">
                  Privacy policy
                </a>
              </Link>

              <Link href="/">
                <a className="text-16 leading-24 text-gray-color-4 font-normal">
                  Term & Conditions
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
