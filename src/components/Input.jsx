import React, { useId ,useState} from "react";
import Button from "./Button";

const Input = React.forwardRef(function Input(
  { label, className = "", type = "text", ...props },
  ref
) {
  const id = useId();


  return (
    <div className="w-full">
      {label && (
        <label className="inline-block pl-1 " htmlFor="id">
          {label}
        </label>
      )}
      <div className="flex justify-between bg-white rounded-xl">
      <input
        type={type}
        className={`${className} p-2 rounded-lg  text-black w-full`}
        ref={ref}
        id={id}
        {...props}
      />
      
      </div>
    </div>
  );
});

export default Input;
