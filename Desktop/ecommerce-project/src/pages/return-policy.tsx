import React from "react"
import { MainLayout } from "@/layout"
import { Breadcrumb } from "@/components"

const ReturnPolicy = () => {
  return (
    <div className="return__policy-wrapper">
      <div className="container">
        <Breadcrumb
          breadcrumbList={[{ name: "Chính sách trả hàng", path: "" }]}
        />
        <div className="return__policy">
          <p>
            <strong>Womart</strong> đảm bảo rằng tất cả các sản phẩm là trong
            bao bì hàn kín, nguồn gốc xuất xứ rõ ràng, đảm bao theo quy định về
            vệ sinh an toàn thực phẩm theo quy định của Sở Y tế, còn trong thời
            hạn sử dụng, và không bị lỗi. Các sản phẩm bạn nhận được phải không
            bị hư hỏng, phù hợp với mô tả sản phẩm trên trang web của chúng tôi
          </p>
          <ul>
            <p>
              Trong trường hợp các sản phẩm bạn nhận được không đáp ứng cam kết
              của chúng tôi, bạn có 30 ngày đổi trả. Các trường hợp được đổi trả
              bao gồm:
            </p>
            <li>Sản phẩm bị lỗi do Nhà sản xuất</li>
            <li>Sản phẩm không đúng loại, số lượng trong đơn đặt hàng</li>
            <li>Sản phẩm có hạn sử dụng còn lại dưới 30 ngày</li>
            <li>Sản phẩm có bao bì bị ảnh hưởng như: Bong tróc, rách, …</li>
          </ul>
          <p>
            Quý khách vui lòng thông báo với MYU tình trạng sản phẩm thông qua
            HOTLINE hoặc email: e@womart.vn
          </p>
          <p>
            <strong>Womart</strong> sẽ đổi trả phù hợp sau khi kiểm tra đúng
            tình trạng sản phẩm. Chúng tôi sẽ thông báo với bạn qua điện thoại
            và email.
          </p>
        </div>
      </div>
    </div>
  )
}

ReturnPolicy.Layout = MainLayout

export default ReturnPolicy
