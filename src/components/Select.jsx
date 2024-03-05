import React, { useId } from "react";

const Select = ({ options = [], label, className = "", ...props }, ref) => {
  const id = useId();
  return (                            
    <div className="w-full">
      {label && (
        <label className="inline-block w-full px-3 py-2" htmlFor={id}></label>
      )}
      <select
        {...props}
        id={id}
        className={`${className} p-2 bg-white text-black`}
        ref={ref}
      >
        {options?.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default React.forwardRef(Select);
