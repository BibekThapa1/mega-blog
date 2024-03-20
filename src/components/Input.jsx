import React, { useId ,useState} from "react";
import Button from "./Button";

const Input = React.forwardRef(function Input(
  { label, className = "", type = "text", ...props },
  ref
) {
  const id = useId();
  const [passView, setPassView] = useState(false)

  function changePassView(){
    setPassView(!passView)
  }

  return (
    <div className="w-full">
      {label && (
        <label className="inline-block pl-1 " htmlFor="id">
          {label}
        </label>
      )}
      <div className="flex justify-between bg-white rounded-xl">
      <input
        type={passView?"text":type}
        className={`${className} p-2 rounded-lg  text-black w-full`}
        ref={ref}
        id={id}
        {...props}
      />
      {type==="password" && <button type="button" onClick={changePassView}
      className="m-1 mr-3 rounded-md cursor-pointer bg-slate-100"
      >show</button>}
      </div>
    </div>
  );
});

export default Input;
