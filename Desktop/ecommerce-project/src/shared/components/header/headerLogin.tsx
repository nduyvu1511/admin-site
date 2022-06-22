import { logo } from "@/assets"
import Image from "next/image"
import Link from "next/link"
import React from "react"

export const HeaderLogin = ({ title }: { title: string }) => {
  return (
    <header className="header__login">
      <div className="header__login-inner">
        <div className="container">
          <div className="header__login-inner-logo">
            <Link href="/" passHref>
              <div className="image-container cursor-pointer">
                <Image src={logo} alt="" className="image" layout="fill" />
              </div>
            </Link>
            <p>{title}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
