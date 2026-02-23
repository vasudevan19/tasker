import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import type { ILoginForm } from "../../interfaces/auth/ILoginForm";
import type { LoginResponse } from "../../types/AuthTypes";
import MakeRequest from "../../types/MakeRequest";
import { toast } from "react-toastify";
import axiosInstance from "../../assets/api/axiosInstance";

const Login = () => {
  const [credentials, setCredentials] = useState<ILoginForm>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<ILoginForm | null>(null);

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newData = {
      ...credentials,
      [e.target.name]: e.target.value,
    };

    setCredentials(newData);
  };

  const handleLoginSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const request = {
      data: {
        email: credentials.email,
        password: credentials.password,
      },
      url: "/login",
      method: "post",
    };
    try {
      await axiosInstance.get("/csrf-cookie");
      const response = await MakeRequest<LoginResponse>(request);
      if (response.status == 200) {
        const { message } = response.data;
        toast.success(message);
        navigate("/home/list");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 422) {
          const { email, password } = err.response?.data?.errors;
          setError({ email: email, password: password });
        }
        toast.error(err.response?.data?.message);
        // console.error(err.response?.data);
      } else {
        console.error("An error occured", err);
        toast.error("An error occured");
      }
    }
  };

  return (
    <div className="w-xs sm:w-sm xl:w-md px-2">
      <p className="text-2xl md:text-3xl font-semibold text-center xl:mb-3">
        Login
      </p>
      <form onSubmit={handleLoginSubmit}>
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
            onChange={handleInputChange}
          />
          {error?.email ? (
            <span className="text-red-500 text-xs">{error.email}</span>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm mb-0.5">
            Password <span className="text-red-700">*</span>
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
            className="rounded-md outline-0 border-2 border-gray-400 p-1 xl:p-1.5"
            onChange={handleInputChange}
          />
          {error?.password ? (
            <span className="text-red-500 text-xs">{error.password}</span>
          ) : (
            ""
          )}
        </div>
        <div className="flex justify-end text-sm">
          <Link to="/forgot-password" className="hover:underline text-sky-600">
            Forgot Password?
          </Link>
        </div>
        <div className="flex">
          <button className="bg-black text-white rounded-sm px-2 py-1 mt-4 flex-1 xl:p-1.5">
            Login
          </button>
        </div>
      </form>
      <p className="text-sm text-center mt-2">
        New to Tasker?{" "}
        <Link to="/signup" className="hover:underline text-sky-600">
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default Login;
