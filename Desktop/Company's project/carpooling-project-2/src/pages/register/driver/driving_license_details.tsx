import { ImageFileLoading, InputLoading } from "@/components"
import DrivingLicenseForm from "@/components/form/driver/drivingLicenseForm"
import { ScreenContainer } from "@/container"
import { useVehicleDrivingLicense } from "@/hooks"
import { DrivingLicenseFormParams } from "@/models"
import { useRouter } from "next/router"

const DrivingLicenseDetail = () => {
  const router = useRouter()
  const {
    data: drivingLicense,
    createVehicleDrivingLicense,
    updateVehicleDrivingLicense,
    isValidating,
  } = useVehicleDrivingLicense(true)

  const handleSubmitForm = (data: DrivingLicenseFormParams) => {
    if (drivingLicense?.car_driving_license_id) {
      updateVehicleDrivingLicense({
        params: {
          ...data,
          car_driving_license_id: drivingLicense.car_driving_license_id,
        },
        onSuccess: () => {
          router.push("/register/driver")
        },
      })
    } else {
      createVehicleDrivingLicense({
        params: data,
        onSuccess: () => {
          router.push("/register/driver")
        },
      })
    }
  }

  return (
    <ScreenContainer heading="Bằng Lái Xe">
      <div className="content-container">
        {!isValidating ? (
          <DrivingLicenseForm
            defaultValues={drivingLicense}
            onSubmit={(data) => handleSubmitForm(data)}
          />
        ) : (
          <>
            <ImageFileLoading />
            <ImageFileLoading />
            <InputLoading />
            <InputLoading />
            <InputLoading />
            <InputLoading />
          </>
        )}
      </div>
    </ScreenContainer>
  )
}

export default DrivingLicenseDetail
