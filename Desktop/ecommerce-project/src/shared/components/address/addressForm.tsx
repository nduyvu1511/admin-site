import { UserAddressSchema } from "@/core/schema"
import { RootState } from "@/core/store"
import { isObjectHasValue } from "@/helper"
import { AddressAdd, AddressId, ShippingAddress, WardAddress } from "@/models"
import { setAddressForm, setMessage, setOpenModalAddressForm } from "@/modules"
import { Field, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useAddress, useUserAddress } from "shared/hook"
import { Dropdown } from "../common"

interface AddForm {
  street: string
  phone: string
  name: string
}

export const AddressForm = () => {
  const language = "vni"
  const dispatch = useDispatch()
  const { addAddress } = useUserAddress(false)
  const { addressForm } = useSelector((state: RootState) => state.common)
  const { userInfo: { id: partner_id = 0 } = { userInfo: undefined }, token } =
    useSelector((state: RootState) => state.user)

  // Get Address from custom hook
  const {
    districts,
    getDistricts,
    getWards,
    states,
    wards,
    clearWards,
    clearAddressList,
    setDistricts,
  } = useAddress()

  // Local State
  const [state, setState] = useState<AddressId | undefined>(() =>
    addressForm
      ? { id: addressForm.state_name_id, name: addressForm.state_id }
      : undefined
  )
  const [district, setDistrict] = useState<AddressId | undefined>(() =>
    addressForm
      ? { id: addressForm.district_name_id, name: addressForm.district_id }
      : undefined
  )
  const [ward, setWard] = useState<WardAddress | undefined>(() =>
    addressForm
      ? ({
          country_id: addressForm.country_name_id,
          country_name: addressForm.country_id,
          district_id: addressForm.district_name_id,
          district_name: addressForm.district_id,
          state_id: addressForm.state_name_id,
          state_name: addressForm.state_id,
          id: addressForm.ward_name_id,
          name: addressForm.ward_id,
        } as WardAddress)
      : undefined
  )

  useEffect(() => {
    if (addressForm) {
      if (typeof addressForm.state_name_id === "number") {
        getDistricts(addressForm.state_name_id)
      }
      if (typeof addressForm.district_name_id === "number") {
        getWards(addressForm.district_name_id)
      }
    }

    return () => {
      if (addressForm) dispatch(setAddressForm(undefined))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  console.log(districts)
  const handleSelectState = (address: AddressId) => {
    setState(address)
    getDistricts(address.id)

    if (state?.id) {
      if (state.id !== address.id) {
        setDistricts([])
        dispatch(
          setMessage({
            title: "Vui lòng chọn lại Quận / Huyện",
            type: "warning",
            direction: "top",
          })
        )
        if (district) {
          setDistrict(undefined)
        }
        if (ward) {
          setWard(undefined)
          clearWards()
        }
      }
    }
  }

  const handleSelectDistrict = (district: AddressId) => {
    getWards(district.id)
    setDistrict(district)

    if (ward) {
      if (ward.district_id !== district.id) {
        dispatch(
          setMessage({
            title: "Vui lòng chọn lại Phường / Xã",
            type: "warning",
            direction: "top",
          })
        )
        setWard(undefined)
      }
    }
  }

  const handleAddAddress = (info: AddForm) => {
    if (!ward) {
      dispatch(
        setMessage({
          type: "warning",
          title: "Vui lòng chọn lại địa chỉ",
          direction: "top",
        })
      )
      return
    }

    const newAddress: AddressAdd = {
      partner_id,
      token,
      adress_id: addressForm?.id || false,
      address_new: {
        ...info,
        state_id: ward.state_id,
        district_id: ward.district_id,
        ward_id: ward.id,
        country_id: ward.country_id,
      },
    }

    const addressRes: ShippingAddress = {
      ...info,
      full_adress: `${info.street}, ${ward.name}, ${ward.district_name},
               ${ward.state_name}, ${ward.country_name}`,
      country_name_id: ward.country_id,
      id: addressForm?.id || 0,
      country_id: ward.country_name,
      district_name_id: ward?.district_id,
      district_id: ward?.district_name,
      state_name_id: ward?.state_id,
      state_id: ward?.state_name,
      ward_id: ward.name,
      ward_name_id: ward.id,
    }

    addAddress({ address: newAddress, addressForm: addressRes }).then(() => {
      dispatch(setOpenModalAddressForm(false))
      clearAddressList()
      setAddressForm(undefined)
    })
  }

  return (
    <section className="address__form">
      <div className="address__form-body">
        <Formik
          initialValues={{
            phone: addressForm ? addressForm?.phone : "",
            name: addressForm ? addressForm?.name : "",
            street: addressForm ? addressForm.street + "" : "",
          }}
          validationSchema={UserAddressSchema}
          onSubmit={handleAddAddress}
        >
          {({ errors, touched, isValid }) => (
            <Form className="address__form-body-form">
              <div className="address__form-body-form-two">
                <div className="form-item">
                  <Field
                    className={`form-item-input ${
                      errors.name && touched.name ? "form-item-input-error" : ""
                    }`}
                    id="userName"
                    type="text"
                    placeholder={language === "vni" ? "Họ & Tên" : "Full name"}
                    name="name"
                  />
                  {errors.name && touched.name ? (
                    <p className="form-item-text-error">{errors.name}</p>
                  ) : null}
                </div>

                <div className="form-item">
                  <Field
                    className={`form-item-input ${
                      errors.phone && touched.phone
                        ? "form-item-input-error"
                        : ""
                    }`}
                    id="phoneNumber"
                    type="text"
                    placeholder={
                      language === "vni" ? "Số điện thoại" : "Phone number"
                    }
                    name="phone"
                  />
                  {errors.phone && touched.phone ? (
                    <p className="form-item-text-error">{errors.phone}</p>
                  ) : null}
                </div>
              </div>

              <div className="form-item-inline form-item-inline-dropdown">
                <Dropdown
                  hasSearchInput={true}
                  titleProp="Tỉnh / Thành phố"
                  list={states || [{ id: 1, name: "Tỉnh / Thành Phố" }]}
                  maxHeight={35}
                  itemActiveProps={
                    addressForm
                      ? {
                          title: addressForm.state_id + "",
                          id: +addressForm.state_name_id,
                        }
                      : null
                  }
                  handleClick={(address: AddressId) => {
                    handleSelectState(address)
                  }}
                />
              </div>

              <div className="form-item-inline form-item-inline-dropdown dropdown-40">
                <Dropdown
                  hasSearchInput={true}
                  list={districts || [{ id: 1, name: "Quận / Huyện" }]}
                  itemActiveProps={
                    addressForm
                      ? {
                          title: addressForm.district_id + "",
                          id: +addressForm.district_name_id,
                        }
                      : null
                  }
                  maxHeight={30}
                  handleClick={(address: AddressId) => {
                    handleSelectDistrict(address)
                  }}
                />
              </div>

              <div className="form-item-inline form-item-inline-dropdown dropdown-30">
                <Dropdown
                  hasSearchInput={true}
                  list={wards || [{ id: 1, name: "Phường / Xã" }]}
                  itemActiveProps={
                    addressForm
                      ? {
                          title: addressForm.ward_id + "",
                          id: +addressForm.ward_name_id,
                        }
                      : null
                  }
                  maxHeight={25}
                  handleClick={(address: WardAddress) => setWard(address)}
                />
              </div>

              <div className="form-item">
                <Field
                  className={`form-item-input ${
                    errors.street && touched.street
                      ? "form-item-input-error"
                      : ""
                  }`}
                  as="textarea"
                  rows={3}
                  id="detailAddress"
                  type="text"
                  placeholder={
                    language === "vni"
                      ? "Ví dụ: 52, đường Trần Hưng Đạo"
                      : "Address detail..."
                  }
                  name="street"
                />
                {errors.street && touched.street ? (
                  <p className="form-item-text-error">{errors.street}</p>
                ) : null}
              </div>

              <button
                type="submit"
                className={`btn-primary btn-save ${
                  !isValid || !ward ? "btn-disabled" : ""
                }`}
              >
                {language === "vni"
                  ? `${isObjectHasValue(addressForm) ? "Lưu" : "Thêm"}`
                  : `${isObjectHasValue(addressForm) ? "Save" : "Add"}`}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  )
}
