import React, { useState } from "react";
import axiosInstance from "../../assets/api/axiosInstance";
import axios from "axios";
import { Link } from "react-router-dom";

interface IRegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type ValidationError = {
  [key: string]: string[] | undefined;
};
const Register = () => {
  const [form, setForm] = useState<IRegisterForm>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<ValidationError>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newData = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(newData);
    setErrors({...errors, [e.target.name] : undefined})
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axiosInstance({
        method: "post",
        url: "/user",
        data: {
          name: form.username,
          email: form.email,
          password: form.password,
          password_confirmation: form.confirmPassword,
        },
      });

      if (response.status == 201) {
        console.log(response.data.message);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(err.response?.data);
        setErrors(err.response?.data?.errors);
      } else {
        console.error(err);
      }
    }
  };

  return (
    <div className="w-xs sm:w-sm xl:w-md px-2">
      <p className="text-2xl md:text-3xl font-semibold text-center xl:mb-3">
        Sign up
      </p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mb-1 xl:mb-2">
          <label htmlFor="username" className="text-sm mb-0.5">
            Username <span className="text-red-700">*</span>
          </label>
          <input
            type="text"
            className="rounded-md outline-0 border-2 border-gray-400 p-1 xl:p-1.5"
            name="username"
            id="username"
            placeholder="Enter Username"
            onChange={handleChange}
          />
          {errors.name && (
            <p className="text-red-600 text-xs mt-0.5">{errors.name[0]}</p>
          )}
        </div>
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
          {errors.email && (
            <p className="text-red-600 text-xs mt-0.5">{errors.email[0]}</p>
          )}
        </div>
        <div className="flex flex-col mb-1 xl:mb-2">
          <label htmlFor="password" className="text-sm mb-0.5">
            Password <span className="text-red-700">*</span>
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
            className="rounded-md outline-0 border-2 border-gray-400 p-1 xl:p-1.5"
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-red-600 text-xs mt-0.5">{errors.password[0]}</p>
          )}
        </div>
        <div className="flex flex-col mb-1 xl:mb-2">
          <label htmlFor="confirmPassword" className="text-sm mb-0.5">
            Confirm Password <span className="text-red-700">*</span>
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
            Create Account
          </button>
        </div>
      </form>
      <p className="text-sm text-center mt-2">
        Already have an account?{" "}
        <Link to="/login" className="hover:underline text-sky-600">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
