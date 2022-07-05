import { ImageFileLoading, InputLoading, VehicleInsuranceForm } from "@/components"
import { ScreenContainer } from "@/container"
import { useVehicleInsurance } from "@/hooks"
import { VehicleInsuranceParams } from "@/models"
import { useRouter } from "next/router"

const VehicleInsurance = () => {
  const router = useRouter()
  const {
    createVehicleInsurance,
    data: vehicleInsurance,
    isValidating,
    updateVehicleInsurance,
  } = useVehicleInsurance(true)

  const handleSubmit = (data: VehicleInsuranceParams) => {
    if (vehicleInsurance?.compulsory_car_insurance_id) {
      updateVehicleInsurance({
        params: {
          ...data,
          compulsory_car_insurance_id: vehicleInsurance.compulsory_car_insurance_id,
        },
        onSuccess: () => {
          router.push("/register/driver")
        },
      })
    } else {
      createVehicleInsurance({
        params: data,
        onSuccess: () => {
          router.push("/register/driver")
        },
      })
    }
  }

  return (
    <ScreenContainer heading="Bảo Hiểm Xe">
      <div className="content-container px-24">
        {isValidating ? (
          <>
            <ImageFileLoading />
            <ImageFileLoading />
            <InputLoading />
            <InputLoading />
            <InputLoading />
          </>
        ) : (
          <VehicleInsuranceForm
            defaultValues={vehicleInsurance}
            onSubmit={(data) => handleSubmit(data)}
          />
        )}
      </div>
    </ScreenContainer>
  )
}

export default VehicleInsurance
