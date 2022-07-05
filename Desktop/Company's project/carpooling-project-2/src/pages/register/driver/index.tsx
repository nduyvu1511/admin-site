import { ArrowRightIcon, CheckCircleIcon, LogoIcon } from "@/assets"
import { ModalConfirm } from "@/components"
import { driverFormFields, isObjectHasValue } from "@/helper"
import { useFetchFilledDriverFormFields } from "@/hooks"
import { FilledDataFieldsKey } from "@/models"
import { useRouter } from "next/router"
import { useMemo } from "react"
import { useDispatch } from "react-redux"
import { notify } from "reapop"

const DriverInfo = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { data } = useFetchFilledDriverFormFields()

  const filledDataLength = useMemo(() => {
    if (!data || !isObjectHasValue(data)) return 0

    return (
      Object.keys(data).reduce((a, b) => a + (data?.[b as FilledDataFieldsKey] ? 1 : 0), 0) || 0
    )
  }, [data])

  const isFilledAllData = useMemo(() => {
    return filledDataLength === Object.keys(data || {}).length
  }, [data, filledDataLength])

  const handleCreateDriverForm = () => {
    if (!isFilledAllData) {
      dispatch(notify("Vui lòng nhập đầy đủ thông tin để tiếp tục", "warning"))
      return
    }
  }

  // useEffect(() => {
  //   if (!router?.query) return
  //   if (router.query?.type === "register") {
  //     if (!verifiedRegisterToken || !carAccountType) {
  //       router.push("/register")
  //     }
  //   } else {
  //     if (!token) router.push("/")
  //   }
  // }, [token, verifiedRegisterToken, router, carAccountType])

  // useEffect(() => {
  //   if (!verifiedRegisterToken) return
  //   if (!router?.query || router.query?.type !== "register") return
  //   if (!token) {
  //     dispatch(setToken(verifiedRegisterToken))
  //   }
  // }, [router, verifiedRegisterToken, token, dispatch])

  return (
    <div className="">
      <ModalConfirm />
      <div className="content-container">
        <div className="">
          <LogoIcon />
          <p className="driver__page-header-desc text-16 font-semibold leading-[24px]">
            Vui lòng hoàn thành toàn bộ thông tin sau đăng ký để bắt đầu lái xe
          </p>
        </div>

        <div className="bg-gray-color-1 w-full h-[7px] rounded-[8px] my-[40px] relative overflow-hidden">
          <div
            style={{
              width: (filledDataLength / Object.keys(data || {}).length) * 100 + "%",
            }}
            className="absolute h-full left-[0] bg-success"
          ></div>
        </div>

        <div className="">
          {driverFormFields.map((parent, index) => (
            <div key={index} className="driver__page-body-item">
              <ul className="driver__body-list">
                {parent?.child?.length > 0 &&
                  parent.child.map((child, index) => (
                    <li
                      onClick={() => router.push(`/register/driver/${child.route}`)}
                      key={index}
                      className="flex items-center justify-between cursor-pointer py-[14px] text-16 font-semibold leading-[22px]"
                    >
                      <p className="text-gray-color-4">{child.label}</p>
                      <p
                        className={`flex items-center text-warning ${
                          data?.[child.name] ? "text-success" : ""
                        }
                        } ${!child.isRequired ? "driver__body-list-item-noti-no-required" : ""}`}
                      >
                        {data?.[child.name]
                          ? "Hoàn thành"
                          : child.isRequired
                          ? "Bắt đầu ngay"
                          : "Không băt buộc"}
                        {data?.[child.name] ? (
                          <CheckCircleIcon className="ml-[16px]" />
                        ) : (
                          <ArrowRightIcon className="ml-[16px] w-[20] h-[20]" />
                        )}
                      </p>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex-center mt-[40px]">
          <button
            onClick={handleCreateDriverForm}
            className={`btn-primary ${!isFilledAllData ? "btn-not-allowed" : ""}`}
          >
            Gửi hồ sơ
          </button>
        </div>
      </div>
    </div>
  )
}

export default DriverInfo
