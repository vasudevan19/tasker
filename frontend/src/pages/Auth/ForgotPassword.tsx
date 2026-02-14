import React, { useState } from "react";
import axios from "axios";
import MakeRequest from "../../types/MakeRequest";
import type { ForgotPasswordErrors, ForgotPasswordResponse } from "../../types/AuthTypes";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<ForgotPasswordErrors | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const forgotPasswordRequest = {
       data: {
          email: email,
      },
      url: "/forgot-password",
      method: "post",
    }

    try {
      const response = await MakeRequest<ForgotPasswordResponse>(forgotPasswordRequest);

      if (response.status == 200) {
        toast.success(response.data.message);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 422) {
          const {email} =
            err.response?.data?.errors;
          setError({ email: email });
          // if (email) {
          //   toast.error(err.response?.data?.errors);
          // }
        }
        toast.error(err.response?.data?.message);
      } else {
        console.error(err);
      }
    }
  }
  return (
    <div className="w-xs sm:w-sm xl:w-md px-2">
      <p className="text-2xl md:text-3xl font-semibold text-center xl:mb-3">
        Reset your password
      </p>
      <p className="text-sm my-2 text-center">Enter your user account's verified email address and we will send you a password reset link.</p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mb-1 xl:mb-2">
          <label htmlFor="email" className="text-sm mb-0.5">
            Email <span className="text-red-700">*</span>
          </label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Enter Email"
            className="rounded-md outline-0 border-2 border-gray-400 p-1 xl:p-1.5"
            onChange={handleChange}
          />
           {error?.email ? (
            <span className="text-red-500 text-xs">{error.email}</span>
          ) : (
            ""
          )}
        </div>
        <div className="flex">
          <button className="bg-black text-white rounded-sm px-2 py-1 mt-4 flex-1 xl:p-1.5">
            Send password reset email
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
