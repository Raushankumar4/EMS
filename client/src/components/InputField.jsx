import React, { forwardRef, useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";

const InputField = forwardRef(
  (
    {
      value,
      name,
      onChange,
      type = "text",
      disabled,
      label,
      error,
      className,
      accept,
      id,
      autoComplete = "off",
      placeholder,
      icon,
      ...props
    },
    ref
  ) => {
    const [showIcon, setShowIcon] = useState(false);

    const handleOnShow = () => {
      setShowIcon(!showIcon);
    };

    const inputType = type === "password" && showIcon ? "text" : type;

    const inputClasses = `block w-full ${icon ? "pl-3" : "pl-3"} pr-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
      className || ""
    } ${
      error
        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
        : "border-gray-300"
    } ${
      disabled
        ? "cursor-not-allowed bg-gray-100 dark:bg-gray-700 dark:text-gray-400"
        : "bg-white dark:bg-gray-900 dark:text-white"
    }`;

    return (
      <div className="w-full max-w-md mx-auto mb-6">
        {label && (
          <label
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            htmlFor={id}
          >
            {label}
          </label>
        )}
        <div className="relative mt-1">
          {icon && (
            <span
              onClick={handleOnShow}
              className="absolute inset-y-0 right-6 pl-3 flex items-center cursor-pointer pointer-events-auto"
            >
              {showIcon ? <FaRegEye /> : <FaRegEyeSlash />}
            </span>
          )}
          <input
            type={inputType}
            name={name}
            id={id}
            value={value}
            accept={accept}
            onChange={onChange}
            disabled={disabled}
            placeholder={placeholder}
            autoComplete={autoComplete}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            {...props}
            ref={ref}
            className={inputClasses}
          />
        </div>
        {error && (
          <p
            id={`${id}-error`}
            className="mt-2 text-sm text-red-600 dark:text-red-500"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

export default InputField;
