import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./store/actions";

function MonkeyAxios() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.accesToken);
  useEffect(() => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    axios.defaults.baseURL = "http://localhost:8000/api/v1";
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          dispatch(actions.authLogout());
        }
        return Promise.reject(error);
      }
    );
  }, [dispatch, token]);
  return axios;
}

export default MonkeyAxios;
