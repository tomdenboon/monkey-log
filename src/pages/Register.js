import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as action from "../store/actions";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { FiLoader } from "react-icons/fi";
import MonkeyAxios from "../MonkeyAxios";

function RegisterCard(props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const axios = MonkeyAxios();

  const register = () => {
    axios
      .post("register", {
        name: name,
        email: email,
        password: password,
        password_confirmation: passwordConfirm,
      })
      .then((res) => {
        dispatch(action.authLogin(res.data));
      })
      .catch((err) => {
        setIsRegister(false);
        setErrors(err.response.data.errors);
        console.log(err.response.data);
        if ("name" in err.response.data.errors) {
          setName("");
        }
        if ("email" in err.response.data.errors) {
          setEmail("");
        }

        if ("password" in err.response.data.errors) {
          setPassword("");
          setPasswordConfirm("");
        }
      });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (passwordConfirm === password) {
      setIsRegister(true);
      register();
    } else {
      setErrors({});
      setPasswordConfirm("");
    }
  };

  return (
    <div
      className={
        "flex w-[350px] p-5 rounded-lg filter drop-shadow-md bg-white m-auto flex-shrink-0"
      }
    >
      {isRegister && (
        <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2  flex">
          <FiLoader className="animate-spin-slow" />
        </div>
      )}
      <div
        className={
          "w-full flex flex-col items-center " +
          (isRegister ? "invisible" : "visible")
        }
      >
        <div className="flex flex-col items-center w-full gap-1 pb-5">
          <div className=" text-4xl font-bold text-gray-700">Register</div>
        </div>
        <form
          className="flex flex-col items-center justify-center w-full gap-5 "
          onSubmit={handleSubmit}
        >
          <input
            className={
              "p-2 rounded-md border w-full outline-none " +
              ("name" in errors
                ? "border-red-500 "
                : "border-gray-300 focus:border-blue-500")
            }
            type="text"
            value={name}
            placeholder="Username"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className={
              "p-2 rounded-md border outline-none w-full " +
              ("email" in errors
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
              "p-2 rounded-md border w-full outline-none " +
              ("password" in errors
                ? "border-red-500 "
                : "border-gray-300 focus:border-blue-500")
            }
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className={
              "p-2 rounded-md border w-full outline-none " +
              ("password" in errors
                ? "border-red-500 "
                : "border-gray-300 focus:border-blue-500")
            }
            type="password"
            value={passwordConfirm}
            placeholder="Verify password"
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <button className="w-full py-2 font-bold rounded-md bg-green-500 hover:bg-green-600 text-white cursor-pointer">
            Create account
          </button>
        </form>
        <Link
          to="/"
          className="text-xs text-blue-500 cursor-pointer hover:underline mt-5"
        >
          Already have an account?
        </Link>
      </div>
    </div>
  );
}

function Register(props) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    if (props.history.location.from) {
      return <Redirect to={props.history.location.from} />;
    } else {
      return <Redirect to="/dashboard/workout" />;
    }
  } else {
    return (
      <div className="flex h-screen w-screen overflow-auto">
        <RegisterCard />
      </div>
    );
  }
}

export default Register;
