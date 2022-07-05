import { Modal } from "@/components/modal"
import { CompoundingType } from "@/models"
import { useState } from "react"
import { CarpoolingCompoundingForm } from "./carpoolingCompoundingCarForm"
import { OneWayCompoundingForm } from "./oneWayCompoundingCarForm"
import { TwoWayCompoundingForm } from "./twoWayCompoundingCarForm"

interface BookingModalProps {
  onClose: Function
}

const BookingModal = ({ onClose }: BookingModalProps) => {
  const [formType, setFormType] = useState<CompoundingType>("compounding")

  return (
    <Modal className="relative" heading="Đặt xe" onClose={onClose}>
      <div className="bg-white-color px-24 h-[50px]">
        <div className="flex h-full">
          {[
            { label: "Ghép chuyến", value: "compounding" },
            { label: "Một chiều", value: "one_way" },
            { label: "Hai chiều", value: "two_way" },
            { label: "Tiện chuyến", value: "one_way" },
          ].map(({ value, label }, index) => (
            <button
              onClick={() => setFormType(value as CompoundingType)}
              key={index}
              className="mr-[12px] h-full last:mr-[0] font-medium relative"
            >
              {label}
              {formType === value ? (
                <span className="absolute-horizontal w-full h-[1px] bg-gray-color-4 bottom-[0]"></span>
              ) : null}
            </button>
          ))}
        </div>
      </div>
      <div className="px-24 py-12 pb-24 h-full overflow-auto max-h-[530px]">
        {formType === "one_way" ? (
          <OneWayCompoundingForm view="modal" onSubmit={() => {}} />
        ) : formType === "two_way" ? (
          <TwoWayCompoundingForm view="modal" onSubmit={() => {}} />
        ) : (
          <CarpoolingCompoundingForm view="modal" onSubmit={() => {}} />
        )}
      </div>
    </Modal>
  )
}

export { BookingModal }
