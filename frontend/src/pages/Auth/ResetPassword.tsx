import { useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import type {
  IResetPasswordForm,
  ResetPasswordFormErrors,
  ResetPasswordResponse,
} from "../../types/AuthTypes";
import MakeRequest from "../../types/MakeRequest";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [URLSearchParams] = useSearchParams();
  const email = URLSearchParams.get("email");
  const token = URLSearchParams.get("token");
  const navigate = useNavigate();

  const [resetForm, setResetForm] = useState<IResetPasswordForm>({
    password: "",
    password_confirmation: "",
  });
  const [formError, setFormError] = useState<ResetPasswordFormErrors | null>(
    null,
  );


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = {
      ...resetForm,
      [e.target.name]: e.target.value,
    };
    setResetForm(newPassword);
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resetRequestObj = {
      data: {
        email: email,
        token: token,
        password: resetForm.password,
        password_confirmation: resetForm.password_confirmation,
      },
      url: "/reset-password",
      method: "post",
    };
    try {
      const response =
        await MakeRequest<ResetPasswordResponse>(resetRequestObj);

      if (response.status == 200) {
        toast.success(response.data?.message);
        navigate("/login");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 422) {
          const { password, password_confirmation, email, token} =
            err.response?.data?.errors;
          setFormError({
            password: password,
            password_confirmation: password_confirmation,
          });
          if (email || token) {
            toast.error(err.response?.data?.errors);
          }
        }
        toast.error(err.response?.data?.message);
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
           {formError?.password ? (
            <span className="text-red-500 text-xs">{formError.password}</span>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="confirmPassword" className="text-sm mb-0.5">
            Confirm New Password <span className="text-red-700">*</span>
          </label>
          <input
            type="password"
            name="password_confirmation"
            id="confirmPassword"
            placeholder="Enter Confirm Password"
            className="rounded-md outline-0 border-2 border-gray-400 p-1 xl:p-1.5"
            onChange={handleChange}
          />
          {formError?.password_confirmation ? (
            <span className="text-red-500 text-xs">{formError.password_confirmation}</span>
          ) : (
            ""
          )}
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
