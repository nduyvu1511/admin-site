import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { RiImageAddLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { productSchema } from '../../../core/schema/schema';
import { RootState } from '../../../core/store';
import {
  toggleModalConfirm,
  toggleProductForm,
} from '../../../modules/modal/modalSlice';
import { clearProductDetail } from '../../../modules/product/productSlice';
import {
  fetchAddProduct,
  fetchDeleteProduct,
  fetchUpdateProduct,
  fetchUploadProductImages,
} from '../../../modules/product/productThunk';
import { isObjectHasValue } from '../../helper/functions';
import Toggle from '../button/Toggle';
import Dropdown from '../dropdown/Dropdown';
import ModalConfirm from '../modal/ModalConfirm';

const ProductForm = () => {
  const { categoryList } = useSelector((state: RootState) => state.product);

  const [imageFile, setImageFile] = useState<Array<any>>();
  const [imagesPreviewUrl, setImagesPreviewUrl] = useState<Array<string>>([]);

  const { productDetail } = useSelector((state: RootState) => state.product);

  const [categoryId, setCategoryId] = useState<String>(() =>
    categoryList.length === 0 ? '0' : categoryList[0]._id
  );
  const [active, setActive] = useState<boolean>(() =>
    isObjectHasValue(productDetail) ? productDetail.active : true
  );
  const dispatch = useDispatch();

  const { isOpenModalConfirm } = useSelector((state: RootState) => state.modal);
  const { token } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    return () => {
      dispatch(clearProductDetail());
    };
  }, [dispatch]);

  const handleSubmit = (data: any) => {
    const product = {
      name: data.productName as string,
      desc: data.description as string,
      stock: data.stock as number,
      sku: data.sku as string,
      category_id: categoryId as string,
      active,
      price: {
        regular_price: data.regularPrice as number,
        wholesale_price: data.wholesalePrice as number,
      },
      images: [
        'https://demo2wpopal.b-cdn.net/poco/wp-content/uploads/2020/08/13-1.png',
        'https://demo2wpopal.b-cdn.net/poco/wp-content/uploads/2020/08/8-1.png',
      ] as Array<string>,
    };

    if (!product) return;

    isObjectHasValue(productDetail)
      ? dispatch(
          fetchUpdateProduct({
            data: { ...product, _id: productDetail._id },
            token,
          })
        )
      : dispatch(fetchAddProduct({ data: product, token }));

    dispatch(toggleProductForm(false));
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];

    if (!image || imagesPreviewUrl.length > 2) return;

    imageFile && imageFile.length > 0
      ? setImageFile([image, ...imageFile])
      : setImageFile([image]);

    const imageUrl = URL.createObjectURL(image);
    const newImages = [...imagesPreviewUrl, imageUrl];

    setImagesPreviewUrl(newImages);
  };

  const handleSendImage = () => {
    const data = new FormData();
    if (!imageFile || imageFile.length === 0) return;
    imageFile.forEach((item, index) => data.append('images', item));

    dispatch(fetchUploadProductImages(data));
  };

  const handleDeleteProduct = () => {
    isObjectHasValue(productDetail) &&
      dispatch(
        fetchDeleteProduct({
          token,
          data: { _id: productDetail._id },
        })
      );
    dispatch(toggleProductForm(false));
  };

  return (
    <>
      <Formik
        validationSchema={productSchema}
        initialValues={{
          productName: isObjectHasValue(productDetail)
            ? productDetail?.name
            : '',
          sku: isObjectHasValue(productDetail) ? productDetail?.sku : '',
          regularPrice: isObjectHasValue(productDetail)
            ? productDetail.price.regular_price
            : '',
          stock: isObjectHasValue(productDetail) ? productDetail?.stock : '',
          wholesalePrice: isObjectHasValue(productDetail)
            ? productDetail?.price.wholesale_price
            : '',
          description: isObjectHasValue(productDetail)
            ? productDetail?.desc
            : '',
        }}
        // validationSchema={UserAddressSchema}
        onSubmit={handleSubmit}>
        {({ errors, touched, isValid }) => (
          <Form>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-7">
              {/* Left */}
              <div className="">
                <div className="h-[150px] mb-5 flex">
                  {imagesPreviewUrl.length > 0 ||
                  (productDetail && Object.keys(productDetail).length > 0) ? (
                    <div className="flex flex-[2] mr-4">
                      {(productDetail && Object.keys(productDetail).length > 0
                        ? productDetail.images
                        : imagesPreviewUrl
                      ).map((img, idx) => (
                        <div
                          key={idx}
                          className="flex-1 mr-4 last-of-type:mr-0">
                          <img
                            className="w-full h-full object-cover rounded-[4px]"
                            src={img}
                            alt=""
                          />
                        </div>
                      ))}
                    </div>
                  ) : null}
                  {/* Input file */}
                  <div className="flex-1">
                    <label
                      className="flex flex-col items-center justify-center w-full p-4 h-full bg-slate-100 dark:bg-dark-bg-opacity cursor-pointer
                  text-light-text dark:text-dark-text rounded-lg border-2 border-dashed border-dark-text"
                      htmlFor="files">
                      <RiImageAddLine className="text-2xl mb-2" />
                      <span className="text-[13px] font-semibold ">
                        Add images
                      </span>
                    </label>
                    <input
                      type="file"
                      id="files"
                      hidden
                      name="files"
                      multiple
                      accept="image/*"
                      onChange={handleChangeImage}
                    />
                  </div>
                </div>

                {imagesPreviewUrl.length > 0 ? (
                  <div className="flex justify-end mt-2 mb-4">
                    <button
                      onClick={handleSendImage}
                      className="btn-primary font-semibold text-[13px] rounded-[4px]">
                      Save
                    </button>
                  </div>
                ) : null}

                {/* Product name and category */}
                <div className="grid grid-cols-2 gap-7 mb-3">
                  <div>
                    <label htmlFor="productName" className="label-common">
                      Product Name <span className="text-red-400">*</span>
                    </label>
                    <Field
                      className={`input-common ${
                        touched.productName && errors.productName
                          ? 'border-red-500'
                          : ''
                      }`}
                      id="productName"
                      type="text"
                      placeholder="Product name"
                      name="productName"
                    />
                    {touched.productName && errors.productName ? (
                      <p className="text-[13px] font-normal text-red-500 mt-1 leading-4">
                        {touched.productName && errors.productName}
                      </p>
                    ) : null}
                  </div>

                  <div className="">
                    <label htmlFor="phoneNumber" className="label-common">
                      Category <span className="text-red-400">*</span>
                    </label>
                    <Dropdown
                      inForm={true}
                      list={categoryList}
                      itemActive={
                        isObjectHasValue(productDetail)
                          ? categoryList.find(
                              (item) => item._id === productDetail.category_id
                            )
                          : null
                      }
                      handleClick={(val: String) => setCategoryId(val)}
                    />
                  </div>

                  <div className="">
                    <label htmlFor="phoneNumber" className="label-common">
                      SKU <span className="text-red-400">*</span>
                    </label>
                    <Field
                      className={`input-common ${
                        touched.sku && errors.sku ? 'border-red-500' : ''
                      }`}
                      id="sku"
                      type="text"
                      placeholder="SKU"
                      name="sku"
                    />
                    {touched.sku && errors.sku ? (
                      <p className="text-[13px] font-normal text-red-500 mt-1 leading-4">
                        {touched.sku && errors.sku}
                      </p>
                    ) : null}
                  </div>

                  <div className="">
                    <label htmlFor="stock" className="label-common">
                      Stock <span className="text-red-400">*</span>
                    </label>
                    <Field
                      className={`input-common ${
                        touched.stock && errors.stock ? 'border-red-500' : ''
                      }`}
                      id="stock"
                      type="text"
                      placeholder="Stock"
                      name="stock"
                    />
                    {touched.stock && errors.stock ? (
                      <p className="text-[13px] font-normal text-red-500 mt-1 leading-4">
                        {touched.stock && errors.stock}
                      </p>
                    ) : null}
                  </div>

                  {/* Price */}
                  <div className="">
                    <label htmlFor="regularPrice" className="label-common">
                      Regular Price <span className="text-red-400">*</span>
                    </label>
                    <Field
                      className={`input-common ${
                        touched.regularPrice && errors.regularPrice
                          ? 'border-red-500'
                          : ''
                      }`}
                      id="regularPrice"
                      type="text"
                      placeholder="Regular Price"
                      name="regularPrice"
                    />
                    {touched.regularPrice && errors.regularPrice ? (
                      <p className="text-[13px] font-normal text-red-500 mt-1 leading-4">
                        {touched.regularPrice && errors.regularPrice}
                      </p>
                    ) : null}
                  </div>

                  <div className="">
                    <label htmlFor="salePrice" className="label-common">
                      wholesale Price <span className="text-red-400">*</span>
                    </label>
                    <Field
                      className={`input-common ${
                        touched.wholesalePrice && errors.wholesalePrice
                          ? 'border-red-500'
                          : ''
                      }`}
                      id="wholesalePrice"
                      type="text"
                      placeholder="Wholesale Price"
                      name="wholesalePrice"
                    />
                    {touched.wholesalePrice && errors.wholesalePrice ? (
                      <p className="text-[13px] font-normal text-red-500 mt-1 leading-4">
                        {touched.wholesalePrice && errors.wholesalePrice}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="flex flex-col mt-5">
                  <label htmlFor="description" className="label-common">
                    Description <span className="text-red-400">*</span>
                  </label>
                  <Field
                    component="textarea"
                    id="description"
                    type="text"
                    placeholder="Description"
                    name="description"
                    className={`input-common h-auto py-3 ${
                      touched.description && errors.description
                        ? 'border-red-500'
                        : ''
                    }`}
                    rows={4}
                  />
                  {touched.description &&
                  errors.description &&
                  touched.description ? (
                    <p className="text-red-600 text-[13px] font-medium mt-1">
                      {touched.description && errors.description}
                    </p>
                  ) : null}
                </div>

                <div className="flex items-center mt-5 justify-end">
                  <p className="label-common mr-2 mb-0">Active</p>
                  <Toggle status={active} onToggle={() => setActive(!active)} />
                </div>
              </div>
            </div>

            <div className="mt-10 flex justify-end">
              {isObjectHasValue(productDetail) ? (
                <button type="submit" className={`btn-primary `}>
                  Save
                </button>
              ) : (
                <button
                  type="submit"
                  className={`btn-primary ${
                    !isValid ? 'pointer-events-none opacity-40' : ''
                  }`}>
                  Add
                </button>
              )}

              {isObjectHasValue(productDetail) ? (
                <span
                  onClick={() => dispatch(toggleModalConfirm())}
                  className="btn-primary bg-red-600 cursor-pointer ml-4">
                  Delete
                </span>
              ) : null}

              <span
                onClick={() => dispatch(toggleProductForm(false))}
                className="btn-primary ml-4 bg-slate-400 cursor-pointer">
                Cancel
              </span>
            </div>
          </Form>
        )}
      </Formik>

      {isOpenModalConfirm ? (
        <ModalConfirm
          handleClose={() => dispatch(toggleModalConfirm())}
          handleConfirm={() => handleDeleteProduct()}
          title="If agree, you will delete this product"
          isShowModal={isOpenModalConfirm}
        />
      ) : null}
    </>
  );
};

export default ProductForm;
