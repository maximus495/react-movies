import { BrowserRouter, Routes, Route } from "react-router-dom";
// import ForgotPassword from "~/pages/Auth/ForgotPassword/ForgotPassword";
import Login from "~/pages/Auth/Login/Login";
import Dashboard from "~/pages/Home/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";

const RouterApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
        <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default RouterApp;
