import React, { useId } from "react";

const input = React.forwardRef(function Input(
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
      <input
        type={type}
        className={`${className} p-2 rounded-lg bg-white text-black w-full`}
        ref={ref}
        id={id}
      />
    </div>
  );
});

export default input;
