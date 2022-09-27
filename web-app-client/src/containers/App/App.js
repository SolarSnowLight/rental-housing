import React, { useEffect, useState } from "react";
import useRoutes from '../../routes/routes';
import { BrowserRouter } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hook';
import { useDispatch } from "react-redux";
import { authUpdate } from "../../store/actions/AuthAction";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { ToastContainer } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";

import styles from './App.module.css';
import 'react-toastify/dist/ReactToastify.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import userAction from "src/store/actions/UserAction";
import { useMessageToastify } from "src/hooks/message.toastify.hook";

const App = () => {
  const config = useAppSelector(state => state.configReducer);
  const authSelector = useAppSelector(state => state.authReducer);
  const dispatch = useAppDispatch();
  const [authenticated, setAuthenticated] = useState(authSelector.isAuthenticated);
  const message = useMessageToastify();

  useEffect(() => {
    dispatch(authUpdate());
  }, []);

  useEffect(() => {
    if (authSelector.access_token) {
      dispatch(userAction.getUserCompany());
    }
  }, [authSelector]);

  useEffect(() => {
    if (authSelector.error && authSelector.error.length) {
      message(authSelector.error, "error");
    }
  }, [authSelector.error]);
  
  const routes = useRoutes(authSelector.isAuthenticated);

  return (
    <BrowserRouter>
      <Navbar />
      {routes}
      <Footer />
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  )
}

export default App;