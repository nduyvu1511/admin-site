import { ImageFileLoading, InputLoading, RegistrationCetificateForm } from "@/components"
import { ScreenContainer } from "@/container"
import { useCertificateInspection } from "@/hooks"
import { CertificateInspectionParams } from "@/models"
import { useRouter } from "next/router"

const RegistrationCertificate = () => {
  const router = useRouter()
  const {
    createCertificateInspection,
    data: certificateInspection,
    isValidating,
    updateCertificateInspection,
  } = useCertificateInspection(true)

  const handleSubmit = (data: CertificateInspectionParams) => {
    if (certificateInspection?.periodical_inspection_certificate_id) {
      updateCertificateInspection({
        params: {
          ...data,
          periodical_inspection_certificate_id:
            certificateInspection.periodical_inspection_certificate_id,
        },
        onSuccess: () => {
          router.push("/register/driver")
        },
      })
    } else {
      createCertificateInspection({
        params: data,
        onSuccess: () => {
          router.push("/register/driver")
        },
      })
    }
  }

  return (
    <ScreenContainer heading="Giấy Đăng Kiểm">
      <div className="content-container px-24">
        {isValidating ? (
          <>
            <ImageFileLoading />
            <ImageFileLoading />
            <InputLoading />
            <InputLoading />
          </>
        ) : (
          <RegistrationCetificateForm
            defaultValues={certificateInspection}
            onSubmit={(data) => handleSubmit(data)}
          />
        )}
      </div>
    </ScreenContainer>
  )
}

export default RegistrationCertificate
