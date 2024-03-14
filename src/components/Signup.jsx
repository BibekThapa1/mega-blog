import React from "react";
import { useForm } from "react-hook-form";
import { Input, Logo, Button } from "./index";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { login } from "../store/authSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const { handleSubmit, register } = useForm();
  async function submit(data) {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) dispatch(login(userData));
      navigate("/");
    } catch (error) {
      setError(error);
    }
  }

  return (
    <div className="w-full flex">
      <div className="p-3 text-black">
        <div className="p-2">
          <Logo width="100%" />
        </div>
        <h2 className="mt-3 font-bold">Sign Up to Create An Account</h2>
        <p className="font-bold">
          Already have an Account?&nbsp;
          <Link to={"./Login.jsx"} className="font-bold text-2xl">
            Login
          </Link>
        </p>
        {error && <p className="space-y-4 text-xl font-bold">Error; {error}</p>}
        <form className="mt-6" onSubmit={handleSubmit(submit)}>
          <div className="space-y-3">
            <Input
              label="Full Name: "
              type="text"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test() ||
                    "Email Address Must Be a Valid Address",
                },
              })}
            />
            <Input
              label="Password"
              type="password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="mt-4" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
