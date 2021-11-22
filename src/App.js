import React, { lazy, useEffect, Suspense } from 'react';
import { Switch } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { authOperations, authSelectors } from './redux/auth';
import './App.css';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import PublicRoute from './components/PublicRoute/PublicRoute';
import Loader from './components/Loader/Loader';

const HomePage = lazy(() =>
  import('./pages/HomePage/HomePage' /* webpackChunkName: "home-page" */),
);
const RegisterPage = lazy(() =>
  import('./pages/RegisterPage/RegisterPage' /* webpackChunkName: "register-page" */),
);
const LoginPage = lazy(() =>
  import('./pages/LoginPage/LoginPage' /* webpackChunkName: "login-page" */),
);
const ReportsPage = lazy(() =>
  import('./pages/ReportsPage/ReportsPage' /* webpackChunkName: "reports-page" */),
);

const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage/NotFoundPage' /* webpackChunkName: "not-found-page" */),
);

const GoogleRedirectPage = lazy(() =>
  import(
    './pages/GoogleRedirectPage/GoogleRedirectPage' /* webpackChunkName: "google-redirect-page" */
  ),
);

function App() {
  const dispatch = useDispatch();
  const isFetchingCurrentUser = useSelector(authSelectors.getIsFetchingCurrentUser);

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);

  return (
    !isFetchingCurrentUser && (
      <>
        <Suspense fallback={<Loader />}>
          <Switch>
            <PrivateRoute exact path="/">
              <HomePage />
            </PrivateRoute>
            <PublicRoute path="/register" restricted>
              <RegisterPage />
            </PublicRoute>
            <PublicRoute path="/login" restricted>
              <LoginPage />
            </PublicRoute>
            <PrivateRoute exact path="/reports">
              <ReportsPage />
            </PrivateRoute>
            <PublicRoute path="/google-redirect">
              <GoogleRedirectPage />
            </PublicRoute>
            <PublicRoute>
              <NotFoundPage />
            </PublicRoute>
          </Switch>
        </Suspense>
        <ToastContainer autoClose={3000} position="top-right" />
      </>
    )
  );
}

export default App;
