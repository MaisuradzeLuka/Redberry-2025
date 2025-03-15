type BtnType = {
  children: React.ReactNode;
  classname?: string;
  type?: "submit" | "button" | "reset";
};

const Button = ({ children, classname, type = "button" }: BtnType) => {
  return (
    <button
      type={type}
      className={`text-[16px] px-5 py-3 border rounded-md cursor-pointer ${classname}`}
    >
      {children}
    </button>
  );
};

export default Button;
