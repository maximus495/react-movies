import Input from "~/components/Inputs/Input/Input";
import Authtemplate from "~/templates/AuthTemplate/Authtemplate";
import { useLogin, IErrors } from './hooks/useLogin';
import groupfooter from "../../../assets/footergroup.png";
import backgroundfooter from "../../../assets/footer-font.png"
import "./Login.css"; 
import { useState } from "react";

const Login = () => {
  
  const { handleChangeEmail, handleChangePass, handleToken, handleCheckboxChange, email, pass, isEmpty, isError, isChecked } = useLogin();
  // const [isChecked, setIsChecked] = useState(false); 
  

  // const handleCheckboxChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
  //   setIsChecked(event.target.checked);
  //   validateEmail();
  //   validatePassword();
  // };

  
  return (
    <Authtemplate title="LOGIN">

      <div className="div-login">
        
        <h1>Login</h1>
        <h3>¡Bienvenido!</h3>

        <p className="span-space"></p>

        <p>Correo Electronico</p>
        <Input
          name="email"
          placeholder=""
          onChange={handleChangeEmail}
          value={email ?? ""}
          type="text"
        />
        {isError?.email && <div className="error">{isError?.email}</div>}
        
        <p>Password</p>
        <Input
          name="pass"
          placeholder=""
          onChange={handleChangePass}
          value={pass ?? ""}
          type="password"
        />
        {isError?.pass && <div className="error">{isError?.pass}</div>}
        <p className="span-space"></p>

        <input
          name="terms"
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        /> He leido y acepto los terminos y condiciones
        <p className="span-space"></p>
        
        <button 
          onClick={handleToken}
          className={!isChecked || isEmpty || Object.values(isError).filter(Boolean).length > 0 ? 'button-inactive' : 'button-active'}
          disabled={ !isChecked || isEmpty || Object.values(isError).filter(Boolean).length > 0 }
        >Crear cuenta</button>

        <h1>s{Object.values(isError).filter(Boolean).length}</h1>
       
      </div>

        
      <div className="div-footer" style={{ backgroundImage: `url(${backgroundfooter})`, backgroundSize: 'cover' }}>
        <h1>We are coding the world of tomorrow_</h1>
        <p className="texto-footer">
          DaCodes es una de las mejores empresas de desarrollo de software en México y LATAM. Lo que nos separa de los demás 
          es el nivel de involucramiento que tenemos en nuestros proyectos y la pasión que tenemos por desarrollar productos 
          digitales de calidad mundial. Somos un equipo de 220+ dacoders especializados en la planeación, diseño, desarrollo, 
          implementación e innovación continua de productos digitales disruptivos.
        </p>
        <img src={groupfooter} alt="Foto-footer" />
      </div>
     
    </Authtemplate>
  );
};

Login.displayName = "Login";

export default Login;
