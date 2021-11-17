import Dashboard from "../pages/Dashboard";
import Exercises from "../pages/Exercises";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Workouts from "../pages/Workouts";

const routes = [
  {
    exact: true,
    auth: false,
    path: "/",
    component: Home,
  },
  {
    exact: true,
    auth: false,
    path: "/Register",

    component: Register,
  },
  {
    path: "/dashboard",
    component: Dashboard,
    auth: true,
    routes: [
      {
        exact: true,
        path: "/dashboard/exercises",
        component: Exercises,
      },
      {
        exact: true,
        path: "/dashboard/workouts",
        component: Workouts,
      },
    ],
  },
];

export default routes;
