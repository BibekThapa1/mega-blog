import React, { useId, useState } from "react";
import Button from "./Button";

const Input = React.forwardRef(function Input(
  { label, className = "", type = "text", ...props },
  ref
) {
  const id = useId();

  const [setshowBtn, setSetshowBtn] = useState(false);

  return (
    <div className="w-full border-none">
      {label && (
        <label className="inline-block pl-1 " htmlFor={id}>
          {label}
        </label>
      )}
      <div className="flex justify-between bg-white rounded-xl">
        <input
          type={setshowBtn?"text":type}
          className={`${className} p-2 rounded-lg  text-black w-full outline-none`}
          ref={ref}
          id={id}
          {...props}
        />
        {type == "password" && (
          <button
            className=" bg-slate-300 text-black  text-sm rounded-xl w-16"
            type="button"
            onClick={() => setSetshowBtn(!setshowBtn)}
          >
            {setshowBtn ? "Hide" : "Show"}
          </button>
        )}
      </div>
    </div>
  );
});

export default Input;
