import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginStart } from '../../Redux/slices/authSlice';
import { toast } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css'; 
import { useAppDispatch, useAppSelector } from '../../hooks/hook'; 
import { useRouter } from 'next/router'; 

const Login = ({ toggleForm, onSuccess }: { toggleForm: () => void, onSuccess: () => void }) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, error } = useAppSelector((state) => state.auth); 
  const router = useRouter(); 

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required'),
    }),
    onSubmit: (values) => {
      dispatch(loginStart(values));
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      toast.success('Login successful!');
      onSuccess(); 
    }

    if (error) {
      toast.error(`Login failed: ${error}`);
    }
  }, [isAuthenticated, error, onSuccess]);

  return (
    <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-lg bg-gray-50">
      <h2 className="text-2xl font-semibold text-center mb-5">Login</h2>
      <form onSubmit={formik.handleSubmit}>
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
        </div>

        <button type="submit" className="w-full px-4 py-2 bg-green-500 text-white font-bold rounded-md hover:bg-green-600">
          Login
        </button>
      </form>

      <a className="block text-center mt-6 text-green-500 text-lg cursor-pointer hover:underline" onClick={toggleForm}>
        Don &apos; t have an account? Register
      </a>
    </div>
  );
};

export default Login;
