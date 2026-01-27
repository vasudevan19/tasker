import { useState } from "react";
import axiosInstance from "../../assets/api/axiosInstance";
import axios from "axios";
import {useNavigate, useSearchParams } from "react-router-dom";

interface IResetPasswordForm {
  password: string;
  confirmPassword: string;
}

const ResetPassword = () => {
    const [URLSearchParams] = useSearchParams();
    const email = URLSearchParams.get('email');
    const token = URLSearchParams.get('token');
    const navigate = useNavigate();
  const [resetForm, setResetForm] = useState<IResetPasswordForm>({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = {
      ...resetForm,
      [e.target.name]: e.target.value,
    };
    setResetForm(newPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axiosInstance({
        method: "post",
        url: "/reset-password",
        data: {
            email: email,
            token: token,
            password: resetForm.password,
            password_confirmation: resetForm.confirmPassword
        },
      });

      if (response.status == 200) {
          console.log(response.data.message);
          navigate('/login');
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(err.response?.data);
      } else {
        console.error(err);
      }
    }
  };
  return (
    <div className="w-xs sm:w-sm xl:w-md px-2">
      <p className="text-2xl md:text-3xl font-semibold text-center xl:mb-3">
        Reset Password
      </p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mb-1 xl:mb-2">
          <label htmlFor="password" className="text-sm mb-0.5">
            New Password <span className="text-red-700">*</span>
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
            className="rounded-md outline-0 border-2 border-gray-400 p-1 xl:p-1.5"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="confirmPassword" className="text-sm mb-0.5">
            Confirm New Password <span className="text-red-700">*</span>
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Enter Confirm Password"
            className="rounded-md outline-0 border-2 border-gray-400 p-1 xl:p-1.5"
            onChange={handleChange}
          />
        </div>
        <div className="flex">
          <button className="bg-black text-white rounded-sm px-2 py-1 mt-4 flex-1 xl:p-1.5">
            Set Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
