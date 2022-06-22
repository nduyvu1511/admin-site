interface ProductListLoadingProps {
  type?: 'large';
}

export const ProductListLoading = ({ type }: ProductListLoadingProps) => {
  return (
    <div
      className={`product__list-loading ${
        type === 'large' ? 'product__list-loading-large' : ''
      } `}>
      <div className="product__list-loading-item product__list-loading-image"></div>
      <div className="product__list-loading-right">
        <div className="product__list-loading-item product__list-loading-title"></div>
        <div className="product__list-loading-item product__list-loading-price"></div>
      </div>
    </div>
  );
};

