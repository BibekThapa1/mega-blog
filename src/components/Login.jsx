import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Logo, Input, Button } from "./index";
import authService from "../appwrite/auth";
import { login as storeLogin } from "../store/authSlice";
import "../App.css"


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const submit = async (data) => {
    console.log(data);
    setError("");
    try {
      const session = await authService.login(data);
      console.log(session);
      if (session) {
        const userData = await authService.getUserAccount();
        console.log(userData);
        console.log(session);

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
    <div className="flex max-w-3xl login-component">
      <div className="w-full text-black bg-gray-100 border-black/10 p-2  rounded-xl relative m-9">
        <div className="w-full ">
          <span>
            <Logo width="100%" />
          </span>
          <h2 className="text-center font-bold form-heading">Login your account</h2>
          <p className="text-center font-bold form-heading">
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
            <div className="space-y-5  flex flex-col justify-center align-middle">
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
              <Button children="Login" className="py-3 font-bold self-center"></Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
