import { LogoIcon, UserCircleIcon } from "@/assets"
import Link from "next/link"
import { useState } from "react"
import { AuthModal } from "../auth"
import { BookingModal } from "../form"

export const Header = () => {
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false)
  const [showBookingModal, setShowBookingModal] = useState<boolean>(false)

  return (
    <>
      <header>
        <div className="container">
          <div className="flex items-center">
            <div className="">
              <LogoIcon />
            </div>
            <div className="flex-1 flex justify-center">
              <ul className="flex items-center">
                {[
                  ["Về chúng tôi", "/ve-chung-toi"],
                  ["Hướng dẫn", "/huong-dan"],
                  ["Ưu đãi", "/uu-dai"],
                  ["Tin tức", "/tin-tuc"],
                ].map(([label, path]) => (
                  <li className="mr-[40px] last:mr-0" key={path}>
                    <Link href={path}>
                      <a className="font-semibold text-[16px] leading-[20px]">{label}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center">
              <button onClick={() => setShowBookingModal(true)} className="btn-primary mr-[24px]">
                Đặt xe
              </button>
              <button onClick={() => setShowAuthModal(true)} className="">
                <UserCircleIcon />
              </button>
            </div>
          </div>
        </div>
      </header> 
      {showBookingModal ? <BookingModal onClose={() => setShowBookingModal(false)} /> : null}
      {showAuthModal ? <AuthModal onClose={() => setShowAuthModal(false)} /> : null}
    </>
  )
}
