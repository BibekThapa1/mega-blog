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

  async function submit(data) {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getUserAccount();
        if (userData) {
          dispatch(storeLogin(userData));
          navigate("/");
        }else{
          setError("error occured");
        }
      } else {
        setError("error occured");
      }
    } catch (error) {
      setError(error);
      console.log(error);
    }
  }

  return (
    <div className="flex max-w-3xl">
      <div className="w-full text-black bg-gray-100 border-black/10 p-8 px-10 rounded-xl relative m-9">
        <button
          className="absolute right-9 top-5 font-bold text-2xl cursor-pointer border-2 border-black p-1 px-2 rounded"
          onClick={() => navigate(-1)}
        >
          X
        </button>
        <div className="w-full">
          <span>
            <Logo width="100%" />
          </span>
          <h2 className="text-center font-bold text-2xl">
            Sign to your account
          </h2>
          <p className="text-center font-bold text-2xl">
            {" "}
            Dont&apos;t have an account ,&nbsp;
            <Link
              className="font-bold text-balance m-2  underline"
              to={"/Signup"}
            >
              Sign Up
            </Link>
          </p>
          {error && <p className="p-5 text-bold text-black">{error}</p>}
          <form onSubmit={handleSubmit(submit)} className="mt-6">
            <div className="space-y-5">
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
              <Button
                type="submit"
                children="Login"
                className="py-3 font-bold"
              ></Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
