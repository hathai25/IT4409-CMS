 import './App.scss'
import Layout from "./pages/Layout/index.jsx";
import {Outlet, useNavigate} from "react-router-dom";
import setupAxiosDefault from "./services/setupAxios.js";
 import {useEffect} from "react";

setupAxiosDefault();

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const getAuthUser = () => {
      const token = localStorage.getItem("admin_token");

      if (!token) {
        navigate("/login");
      }
    };

    getAuthUser();
  }, []);
  return (
    <div className="App">
      <Layout>
        <Outlet/>
      </Layout>
    </div>
  )
}

export default App
