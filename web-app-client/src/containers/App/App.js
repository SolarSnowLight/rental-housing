import React, { useEffect } from "react";
import useRoutes from '../../routes/routes';
import styles from './App.module.css';
import { BrowserRouter } from "react-router-dom";
import { useAppSelector } from '../../hooks/redux.hook';

const App = () => {
  const config = useAppSelector(state => state.configReducer);
  const auth = useAppSelector(state => state.authReducer);

  const isAuthenticated = !!auth.access_token;
  const routes = useRoutes(isAuthenticated);

  return (
    <BrowserRouter>
      {routes}
    </BrowserRouter>
  )
}

export default App;