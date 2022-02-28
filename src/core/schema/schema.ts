import * as Yup from 'yup';

export const productSchema = Yup.object().shape({
  productName: Yup.string().min(5).required('Product name is required'),
  sku: Yup.string().required('SKU is required!'),
  wholesalePrice: Yup.number()
    .min(1, 'Price is invalid')
    .required('Wholesale price is required'),
  regularPrice: Yup.number()
    .min(1, 'Price is invalid')
    .required('regular price is required'),
  stock: Yup.number()
    .positive("Stock can't be negative")
    .required('Stock is required'),
  description: Yup.string()
    .min(10, 'Please enter a valid description')
    .required('Description is required'),
});

export const categorySchema = Yup.object().shape({
  name: Yup.string().required('Category name is required'),
  image: Yup.string().required('Image is required'),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter valid email'
    )
    .required('Please enter email'),
  password: Yup.string()
    .min(8, 'Password must have atleast 8 characters')
    .required('Please enter a password'),
});
