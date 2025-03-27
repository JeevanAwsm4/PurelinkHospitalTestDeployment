import React from "react";

interface Props {
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<Props> = ({
  children,
  disabled = false,
  isLoading = false,
  onClick,
  className,
  type = "button",
}) => {
  const bg =
    !disabled && !isLoading
      ? "bg-[#7464F0] "
      : "bg-gray-300 cursor-not-allowed";

  return (
    <button
      onClick={onClick}
      className={`${bg} w-full flex items-center justify-center rounded-lg p-3 text-[1rem] font-semibold leading-[1.5rem] text-center text-white ${className}`}
      type={type}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
