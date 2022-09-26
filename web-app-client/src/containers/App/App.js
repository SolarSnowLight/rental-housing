import React, { useEffect, useState } from "react";
import useRoutes from '../../routes/routes';
import { BrowserRouter } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hook';
import { useDispatch } from "react-redux";
import { authUpdate } from "../../store/actions/AuthAction";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { ToastContainer } from "react-toastify";

import styles from './App.module.css';
import 'react-toastify/dist/ReactToastify.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import userAction from "src/store/actions/UserAction";

const App = () => {
  const config = useAppSelector(state => state.configReducer);
  const auth = useAppSelector(state => state.authReducer);
  const dispatch = useAppDispatch();
  const [authenticated, setAuthenticated] = useState(auth.isAuthenticated);

  useEffect(() => {
    dispatch(authUpdate());
  }, []);

  useEffect(() => {
    if (auth.access_token) {
      dispatch(userAction.getUserCompany());
    }
  }, [auth])

  const routes = useRoutes(auth.isAuthenticated);

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