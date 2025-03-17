type BtnType = {
  children: React.ReactNode;
  classname?: string;
  type?: "submit" | "button" | "reset";
  onClick?: () => void;
};

const Button = ({ children, classname, type = "button", onClick }: BtnType) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`text-[16px] px-5 py-3 border rounded-md cursor-pointer ${classname}`}
    >
      {children}
    </button>
  );
};

export default Button;
