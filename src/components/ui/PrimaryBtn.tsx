interface PrimaryBtnProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  rounded?: string;
  text: string;
  type?: "button" | "reset" | "submit";
  className?: string;
  disabled?: boolean;
}

const PrimaryBtn = ({
  rounded = "rounded-full",
  text,
  type = "button",
  className = "",
  disabled = false,
  ...props
}: PrimaryBtnProps) => {
  return (
    <button
      {...props}
      disabled={disabled}
      type={type}
      className={`
        relative z-10 
        whitespace-nowrap
        px-7 py-3
        font-montserrat font-semibold
        text-gray-900
        bg-gradient-to-r from-[#d9f339] to-[#e6ff73]
        ${rounded}
        transition-all duration-300
        hover:shadow-[0_6px_30px_rgba(217,243,57,0.6)]
        active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
        overflow-hidden
        cursor-pointer
        ${className}
      `}
    >
      <span className="relative z-10">{text}</span>
    </button>
  );
};

export default PrimaryBtn;
