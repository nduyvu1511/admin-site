import { LocationSearchHistory } from "@/models"

interface LocationHistoryItemProps {
  location: LocationSearchHistory
}

const LocationHistoryItem = ({ location }: LocationHistoryItemProps) => {
  return (
    <div className="px-12 py-[8px] cursor-pointer hover:bg-gray-color-1">
      <p className="text-[14px]">{location.address}</p>
    </div>
  )
}

export { LocationHistoryItem }
