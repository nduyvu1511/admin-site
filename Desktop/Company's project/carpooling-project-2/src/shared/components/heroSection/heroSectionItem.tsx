import React, { ReactNode } from "react"

interface HeroSectionItemProps {
  icon: ReactNode
  label: string
  desc: string
  reverse?: boolean
}

export const HeroSectionItem = ({ icon, desc, label, reverse = false }: HeroSectionItemProps) => {
  return (
    <div className={`flex items-center ${reverse ? "flex-row-reverse" : "flex-row"}`}>
      <div className="flex-center flex-1">{icon}</div>
      <div className="w-[60px]"></div>
      <div className="flex-1">
        <h2 className="text-primary font-medium text-[40px] leading-[48px] mb-[40px]">{label}</h2>
        <p className="font-normal text-[16px] leading-[26px]">{desc}</p>
      </div>
    </div>
  )
}

