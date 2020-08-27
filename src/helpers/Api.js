import axios from "axios";
import history from "../helpers/History";
import { logout } from "../store/actions/AuthAction";
import { showAlert, toogleLoading } from "../store/actions/AppAction";

import store from "../store";

const api_time = axios.create({
  //baseURL: process.env.NODE_ENV !== 'production' ? 'http://0.0.0.0:3000/api/' : '',
  baseURL: "http://hitech-luiz-api.eu-west-1.elasticbeanstalk.com/",
  //baseURL: "http://127.0.0.1:8080/hitech-health-api/",
  headers: {
    token: `${sessionStorage.getItem("token")}`,
  },
});

let loadFunction = (config) => {
  if (sessionStorage.getItem("token")) {
    config.headers["token"] = sessionStorage.getItem("token");
  } else {
    config.headers["token"] = null;
  }
  store.dispatch(toogleLoading());

  return config;
};

let finishFunction = (response) => {
  store.dispatch(toogleLoading());
  let result = {
    data: null,
    message: "",
  };
  try {
    if (response) {
      result.data = response.data;
      result.message = "Requisição finalizada com sucesso!";
      return Promise.resolve(result);
    } else {
      result.data = null;
      result.message = "Erro desconhecido";
      return Promise.reject(result);
    }
  } catch (error) {
    result.message = error.message;
    return Promise.reject(result);
  }
};

let errorFunction = (error) => {
  store.dispatch(toogleLoading());
  let result = {
    data: null,
    message: "",
    status: "",
  };

  try {
    if (error.message && error.message === "Network Error") {
      if (history.location.pathname !== "/login") {
        store.dispatch(logout());
      }
      result.message = "unable to access the server";
    } else {
      if (
        error.response.status === 401 &&
        error.config &&
        !error.config.__isRetryRequest
      ) {
        if (history.location.pathname !== "/login") {
          result.message = error.response.data.message;
          store.dispatch(logout()).then(() => {
            store.dispatch(
              showAlert({
                message: error.response.data.erro,
                options: {
                  variant: "warning",
                  anchorOrigin: { vertical: "top", horizontal: "center" },
                },
              })
            );
          });
        } else {
          result.message = error.response.data.message;
        }
      } else if (error.response.status === 403) {
        if (history.location.pathname !== "/login") {
          result.message = error.response.data.erro;
          store.dispatch(logout()).then(() => {
            store.dispatch(
              showAlert({
                message: "Session expired! Please log in again.",
                options: {
                  variant: "warning",
                  anchorOrigin: { vertical: "top", horizontal: "center" },
                },
              })
            );
          });
        } else {
          result.message = error.response.data.erro;
        }
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.errors
      ) {
        //Array de error será retornado quando a API faz o tratamento.
        for (var idx in error.response.data.errors) {
          if (error.response.data.errors[idx].message) {
            if (error.response.data.errors[idx].field) {
              result.message +=
                error.response.data.errors[idx].message +
                " field: " +
                error.response.data.errors[idx].field +
                "\n";
            } else {
              result.message += error.response.data.errors[idx].message + "\n";
            }
          } else if (error.message) {
            result.message += error.message + "\n";
          }
        }
      } else if (error.response && error.response.data) {
        result.message = error.response.data;
      } else if (error.message) {
        result.message = error.message;
      }
    }

    result.status = error.response.status;

    if (result.status != 403) {
      store.dispatch(
        showAlert({
          message: result.message,
          options: {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "center" },
          },
        })
      );
    }

    return Promise.reject(result);
  } catch (error) {
    result.message = error.message;
    return Promise.reject(result);
  }
};

api_time.interceptors.request.use(loadFunction);
api_time.interceptors.response.use(finishFunction, errorFunction);

export default api_time;
