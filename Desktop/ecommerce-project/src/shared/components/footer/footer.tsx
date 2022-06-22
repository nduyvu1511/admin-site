/* eslint-disable @next/next/no-img-element */
import {
  appStoreIcon,
  boCongThuong,
  googlePlayIcon,
  paymentMethodsImage
} from "@/assets"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { IoLocationOutline } from "react-icons/io5"
import {
  RiFacebookCircleFill,
  RiGlobalLine,
  RiYoutubeFill
} from "react-icons/ri"

export const Footer = () => {
  const router = useRouter()

  return (
    <footer
      style={{
        marginBottom:
          router.pathname === "/" || router.pathname === "/product/[productId]"
            ? 60
            : 0,
      }}
      className="footer"
    >
      {/* <div className="footer__top-wrapper">
        <div className="container">
          <div className="footer__top">
            <HiOutlineMailOpen />
            <div className="footer__top-text">
              <p>Đăng ký nhận bản tin Womart</p>
              <p>Đừng bỏ lỡ hàng ngàn sản phẩm và chương trình siêu hấp dẫn</p>
            </div>
            <div className="footer__top-input">
              <input placeholder="Địa chỉ email của bạn" type="text" />
              <button className="btn-primary">Đăng ký</button>
            </div>
          </div>
        </div>
      </div> */}
      <div className="footer__body">
        <div className="container">
          <ul className="footer__body-list grid grid-col-1 grid-col-sm-2 grid-col-md-3 grid-col-lg-4 grid-col-xl-5">
            <li className="footer__body-list-item">
              <h3 className="footer__body-list-item-heading">
                HỖ TRỢ KHÁCH HÀNG
              </h3>
              <Link href="/return-policy">
                <a className="footer__body-list-item-title">
                  Các câu hỏi thường gặp
                </a>
              </Link>
              <Link href="/return-policy">
                <a className="footer__body-list-item-title">
                  Gửi yêu cầu hỗ trợ
                </a>
              </Link>
              <Link href="/return-policy">
                <a className="footer__body-list-item-title">
                  Hướng dẫn đặt hàng
                </a>
              </Link>
              <Link href="/return-policy">
                <a className="footer__body-list-item-title">
                  Phương thức vận chuyển
                </a>
              </Link>
              <Link href="/return-policy">
                <a className="footer__body-list-item-title">
                  Chính sách đổi trả
                </a>
              </Link>

              <Link href="/return-policy">
                <a className="footer__body-list-item-title">
                  Chính sách hàng nhập khẩu
                </a>
              </Link>

              <Link href="/return-policy">
                <a className="footer__body-list-item-title">
                  Báo lỗi bảo mật: security@womart.vn
                </a>
              </Link>
            </li>

            <li className="footer__body-list-item">
              <h3 className="footer__body-list-item-heading">VỀ WOMART</h3>
              <Link href="/privacy-policy">
                <a className="footer__body-list-item-title">Tuyển Dụng</a>
              </Link>
              <Link href="/privacy-policy">
                <a className="footer__body-list-item-title">
                  Chính sách bảo mật thanh toán
                </a>
              </Link>
              <Link href="/privacy-policy">
                <a className="footer__body-list-item-title">
                  Chính sách bảo mật thông tin cá nhân
                </a>
              </Link>
              <Link href="/privacy-policy">
                <a className="footer__body-list-item-title">
                  Chính sách giải quyết khiếu nại
                </a>
              </Link>
              <Link href="/privacy-policy">
                <a className="footer__body-list-item-title">
                  Bán hàng doanh nghiệp
                </a>
              </Link>
            </li>
            <li className="footer__body-list-item">
              <h3 className="footer__body-list-item-heading">
                HỢP TÁC VÀ LIÊN KẾT
              </h3>
              <Link href="/return-policy">
                <a className="footer__body-list-item-title">
                  Quy chế hoạt động Sàn GDTMĐT
                </a>
              </Link>
              <Link href="/return-policy">
                <a className="footer__body-list-item-title">
                  Bán hàng cùng Womart
                </a>
              </Link>
            </li>
            <li className="footer__body-list-item">
              <h3 className="footer__body-list-item-heading">
                PHƯƠNG THỨC THANH TOÁN
              </h3>
              <img className="img-fluid" src={paymentMethodsImage} alt="" />
            </li>
            <li className="footer__body-list-item">
              <h3 className="footer__body-list-item-heading">
                KẾT NỐI VỚI CHÚNG TÔI
              </h3>

              <div className="footer__body-icon-wrapper">
                <a href="https://www.facebook.com/satavancom">
                  <RiFacebookCircleFill />
                </a>
                <a href="https://www.youtube.com/channel/UCiiDiJ6Zmuwdhvej9XFvEFA">
                  <RiYoutubeFill />
                </a>
                <a href="https://satavan.com">
                  <RiGlobalLine />
                </a>
              </div>

              <div className="footer__main-contact-right">
                <h3 className="footer__body-list-item-heading footer__main-contact-right-heading">
                  Tải Ứng dụng trên điện thoại{" "}
                </h3>
                <div className="footer__body-image-wrapper">
                  <a href="https://play.google.com/store/apps/details?id=com.satavan.app">
                    <div className="image-container image-wrapper-item">
                      <Image
                        src={googlePlayIcon}
                        alt=""
                        layout="fill"
                        className="image"
                      />
                    </div>
                  </a>
                  <a href="https://play.google.com/store/apps/details?id=com.satavan.app">
                    <div className="image-container image-wrapper-item image-wrapper-last">
                      <Image
                        src={appStoreIcon}
                        alt=""
                        layout="fill"
                        className="image"
                      />
                    </div>
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom-wrapper">
        <div className="footer__body-address-wrapper">
          <div className="container">
            <div className="footer__body-address">
              <div className="footer__body-address-icon">
                <IoLocationOutline />
              </div>
              <div className="footer__body-address-info">
                <p>
                  <strong>Địa chỉ văn phòng:</strong> 1004B Âu Cơ, Phường Hòa
                  Thạnh, Quận Tân Phú, Tp. HCM.
                </p>
                {/* <p>
                <strong>Số điện thoại: </strong>
                096 737 0333
              </p>
              <p>
                <strong>Email: </strong>
                happyfood@hunghau.vn
              </p> */}
                <p>
                  Womart nhận đặt hàng trực tuyến và giao hàng tận nơi, chưa hỗ
                  trợ mua và nhận hàng trực tiếp tại văn phòng hoặc trung tâm xử
                  lý đơn hàng
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="footer__bottom">
            <div className="footer__bottom-left">
              <h4>© 2022 - Bản quyền của Công Ty Cổ Phần Womart - Womart.vn</h4>
              <p>
                Giấy chứng nhận Đăng ký Kinh doanh số 0309532909 do Sở Kế hoạch
                và Đầu tư Thành phố Hồ Chí Minh cấp ngày 06/01/2010
              </p>
            </div>
            <div className="footer__bottom-right">
              <img className="img-fluid" src={boCongThuong} alt="" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
