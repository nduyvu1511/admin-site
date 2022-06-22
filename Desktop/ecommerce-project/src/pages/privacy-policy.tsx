import React from "react"
import { MainLayout } from "@/layout"
import { Breadcrumb } from "@/components"

const PrivacyPolicy = () => {
  return (
    <div className="return__policy-wrapper">
      <div className="container">
        <Breadcrumb
          breadcrumbList={[{ name: "Chính sách bảo mật", path: "" }]}
        />
        <div className="return__policy">
          <h3>TÀI KHOẢN – THÔNG TIN – BẢO MẬT</h3>
          <p>
            Khi bạn tạo một tài khoản trên trang https://womart.vn/, bạn sẽ có
            trách nhiệm duy trì tính bảo mật của tài khoản và mật khẩu của bạn.
            Bạn đồng ý chịu trách nhiệm cho tất cả các hoạt động được thực hiện
            dưới tài khoản hoặc mật khẩu của bạn. Trong trường hợp phát hiện
            việc sử dụng trái phép tài khoản của bạn hoặc vi phạm tính bảo mật,
            vui lòng thông báo cho chúng tôi ngay lập tức.
          </p>
          <p>
            Womart luôn đảm bảo an toàn cho thông tin và sử dụng cách thức bảo
            vệ tốt nhất cho các phương tiện thanh toán. Thông tin cá nhân của
            khách hàng trong quá trình thanh toán sẽ được bảo vệ một cách an
            toàn.
          </p>

          <p>
            Bạn không nên sử dụng bất kỳ thiết bị hay công cụ nào nhằm cố gắng
            can thiệp để thay đổi cấu trúc dữ liệu. Tất cả các hoạt động phát
            tán hay khuyến khích truy cập trái phép hoặc phá hủy dữ liệu của
            chúng tôi sẽ bị nghiêm cấm. Xin vui lòng không sử dụng trang website
            của chúng tôi sai mục đích. Tất cả các hành vi vi phạm sẽ bị tước bỏ
            tất cả các quyền hoặc có thể bị xử lí theo pháp luật nếu cần thiết.
          </p>

          <p>
            Tất cả các dữ liệu trao đổi sẽ được bảo mật và chúng tôi sẽ chỉ buộc
            phải cung cấp dữ liệu khi có yêu cầu hợp lý.
          </p>

          <h3 className="return__policy-heading">ĐIỀU KHOẢN THÀNH VIÊN</h3>

          <p>
            Khách hàng có thể đăng ký gia nhập thành viên Womart bằng cách hoàn
            tất mẫu đăng ký thành viên. Khi bạn hoàn thành tất cả các bước để
            đăng ký, bạn đã trở thành thành viên của chúng tôi và được nhận các
            thông tin, chính sách ưu đãi mà chúng tôi cung cấp. Trở thành thành
            viên, bạn phải cung cấp cho chúng tôi thông tin chính xác một cách
            kịp thời để hoàn tất việc đăng ký. Quý thành viên có quyền sử dụng
            trang web để đặt hàng, hỏi đáp về sản phẩm,tích điểm, quản lý tài
            khoản hoặc cho các mục đích hợp lý khác. Chúng tôi cũng có thể ngừng
            cung cấp dịch vụ mà không cần thông báo nếu bạn có vi phạm nào ảnh
            hưởng đến các điều khoản tại trang này.
          </p>
        </div>
      </div>
    </div>
  )
}

PrivacyPolicy.Layout = MainLayout

export default PrivacyPolicy
