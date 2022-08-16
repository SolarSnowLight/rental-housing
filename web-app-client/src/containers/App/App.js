import React, { useEffect } from "react";
import useRoutes from '../../routes/routes';
import styles from './App.module.css';
import { BrowserRouter } from "react-router-dom";
import { useAppSelector } from '../../hooks/redux.hook';
import { useDispatch } from "react-redux";
import { authUpdate } from "../../store/actions/AuthAction";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const App = () => {
  const config = useAppSelector(state => state.configReducer);
  const auth = useAppSelector(state => state.authReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authUpdate());
  }, []);

  const isAuthenticated = !!auth.access_token;

  const routes = useRoutes(isAuthenticated);

  return (
    <BrowserRouter>
      <Navbar />
      {routes}
      <Footer />
    </BrowserRouter>
  )
}

export default App;