import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { Provider } from 'react-redux'
import store from './redux/store/store.js'
import {ROUTER} from "./router.jsx";
import Login from "./pages/Login/index.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<App/>}>
          {ROUTER.map((item, index) =>
            <Route path={item.path} element={item.element} key={index}/>
          )}
        </Route>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </Provider>
  </BrowserRouter>,
)
