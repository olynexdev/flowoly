import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface ShinyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const ShinyButton = ({
  children,
  className = "",
  ...rest
}: ShinyButtonProps) => {
  return (
    <button
      {...rest}
      className={cn(
        "px-6 md:px-8 py-2 md:py-3 rounded-lg relative bg-[#19191980] active:scale-75 backdrop-blur-xl text-white text-text16 hover:shadow-2xl hover:shadow-white/[0.1] transition duration-300 border border-slate-600 font-poppins whitespace-nowrap cursor-pointer",
        className
      )}
    >
      <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-primary to-transparent" />
      <span className="relative z-20 text-white">{children}</span>
    </button>
  );
};

export default ShinyButton;
