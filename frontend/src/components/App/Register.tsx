import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { registerStart } from '../../Redux/slices/authSlice';
import { pawdRegExp } from '@/utils/utils';
import { toast } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css'; 
import { useAppDispatch, useAppSelector } from '../../hooks/hook'; 

const Register = ({ toggleForm, onSuccess }: { toggleForm: () => void, onSuccess: () => void }) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, error } = useAppSelector((state) => state.auth); 

  const [passwordRules, setPasswordRules] = useState({
    minLength: false,
    hasLetter: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  const [successfullyRegistered, setSuccessfullyRegistered] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      username: Yup.string()
        .min(4, 'Username must be at least 4 characters')
        .required('Username is required'),
      password: Yup.string()
        .matches(pawdRegExp, 'Password must meet all the requirements')
        .required('Password is required'),
    }),
    onSubmit: (values) => {
      dispatch(registerStart(values));
    },
  });

  useEffect(() => {
    if (isAuthenticated && !successfullyRegistered) {
      toast.success('Registration successful!');
      setSuccessfullyRegistered(true);
      onSuccess(); 
    }

    if (error) {
      toast.error(`Registration failed: ${error}`);
    }
  }, [isAuthenticated, error, successfullyRegistered, onSuccess]);

  useEffect(() => {
    const { password } = formik.values;
    setPasswordRules({
      minLength: password.length >= 8,
      hasLetter: /[A-Za-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[@$!%*#?&]/.test(password),
    });
  }, [formik.values.password]);

  return (
    <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-lg bg-gray-50">
      <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-5">
          <label htmlFor="username" className="block font-bold mb-2">
            Username
          </label>
          <input
            id="username"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-lg"
            {...formik.getFieldProps('username')}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="text-red-500 mt-1 text-sm">{formik.errors.username}</div>
          ) : null}
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block font-bold mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-lg"
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 mt-1 text-sm">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="mb-5">
          <label htmlFor="password" className="block font-bold mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-lg"
            {...formik.getFieldProps('password')}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 mt-1 text-sm">{formik.errors.password}</div>
          ) : null}

          <div className="mt-2 text-sm">
            <div
              className={`${
                passwordRules.minLength ? 'text-green-500' : 'text-red-500'
              } mb-1`}
            >
              • At least 8 characters
            </div>
            <div
              className={`${
                passwordRules.hasLetter ? 'text-green-500' : 'text-red-500'
              } mb-1`}
            >
              • At least one letter (A-Z or a-z)
            </div>
            <div
              className={`${
                passwordRules.hasNumber ? 'text-green-500' : 'text-red-500'
              } mb-1`}
            >
              • At least one number (0-9)
            </div>
            <div
              className={`${
                passwordRules.hasSpecialChar ? 'text-green-500' : 'text-red-500'
              }`}
            >
              • At least one special character (@$!%*#?&)
            </div>
          </div>
        </div>

        <button type="submit" className="w-full px-4 py-2 bg-green-500 text-white font-bold rounded-md hover:bg-green-600">
          Register
        </button>
      </form>

      <a
        className="block text-center mt-6 text-green-500 text-lg cursor-pointer hover:underline"
        onClick={toggleForm}
      >
        Already have an account? Login
      </a>
    </div>
  );
};

export default Register;
