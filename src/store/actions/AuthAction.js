import history from "../../helpers/History";
import * as types from "../constants/AuthConstants";
import * as typesApp from "../constants/AppConstants";
import {
  login,
  getUserByToken,
  logout as _logout,
} from "../../services/UserService";
import { showAlert } from "./AppAction";

export const authenticatesUser = (params) => async (dispatch) => {
  return new Promise((resolve, reject) => {
    login(params)
      .then((result) => {
        if (result.data.token == 0) {
          dispatch(
            showAlert({
              message:
                "This email needs to be confirmed. Check your email box to confirm it.",
              options: {
                variant: "warning",
                anchorOrigin: { vertical: "top", horizontal: "center" },
              },
            })
          );

          return reject();
        }

        sessionStorage.setItem("token", result.data.token);

        getUserByToken()
          .then((result) => {
            let user = result.data;

            sessionStorage.setItem("user", JSON.stringify(user));

            dispatch({
              type: types.SET_USER,
              user: user,
            });
            dispatch({
              type: types.LOGIN_SUCCESS,
            });
            if (history.location.pathname === "/login") {
              history.push("/");
            }

            resolve();
          })
          .catch((error) => {
            console.log(error.message);
            dispatch({
              type: types.LOGIN_FAILURE,
              error: error.message,
            });
            reject(error);
          });
      })
      .catch((error) => {
        dispatch({
          type: types.LOGIN_FAILURE,
          error: error.message,
        });
        reject(error);
      });
  });
};

export const logout = () => async (dispatch) => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");

  dispatch({
    type: typesApp.CLEAR_MODAL,
  });
  dispatch({
    type: types.LOGOUT,
  });
  await _logout();
};
