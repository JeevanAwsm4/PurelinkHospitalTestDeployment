import React from 'react'
interface Props  {
  onClick : () => void;
  disabled : boolean;
  children : React.ReactNode;
  className ?:string
}
const Button = ({ children, disabled, onClick, className }: Props) => {
  const bg = !disabled ? "bg-[#7464F0]" : "bg-gray-300";
  return (
    <button
      onClick={onClick}
      className={`${bg} w-full rounded-lg p-3 text-[1rem] font-semibold leading-[1.5rem] text-center text-white ${className}`}
    >
      {children}
    </button>
  );
};

export default Button