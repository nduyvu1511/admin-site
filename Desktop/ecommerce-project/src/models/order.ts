import { ShippingAddress } from "./address"
import { CartItem } from "./cart"
import { OrderHistoryDetail, Token } from "./user"

export interface Payment {
  acquirer_id: number
  name: string
  provider: string
  state: string
  image_url: string
}

export interface ProductCompany {
  company_id: number
  coupon_code: string
  payment_term_id: number
  products: object
}

export interface Promotion {
  promotion_id: number
  name: string
  company_id: number
  description: string
  coupon_code: string
  max_limit_per_user: number
  date_start: string
  date_end: string
  is_use_promotion: boolean
  image_url: Array<string>
}

export interface OrderDraftDetail {
  id: number
  promotion_code: string
  partner_id: number
  combo_id: any
  order_line: any
  order_line_view: {
    product_id: number
    name: string
    qty: number
    product_uom: string
    price_unit: number
    product_discount: number
    discount_line: {
      type: "fixed" | "percent"
      value: number
    }
    price_total: number
    price_subtotal: number
  }[]
}

export interface OrderDraft {
  order_id: number
  detail_order: OrderDraftDetail
  amount_untaxed: number
  amount_tax: number
  promo_price: number
  reduce_price_combo_view: number
  discount_by_loyal: number
  amount_total: number
}

export interface DraftProductList {
  [key: string]: number | { id: number; qty: number }[]
}

export interface OrderDraftPost {
  token: string
  api_version: "2.1"
  // partner_shipping_id: number | null
  // coupon_code?: string | null
  customer_id: number
  list_products: [
    {
      // payment_term_id?: number | null
      // coupon_code?: string | null
      products: DraftProductList
    }
  ]
  note?: string
}

export interface Delivery {
  carrier_id: number
  carrier_name: string
  shipping_fee: number
  shipping_active: boolean
  shipping_icon: string
  description: string
}

export interface DeliveryDetail {
  delivery_message: string
  delivery_price: number
  display_price: number
}

export interface DeliveryDetailWithId extends DeliveryDetail {
  carrier_id: number
}

export interface OrderSlice {
  productList: CartItem[] | undefined | null
  address: ShippingAddress | undefined
  promotionLineList: PromotionLine[] | undefined
  promotion: Promotion | undefined
  orderDraft: OrderDraft | undefined | null
  delivery: Delivery | undefined
  payment: Payment | undefined
  note: string
  orderDone: OrderHistoryDetail | undefined
}

export interface GetDeliveryListProps {
  token: string
  sale_id: number
}

export interface TokenAndSaleOrderId {
  token: string
  sale_order_id: number
}

export interface OrderDone {
  token: string
  order_id: Array<number>
}

export interface ConfirmDelivery {
  token: string
  required_note: "KHONGCHOXEMHANG" | "CHOXEMHANGKHONGTHU" | "CHOTHUHANG"
  payment_type: "1" | "2"
  sale_carrier: {
    sale_id: number
    carrier_id: number
  }[]
  delivery_message?: string
}

export interface GetPriceOfDeliveryProps extends GetDeliveryListProps {
  carrier_id: number
}

export interface CreateOrderDraftProps {
  handleSuccess?: Function
  handleError?: Function
  showLoading?: boolean
}

export interface CancelPromotion extends Token {
  order_id: number
}

export interface ApplyPromotion extends CancelPromotion {
  coupon_code: string | null
}

export interface UpdateOrderDraft extends Token {
  order_id: Array<number>
  partner_shipping_id: number | null
  payment_term_id: number | null
}

export interface PromotionLine {
  id: number
  name: string
  qty: number
  product_uom: string
  price_unit: number
  is_promotion: boolean
  is_line_promotion: boolean
  discount_line: {
    type: "percentage" | "fixed" | "bogo_sale" | "range"
    value: number
  }
}
