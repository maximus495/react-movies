
interface InputI {
  name: string;
  isUser?: boolean;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type: string;
}

const Input = ({ name, isUser, placeholder, onChange, value, type }: InputI) => {
  if (isUser === true) return null;
  return (
    <div>
      {/* <label>{name}</label> */}
       <input className="input-container" 
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
      />
    </div>
  );
};

export default Input;
