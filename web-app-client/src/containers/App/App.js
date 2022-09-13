import React, { useEffect, useState } from "react";
import useRoutes from '../../routes/routes';
import styles from './App.module.css';
import { BrowserRouter } from "react-router-dom";
import { useAppSelector } from '../../hooks/redux.hook';
import { useDispatch } from "react-redux";
import { authUpdate } from "../../store/actions/AuthAction";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// стили для карты
import 'mapbox-gl/dist/mapbox-gl.css';

const App = () => {
  const config = useAppSelector(state => state.configReducer);
  const auth = useAppSelector(state => state.authReducer);
  const dispatch = useDispatch();
  const [authenticated, setAuthenticated] = useState(auth.isAuthenticated);

  useEffect(() => {
    dispatch(authUpdate());
  }, []);

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