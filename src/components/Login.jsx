import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Logo, Input, Button } from "./index";
import authService from "../appwrite/auth";
import { login as storeLogin } from "../store/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const submit = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getUserAccount();
        if (userData) {
          dispatch(storeLogin(userData));
          navigate("/");
        } else {
          setError("error occured");
        }
      } else {
        setError("error occured");
      }
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center align-middle max-w-3xl self-center">
      <div className="w-full text-black flex justify-center align-middle bg-gray-100 border-black/10 p-8 px-10 rounded-xl relative m-9">
        <div className="w-full">
          <span>
            <Logo width="100%" />
          </span>
          <h2 className="text-center font-bold text-2xl">Login your account</h2>
          <p className="text-center font-bold text-2xl">
            {" "}
            Dont&apos;t have an account ,&nbsp;
            <Link
              className="font-bold text-balance m-2  underline"
              to={"/signup"}
            >
              Sign Up
            </Link>
          </p>
          {error && (
            <p className="p-5 text-bold text-red-500">
              Please enter correct details
            </p>
          )}
          <form onSubmit={handleSubmit(submit)} className="mt-6">
            <div className="space-y-5 flex flex-col">
              <Input
                label="Email: "
                type="email"
                placeholder="Enter your email"
                className="py-2"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPattern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email Address Must Be a Valid Address",
                  },
                })}
              />
              <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: true,
                })}
              />
              <Button children="Login" className="py-3 px-8 font-bold self-center"></Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
