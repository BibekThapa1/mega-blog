import React from "react";

const Button = (
  {
    type = "button",
    className = "",
    children,
    bgColor = "bg-blue-600",
    textColor = "text-white",
    ...props
  }
) => {
  return (
    <button
      className={`${className} ${bgColor} ${textColor} px-4 py-2 rounded-xl`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
