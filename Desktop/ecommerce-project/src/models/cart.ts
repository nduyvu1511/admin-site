import { PriceTable, Product } from "./product"

// export interface CartItem extends Product {
//   quantity: number
//   partner_id: number
//   attribute_names?: Array<string>
// }

export interface CartItem {
  stored_product_id: number
  is_check: boolean
  product_tmpl_id: number
  product: {
    product_id: number
    product_name: string
    representative_image: string
  }
  product_uom: {
    uom_id: number
    uom_name: string
  }
  price_unit: number
  price_unit_discount: number
  product_qty: number
  price_table: PriceTable[]
  attribute: {
    attribute_name: string
    attribute_str: string[]
  }
}
