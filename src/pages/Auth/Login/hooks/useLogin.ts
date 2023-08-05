import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export interface IErrors {
  email: string | null;
  pass: string | null;
  isChecked?: boolean | string;
}

export const useLogin = () => {
  const [ email, setEmail ] = useState('');
  const [ pass, setPass ] = useState('');
  const [ isChecked, setIsChecked ] = useState(false);

  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const [isError, setIsError] = useState<IErrors>({
    email: " ",
    pass: " ",
  });
 
  const navigate = useNavigate();

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.name === "email" &&
        setIsError({
          ...isError,
          [e.target.name]: !validEmail(e.target.value)
            ? "Escribe un email valido."
            : null,
        });
    setEmail(e.target.value);
    setIsEmpty(!(e.target.value.length > 0));
    console.log('setIsEmpty-email: ',!(e.target.value.length > 0))
  };

  const handleChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.name === "pass" &&
    setIsError({
      ...isError,
      [e.target.name]:
        e.target.value.length < 7
          ? "La contraseña debe tener al menos 7 caracteres."
          : null,
    });
    setPass(e.target.value);
    setIsEmpty(!(e.target.value.length > 0));
    console.log('setIsEmpty-pass: ',!(e.target.value.length > 0))
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    setIsEmpty(!e.target.checked);
  };

  const handleToken = async () => {

    if (isChecked || !isEmpty || Object.values(isError).filter(Boolean).length == 0) {

      const options = {
        method: "GET",
        url: "https://api.themoviedb.org/3/authentication/guest_session/new",
        headers: {
          accept: "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTExY2U2ZTBjNGUxZjQ4M2E3NDIxMDNjMDJmYjZmOSIsInN1YiI6IjY0MTM3ZDEyYTZjMTA0MDA3OTA3MTM2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IhXW1F90EvMAP_AMkFrEfMJdyuswuVnBY6_KlyVMkO0`,
        },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          const token = response.data.guest_session_id;
          sessionStorage.setItem("token", response.data.guest_session_id);
          setTimeout(() => {
            navigate("/dashboard", {
              state: {
                token,
                username: email,
                expires_at: response.data.expires_at,
              },
            });
          });
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  return { 
    handleChangeEmail, 
    handleChangePass, 
    handleToken, 
    handleCheckboxChange,
    email, 
    pass, 
    isChecked,
    isEmpty,
    isError };
};

const validEmail = (email: string): boolean =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
