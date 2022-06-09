import React, { useState, useCallback, useEffect } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import logo from '../../../../../logo-420-x-108.png';
import { ILoginParams } from '../../../../../models/auth';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../../redux/reducer';
import { Action } from 'redux';
import { fetchThunk } from '../../../../common/redux/thunk';
import { API_PATHS } from '../../../../../configs/api';
import { RESPONSE_STATUS_SUCCESS } from '../../../../../utils/httpResponseCode';
import { setUserInfo } from '../../../redux/authReducer';
import Cookies from 'js-cookie';
import { ROUTES } from '../../../../../configs/routes';
import { replace } from 'connected-react-router';
import { getErrorMessageResponse } from '../../../../../utils';
import { ACCESS_TOKEN_KEY } from '../../../../../utils/constants';
import styles from "./loginPage.module.scss"

const LoginPage = () => {
  const { user } = useSelector((state: AppState) => ({
    user: state.profile.user,
  }));
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onLogin = useCallback(
    async (values: ILoginParams) => {
      setErrorMessage('');
      setLoading(true);

      const json = await dispatch(
        fetchThunk(API_PATHS.signIn, 'post', { email: values.email, password: values.password }),
      );

      setLoading(false);

      if (json?.code === RESPONSE_STATUS_SUCCESS) {
        dispatch(setUserInfo(json.data));
        Cookies.set(ACCESS_TOKEN_KEY, json.data.token, { expires: values.rememberMe ? 7 : undefined });
        dispatch(replace(ROUTES.home));
        return;
      }

      setErrorMessage(getErrorMessageResponse(json));
    },
    [dispatch],
  );

  useEffect(() => {
    const redirectToHomeIfLoggedIn = (): void => {
      if (user) {
        dispatch(replace(ROUTES.home));
      }
    }
    redirectToHomeIfLoggedIn();
  }, [dispatch, user])

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center flex-column">
      <img src={logo} alt="" className={styles["login__logo"]} />

      <LoginForm onLogin={onLogin} loading={loading} errorMessage={errorMessage} />
    </div>
  );
};

export default LoginPage;
