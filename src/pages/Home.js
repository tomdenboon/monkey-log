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
      <div className="flex items-center justify-center w-screen h-screen">
        <button className="bg-gray-800 rounded-sm p-1" onClick={login}>
          Log in
        </button>
      </div>
    );
  }
}

export default Home;
