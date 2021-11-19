import { useState } from "react";
import { useDispatch } from "react-redux";
import * as action from "../store/actions";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { FiLoader } from "react-icons/fi";
import MonkeyAxios from "../MonkeyAxios";

function Home(props) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
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

  if (isAuthenticated) {
    if (props.history.location.from) {
      return <Redirect to={props.history.location.from} />;
    } else {
      return <Redirect to="/dashboard" />;
    }
  } else {
    return (
      <div className="flex w-full min-h-screen items-center justify-center">
        <div className="relative rounded-lg w-full filter shadow-xl  bg-gray-100 p-5 m-5 max-w-sm">
          {isLogin && (
            <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2  flex">
              <FiLoader className="animate-spin-slow" />
            </div>
          )}
          <form
            className={
              "flex flex-col gap-5 " + (isLogin ? "invisible" : "visible")
            }
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col items-center w-full max-w-sm gap-1">
              <div className=" text-4xl font-bold text-gray-700">MonkeyLog</div>
              <div className=" text-sm">Minimalistic workout logger.</div>
            </div>
            {message ? (
              <div className="text-xs text-red-500 text-center">{message}</div>
            ) : (
              <div className="text-xs invisible">no error</div>
            )}
            <input
              className={
                "p-2 rounded-md border   outline-none " +
                (message
                  ? "border-red-500 "
                  : "border-gray-300 focus:border-blue-700")
              }
              type="text"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className={
                "p-2 rounded-md border outline-none " +
                (message
                  ? "border-red-500 "
                  : "border-gray-300 focus:border-blue-700")
              }
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="py-2 font-bold rounded-md bg-blue-500 hover:bg-blue-600 text-white cursor-pointer">
              Log in
            </button>
            <button className="py-2 font-bold rounded-md bg-green-500 hover:bg-green-600 text-white cursor-pointer">
              Register
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Home;
