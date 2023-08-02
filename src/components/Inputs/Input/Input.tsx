
interface InputI {
  name: string;
  isUser?: boolean;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const Input = ({ name, isUser, placeholder, onChange, value }: InputI) => {
  if (isUser === true) return null;
  return (
    <div>
      <label>{name}</label>
      <input className="input-container"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
