import { Field, Form, Formik } from 'formik';
import { RiImageAddLine } from 'react-icons/ri';
import { categorySchema } from '../../../core/schema/schema';

const CategoryForm = () => {
  const handleSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Formik
      validationSchema={categorySchema}
      initialValues={{
        name: '',
        image: '',
      }}
      // validationSchema={UserAddressSchema}
      onSubmit={handleSubmit}>
      {({ errors, touched, isValid }) => (
        <Form className="address__form-body-form">
          <div className="grid gap-4">
            {/* Left */}
            <div className="">
              <div className="h-[150px] mb-5">
                <label
                  className="flex flex-col items-center justify-center w-full p-4 h-full bg-slate-100 dark:bg-dark-bg-opacity cursor-pointer
                  text-light-text dark:text-dark-text rounded-lg border-2 border-dashed border-dark-text"
                  htmlFor="files">
                  <RiImageAddLine className="text-2xl mb-2" />
                  <span className="text-[13px] font-semibold ">Add image</span>
                </label>
                <input type="file" id="files" hidden name="files" multiple />
              </div>

              <div>
                <label htmlFor="phoneNumber" className="label-common">
                  Category name <span className="text-red-400">*</span>
                </label>
                <Field
                  className={`input-common ${
                    errors.name ? 'border-red-500' : ''
                  }`}
                  id="name"
                  type="text"
                  placeholder="Category name"
                  name="name"
                />
                {errors.name ? (
                  <p className="text-[13px] font-normal text-red-500 mt-1 leading-4">
                    {errors.name}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="mt-10 flex justify-end">
            <button type="submit" className="btn-primary mr-4">
              Save
            </button>
            <button className="btn-primary bg-red-600">Delete</button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CategoryForm;
