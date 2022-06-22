import { companyIcon } from "@/assets"
import { formatMoneyVND, isObjectHasValue } from "@/helper"
import { OrderHistoryDetail } from "@/models"
import { API_URL } from "@/services"
import Image from "next/image"
import { FiCheckCircle } from "react-icons/fi"

interface OrderStatusProps {
  type?: "history" | "order"
  order: OrderHistoryDetail
}

export const OrderStatus = ({ type, order }: OrderStatusProps) => {
  const language = "vni"

  return (
    <>
      {isObjectHasValue(order) ? (
        <div className="order__status">
          {type === "order" ? (
            <header className="order__status-header">
              <FiCheckCircle />
              <h3>Cảm ơn bạn đã đặt hàng!</h3>
              <p>
                Order code: <span>{order.name}</span>
              </p>
            </header>
          ) : null}
          <div className="order__status-body">
            <div className="order__status-summary">
              <div className="grid grid-col-1 grid-col-lg-2 order__status-summary-list-wrapper">
                <ul className="order__status-summary-list">
                  <li className="order__status-summary-list-item">
                    <h3>Ngày đặt hàng:</h3>
                    <p>{order.create_date}</p>
                  </li>
                  <li className="order__status-summary-list-item">
                    <h3>Tên:</h3>
                    <p>{order.name}</p>
                  </li>
                  <li className="order__status-summary-list-item">
                    <h3>SĐT:</h3>
                    <p>{order.delivery_phone}</p>
                  </li>
                  <li className="order__status-summary-list-item">
                    <h3>Địa chỉ giao hàng:</h3>
                    <p>{order.delivery_address}</p>
                  </li>
                </ul>

                <ul className="order__status-summary-list">
                  <li className="order__status-summary-list-item">
                    <h3>Tình trạng đặt hàng:</h3>
                    <p>{order.state_name}</p>
                  </li>
                  <li className="order__status-summary-list-item">
                    <h3>Tổng số tiền đặt:</h3>
                    <p>{formatMoneyVND(order.amount_total)}</p>
                  </li>
                  <li className="order__status-summary-list-item">
                    <h3>Tình trạng vận chuyển:</h3>
                    <p>{order.state_delivery}</p>
                  </li>
                  <li className="order__status-summary-list-item">
                    <h3>Tình trạng thanh toán:</h3>
                    <p>{order.state_paid}</p>
                  </li>
                </ul>
              </div>
            </div>

            {order.products.length > 0 ? (
              <div className="order__status-detail">
                <h3 className="order__status-body-heading">
                  Chi tiết đơn hàng
                </h3>
                <div className="order__status-detail-wrapper">
                  <div className="order__history-table-detail">
                    <div className="order__history-table-detail-heading">
                      <div className="order__history-table-detail-order order__history-table-detail-item">
                        #
                      </div>
                      <div className="order__history-table-detail-image order__history-table-detail-item"></div>
                      <div className="order__history-table-detail-name order__history-table-detail-item">
                        Sản phẩm
                      </div>
                      <div className="order__history-table-detail-qty order__history-table-detail-item">
                        Số lượng
                      </div>
                      <div className="order__history-table-detail-unit order__history-table-detail-item">
                        Đơn vị
                      </div>
                      <div className="order__history-table-detail-price order__history-table-detail-item">
                        Giá bán
                      </div>
                    </div>

                    <div className="order__history-table-detail-body">
                      {order.products?.map((item, index) => (
                        <div
                          className="order__history-table-detail-body-item"
                          key={item.product_id}
                        >
                          <div className="order__history-table-detail-order order__history-table-detail-item">
                            <p className="order__history-table-detail-item-heading">
                              Sản phẩm
                            </p>
                            <p className="order__history-table-detail-item-title">
                              {index + 1}
                            </p>
                            <div className="image-container">
                              <Image
                                src={
                                  item.image_url?.[0]
                                    ? `${`${API_URL}${
                                        item.image_url?.[0] || ""
                                      }`}`
                                    : companyIcon
                                }
                                alt=""
                                className="image"
                                layout="fill"
                                quality={40}
                              />
                            </div>
                          </div>

                          <div className="order__history-table-detail-image order__history-table-detail-item">
                            <div className="image-container">
                              <Image
                                src={
                                  item.image_url?.[0]
                                    ? `${`${API_URL}${
                                        item.image_url?.[0] || ""
                                      }`}`
                                    : companyIcon
                                }
                                alt=""
                                className="image"
                                layout="fill"
                                quality={40}
                              />
                            </div>
                          </div>

                          <div className="order__history-table-detail-name order__history-table-detail-item">
                            <p className="order__history-table-detail-item-heading">
                              Tên:
                            </p>
                            <p className="order__history-table-detail-item-title">
                              {item.name}
                            </p>
                          </div>

                          <div className="order__history-table-detail-qty order__history-table-detail-item">
                            <p className="order__history-table-detail-item-heading">
                              Số lượng:
                            </p>
                            <p className="order__history-table-detail-item-title">
                              {item.quantity}
                            </p>
                          </div>
                          <div className="order__history-table-detail-unit order__history-table-detail-item">
                            <p className="order__history-table-detail-item-heading">
                              Đơn vị:
                            </p>
                            <p className="order__history-table-detail-item-title">
                              {item.product_uom}
                            </p>
                          </div>
                          <div className="order__history-table-detail-price order__history-table-detail-item">
                            <p className="order__history-table-detail-item-heading">
                              Giá bán:
                            </p>
                            <p className="order__history-table-detail-item-title">
                              {formatMoneyVND(item.price)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  )
}
