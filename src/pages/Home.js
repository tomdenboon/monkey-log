import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as action from "../store/actions";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { FiLoader } from "react-icons/fi";
import MonkeyAxios from "../MonkeyAxios";

function LoginCard(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const axios = MonkeyAxios();

  const login = () => {
    axios
      .post("login", {
        email: email,
        password: password,
      })
      .then((res) => {
        dispatch(action.authLogin(res.data));
      })
      .catch((err) => {
        setIsLogin(false);
        setEmail("");
        setPassword("");
        setMessage(err.response.data.message);
        console.log(err.response.data);
      });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setIsLogin(true);
    login();
  };

  return (
    <div
      className={
        "flex w-[350px] p-5 rounded-lg filter drop-shadow-md bg-white m-auto flex-shrink-0"
      }
    >
      {isLogin && (
        <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2  flex ">
          <FiLoader className="animate-spin-slow" />
        </div>
      )}
      <div
        className={
          "w-full flex flex-col items-center " +
          (isLogin ? "invisible" : "visible")
        }
      >
        <div className="flex flex-col items-center w-full gap-1 pb-5">
          <div className=" text-4xl font-bold text-gray-700">MonkeyLog</div>
          <div className=" text-sm">Minimalistic workout logger.</div>
        </div>
        <form
          className="flex flex-col items-center justify-center w-full gap-5 "
          onSubmit={handleSubmit}
        >
          {message ? (
            <div className="text-xs text-red-500 text-center">{message}</div>
          ) : (
            <div className="text-xs invisible">no error</div>
          )}
          <input
            className={
              "p-2 rounded-md border w-full outline-none " +
              (message
                ? "border-red-500 "
                : "border-gray-300 focus:border-blue-500")
            }
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={
              "p-2 rounded-md border outline-none w-full " +
              (message
                ? "border-red-500 "
                : "border-gray-300 focus:border-blue-500")
            }
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full py-2 font-bold rounded-md bg-blue-500 hover:bg-blue-600 text-white cursor-pointer">
            Sign in
          </button>
          <button
            className="text-xs text-blue-500 cursor-pointer hover:underline"
            type="button"
          >
            Forgot password?
          </button>
        </form>
        <div className="h-px flex-shrink-0 bg-gray-300 my-5 w-full" />
        <Link
          className="rounded-md w-1/2 p-2 text-center font-bold bg-green-500 hover:bg-green-600 text-white cursor-pointer"
          to="/register"
        >
          Create account
        </Link>
      </div>
    </div>
  );
}

function Home(props) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    if (props.history.location.from) {
      return <Redirect to={props.history.location.from} />;
    } else {
      return <Redirect to="/dashboard/template" />;
    }
  } else {
    return (
      <div className="flex h-screen w-screen overflow-auto">
        <LoginCard />
      </div>
    );
  }
}

export default Home;
