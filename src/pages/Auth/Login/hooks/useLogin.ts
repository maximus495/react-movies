import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setEmail } from "~/redux/reducers/loginReducer";
import { RootState } from "~/redux/store/store";

export const useLogin = () => {
  const { Email } = useSelector((state: RootState) => state.login);
  const [pass, passText] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleNavigateDashboard = () => {
    navigate("/dashboard");
  };
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(e.target.value));
    validateEmail();
  };
  const handleChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    passText(e.target.value);
    validatePassword();
  };

  const validateEmail = () => {
    if (!Email.match(/^\S+@\S+\.\S+$/)) {
      setEmailError('Ingrese un correo válido');
    } else {
      setEmailError('');
    }
  };
  
  const validatePassword = () => {
    if (pass.length < 7) {
      console.log('entro a pass')
      setPasswordError('La contraseña debe tener al menos 7 caracteres');
    } else {
      setPasswordError('');
    }
  };

  const handleToken = async () => {

    validateEmail();
    validatePassword();

    if (!emailError && !passwordError) {

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
                username: Email,
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
  return { handleNavigateDashboard, handleChangeEmail, handleChangePass, handleToken, Email, pass, validateEmail, validatePassword, emailError, passwordError };
};
