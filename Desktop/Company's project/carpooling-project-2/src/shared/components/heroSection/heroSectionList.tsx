import { FindLocationIcon, RegisterIcon } from "@/assets"
import { HeroSectionItem } from "./heroSectionItem"
import { Fade } from "react-reveal"

const HeroSectionList = () => {
  return (
    <div>
      {[
        {
          icon: <RegisterIcon />,
          label: "Đăng ký tài khoản",
          desc: `Đăng nhập vào Mioto qua Facebook, Google, số điện thoại hoặc email của bạn. Chúng
            tôi cần bạn xác thực số điện thoại trước khi đặt xe.`,
          reverse: false,
        },
        {
          icon: <FindLocationIcon />,
          label: "Tìm chuyến xe",
          desc: `Bạn có thể tìm xe ưng ý nhanh chóng ở nơi bạn muốn tìm, thời gian, hãng xe, đặt xe
          nhanh`,
          reverse: true,
        },
        {
          icon: <RegisterIcon />,
          label: "Đặt chuyến xe",
          desc: `Đăng nhập vào Mioto qua Facebook, Google, số điện thoại hoặc email của bạn. Chúng
          tôi cần bạn xác thực số điện thoại trước khi đặt xe.`,
          reverse: false,
        },
        {
          icon: <FindLocationIcon />,
          label: "Chọn phương thức thanh toán",
          desc: `Bạn có thể tìm xe ưng ý nhanh chóng ở nơi bạn muốn tìm, thời gian, hãng xe, đặt xe
          nhanh`,
          reverse: true,
        },
        {
          icon: <RegisterIcon />,
          label: "Hoàn tất đặt chuyến và trải nghiệm",
          desc: `Đăng nhập vào Mioto qua Facebook, Google, số điện thoại hoặc email của bạn. Chúng
          tôi cần bạn xác thực số điện thoại trước khi đặt xe.`,
          reverse: false,
        },
      ].map((item, index) => (
        <div key={index} className="mb-[80px]">
          <Fade bottom delay={400}>
            <HeroSectionItem
              desc={item.desc}
              icon={item.icon}
              reverse={item.reverse}
              label={item.label}
            />
          </Fade>
        </div>
      ))}
    </div>
  )
}

export { HeroSectionList }
