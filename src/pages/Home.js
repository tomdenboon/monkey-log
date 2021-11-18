import { useDispatch } from "react-redux";
import * as action from "../store/actions";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";

function Home(props) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const login = () => {
    dispatch(action.authLogin({ isAuthenticated: true }));
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
        <div className="flex flex-col xl:flex-row w-full items-center justify-between max-w-6xl gap-5 p-5">
          <div className="flex flex-col items-center w-full p-10 max-w-sm gap-5">
            <div className=" text-6xl font-bold text-gray-700">MonkeyLog</div>
            <div className=" text-2xl">Minimalistic workout logger.</div>
          </div>

          <div className="flex flex-col rounded-lg w-full filter shadow-xl l items-center bg-gray-100 p-5 gap-5 max-w-sm">
            <div className=" p-3 rounded-lg w-full text-xl  border border-gray-300">
              username
            </div>
            <div className=" p-3 rounded-lg w-full text-xl  border border-gray-300">
              password
            </div>
            <button
              className="bg-blue-500 py-3 rounded-lg w-full text-white text-xl font-bold"
              onClick={login}
            >
              Log in
            </button>
            <button
              className="bg-green-500 py-3 rounded-lg w-full text-white text-xl font-bold"
              onClick={login}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
