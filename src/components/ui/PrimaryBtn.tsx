interface PrimaryBtnProps extends React.HTMLProps<HTMLButtonElement> {
  rounded?: string;
  text: string;
  type?: "button" | "reset" | "submit";
  className?: string;
  disabled?: boolean;
}

const PrimaryBtn = ({
  rounded,
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
      className={`bg-btn-color font-montserrat z-10 py-2 md:py-3 px-6 font-semibold text-[#FAFFFF] whitespace-nowrap ${rounded} active:scale-95 transition-all duration-300 shadow-[0px_4px_16px_rgba(149,_87,_253,_0.25)] gradient-button ${className}`}
    >
      {text}
    </button>
  );
};

export default PrimaryBtn;
