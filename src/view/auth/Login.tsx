import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { BiLockAlt, BiUser } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSchema } from '../../core/schema/schema';
import { RootState } from '../../core/store';
import { fetchLogin } from '../../modules/user/userThunk';
import { Login as ILogin } from '../../modules/user/interface';
import { shieldImg } from '../../shared/assets/images';
import Toggle from '../../shared/components/button/Toggle';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state: RootState) => state.user);

  const [isShowPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = (data: ILogin) => {
    if (data && Object.keys(data).length > 0) {
      dispatch(fetchLogin(data));
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token, navigate]);

  return (
    <section
      className="dark:bg-dark-primary bg-light-bg grid lg:grid-cols-2 grid-cols-1 py-16 px-0 sm:px-4 md:px-16 max-h-screen overflow-hidden
     gap-10">
      <div className="mt-10 px-8 md:px-16 lg:px-8 xl:px-32 mx-auto">
        <h1 className="dark:text-dark-text text-4xl font-medium text-light-text leading-[46px]">
          Login to{' '}
          <span className="dark:text-[#039590] text-[#4361EE]">Admin site</span>
        </h1>
        <div className="mt-16">
          <Formik
            validationSchema={loginSchema}
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={handleSubmit}>
            {({ errors, touched }) => (
              <Form>
                <div className="relative">
                  <BiUser
                    className="absolute dark:fill-[#039590] fill-[#4361EE] text-2xl left-0 top-1/2 
                      transform -translate-y-1/2"
                  />
                  <Field
                    className={`bg-transparent outline-none ${
                      touched ? 'border-white' : ''
                    } transition-all w-full h-full py-4 
                    dark:text-dark-text text-light-text font-semibold text-base pl-10 border-b border-solid
                     dark:border-white-01 border-black-02 ${
                       errors.email ? 'border-red-500' : ''
                     }`}
                    id="email"
                    type="text"
                    placeholder="Email"
                    name="email"
                  />
                </div>

                <div className="relative mt-5">
                  <BiLockAlt
                    className="absolute dark:fill-[#039590] fill-[#4361EE] text-2xl left-0 top-1/2 
                      transform -translate-y-1/2"
                  />
                  <Field
                    className={`bg-transparent outline-none ${
                      touched ? 'border-white' : ''
                    } transition-all w-full h-full py-4 
                    dark:text-dark-text text-light-text font-semibold text-base pl-10 border-b border-solid
                     dark:border-white-01 border-black-02 ${
                       errors.email ? '' : ''
                     }`}
                    id="password"
                    type={isShowPassword ? 'text' : 'password'}
                    placeholder="Password"
                    name="password"
                  />
                </div>

                <div className="mt-7 flex items-center justify-between">
                  <div className="flex items-center">
                    <p className="text-sm font-semibold dark:text-dark-text text-light-text mr-3">
                      Show Password
                    </p>
                    <Toggle
                      status={isShowPassword}
                      onToggle={() => setShowPassword(!isShowPassword)}
                    />
                  </div>
                  <button className="btn-primary rounded-[4px]">Log in</button>
                </div>

                <p className="mt-10 dark:text-dark-text text-light-text font-medium text-sm leading-[24px]">
                  © 2020 All Rights Reserved.{' '}
                  <span className="dark:text-[#039590] text-[#4361EE]">
                    CORK
                  </span>{' '}
                  is a product of Designreset.{' '}
                  <span className="dark:text-[#039590] text-[#4361EE]">
                    Cookie Preferences, Privacy
                  </span>
                  , and
                  <span className="dark:text-[#039590] text-[#4361EE]">
                    Terms
                  </span>
                  .
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div className="hidden lg:flex items-center justify-center">
        <img
          className="w-[90%] h-[90%] object-contain"
          src={shieldImg}
          alt=""
        />
      </div>
    </section>
  );
};

export default Login;
