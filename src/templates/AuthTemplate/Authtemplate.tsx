import React from "react";
import "./Authtemplate.css";
// import { useSelector } from "react-redux";
// import { RootState } from "~/redux/store/store";
import loginImage from "../../assets/login.png";
import dacodesImage from "../../assets/DacodesLogo.png";
import { useNavigate } from "react-router-dom";

interface AuthTemplateI {
  children: React.ReactNode;
  title?:string
}

const Authtemplate = ({ title='', children }: AuthTemplateI) => {
  // const { Email } = useSelector((state:RootState)=>state.login)
  const navigate = useNavigate();
  console.log(title)
  return (
    <div className="auth-template">
      <div className="navbar">
        <img className="image-navbar" src={dacodesImage} alt="" />
        <img className="image-navbar" src={loginImage} alt="" onClick={()=> navigate("/")} />
      </div>
     
      <div className="body">
        {children}
      </div>
      {/* <div className="footer-container">
        <h1>Footer</h1>
        <p>
          {" "}
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
          modi exercitationem in ipsa deserunt? Ea quisquam ipsam tenetur.
          Doloribus tempore quo laboriosam optio ad iusto at rerum iste ea cum.
        </p>
      </div> */}
    </div>
  );
};

Authtemplate.dislayName = "Authtemplate";
export default Authtemplate;