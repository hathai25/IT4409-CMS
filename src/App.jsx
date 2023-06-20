 import './App.scss'
import Layout from "./pages/Layout/index.jsx";
import {Outlet} from "react-router-dom";
import setupAxiosDefault from "./services/setupAxios.js";
 import {useEffect} from "react";

setupAxiosDefault();

function App() {
  const token = localStorage.getItem("admin_token");
  useEffect(() => {
    if (token) {
      const payload = token?.split(".")[1];
      const decodedPayload = atob(payload);
      const {exp, roles} = JSON.parse(decodedPayload);
      const expirationTime = (exp * 1000) - 60000;
      const isExpired = Date.now() >= expirationTime;
      if (isExpired) {
        window.location.href = "/login";
      }
    }
    else {
      window.location.href = "/login";
    }
  }, [token]);

  return (
    <div className="App">
      <Layout>
        <Outlet/>
      </Layout>
    </div>
  )
}

export default App
