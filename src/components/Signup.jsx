import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Logo, Button } from "./index.js";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { login } from "../store/authSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const { handleSubmit, register } = useForm();

  const create = async (data) => {
    setError("");

    try {
      const userData = await authService.createAccount(data);
      console.log(userData)
      if (userData) {
        const userData = await authService.getUserAccount();
        console.log(userData)
        if (userData) dispatch(login(userData));
      }
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-wrap max-w-3xl	">
      <div className="w-full p-3 text-black rounded-xl bg-slate-100 relative m-9">
        
        <div className="p-2">
          <Logo width="100%" />
        </div>
        <h2 className="text-xl mt-3 font-bold">Sign Up to Create An Account</h2>
        <p className="font-bold text-xl">
          Already have an Account?&nbsp;
          <Link to={"/login"} className="font-bold text-2xl underline">
            Login
          </Link>
        </p>
        {error && <p className="space-y-4 text-xl font-bold">Error; {error}</p>}

        <form className="mt-6" onSubmit={handleSubmit(create)}>
          <div className="space-y-3">
            <Input
              label="Full Name: "
              placeholder="Enter Your full name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email :"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must Be a valid address",
                },
              })}
            />
            <Input
              label="Password :"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="mt-4 cursor-pointer">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
