"use client";

import { useFormStatus } from "react-dom";

interface FormButtonProps {
  children: React.ReactNode;
  color?: string;
  successMessage?: string | null;
  small?: boolean;
  size?: string;
  type?: string;
  className?: string;
}

export default function FormButton({
  children,
  color = "blue",
  successMessage,
  size = "large",
  type = "admin",
  className = "",
}: FormButtonProps) {
  const { pending } = useFormStatus();
  if (pending) {
    successMessage = null;
  }

  const disabledClass = pending ? "bg-slate-300 hover:bg-slate-300" : "";

  let colorClass;
  switch (color) {
    case "blue": {
      colorClass = "bg-blue-500 hover:bg-blue-600";
      break;
    }
    case "green": {
      colorClass = "bg-green-500 hover:bg-green-600";
      break;
    }
    case "red": {
      colorClass = "bg-red-500 hover:bg-red-600";
      break;
    }

    case "redGradient": {
      colorClass =
        "bg-gradient-to-r from-darkRed1 to-darkRed2 hover:bg-gradient-to-l";
      break;
    }
  }

  let typeClass;
  switch (type) {
    case "admin": {
      typeClass = "border-0 rounded-md text-white";
      break;
    }
    case "user": {
      typeClass = "border-0 text-white";
      break;
    }
  }

  // const sizeClass = small
  //   ? "p-[5px] w-[150px] text-base"
  //   : "w-full p-[10px] md:p-[30px]";

  let sizeClass;
  switch (size) {
    case "large": {
      sizeClass = "w-full p-[10px] md:p-[30px]";
      break;
    }
    case "small": {
      sizeClass = "p-[5px] w-[150px] text-base";
      break;
    }

    case "user": {
      sizeClass = "p-[5px] w-full";
      break;
    }
  }

  return (
    <div className="">
      <button
        className={`cursor-pointer text-center block ${typeClass} ${colorClass} ${disabledClass} ${sizeClass} ${className}`}
        type="submit"
        disabled={pending}
      >
        {pending ? "Загружаем..." : children}
      </button>
      <p className="text-emerald-600 text-center">{successMessage}</p>
    </div>
  );
}
