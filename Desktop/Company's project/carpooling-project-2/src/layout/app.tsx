import { SpinnerLoading } from "@/components"
import { RootState } from "@/core"
import { useProfile } from "@/hooks"
import { VehicleTypeParams } from "@/models"
import { setProvinces, setVehicleTypes } from "@/modules"
import { addressApi, vehicleApi } from "@/services"
import { ReactNode, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import NotificationsSystem, { atalhoTheme, dismissNotification, setUpNotifications } from "reapop"

const App = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch()
  const notifications = useSelector((state: RootState) => state.notifications)
  const { vehicleTypes, provinces } = useSelector((state: RootState) => state.compoundingCarData)
  useProfile(true)

  useEffect(() => {
    setUpNotifications({
      defaultProps: {
        position: "top-center",
        dismissible: true,
        dismissAfter: 3000,
        status: "success",
      },
    })

    if (!provinces?.length) {
      addressApi
        .getProvinces()
        .then((res: any) => {
          dispatch(setProvinces(res?.result?.data || []))
        })
        .catch((err) => console.log(err))
    }

    if (!vehicleTypes?.length) {
      vehicleApi
        .getCarTypes()
        .then((res: any) => {
          dispatch(
            setVehicleTypes(
              (res?.result?.data || []).map((item: VehicleTypeParams) => ({
                label: item.name,
                value: item.car_id,
                number_seat: item.number_seat,
              }))
            )
          )
        })
        .catch((err) => console.log(err))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {children}
      <SpinnerLoading />
      <NotificationsSystem
        notifications={notifications}
        dismissNotification={(id) => dispatch(dismissNotification(id))}
        theme={atalhoTheme}
      />
    </>
  )
}

export { App }
