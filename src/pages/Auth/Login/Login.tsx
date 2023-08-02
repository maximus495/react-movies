import Input from "~/components/Inputs/Input/Input";
import Authtemplate from "~/templates/AuthTemplate/Authtemplate";
import { useLogin } from "./hooks/useLogin";
import groupfooter from "../../../assets/footergroup.png";
import backgroundfooter from "../../../assets/footer-font.png"
import "./Login.css"; 
import { useState } from "react";

const Login = () => {
  
  const { handleChangeEmail, handleToken, Email } = useLogin();
  const [isChecked, setIsChecked] = useState(false); 
  

  const handleCheckboxChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
    setIsChecked(event.target.checked);
  };



  return (
    <Authtemplate title="LOGIN">

      <div className="div-login">
        
        <h1>Login</h1>
        <h3>¡Bienvenido!</h3>

        <p className="span-space"></p>

        <p>Correo Electronico</p>
        <Input
          name=""
          placeholder=""
          onChange={handleChangeEmail}
          value={Email}
        />
        
        <p className="span-space"></p>

        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        /> He leido y acepto los terminos y condiciones
        <p className="span-space"></p>
        
        <button 
          onClick={handleToken}
          className={isChecked && Email ? 'button-active' : 'button-inactive'}
          disabled={!isChecked || !Email}
        >Crear cuenta</button>
       
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
