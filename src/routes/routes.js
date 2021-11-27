import Dashboard from "../pages/Dashboard";
import Exercises from "../pages/Exercises";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Workouts from "../pages/Workouts";
import CreateExercise from "../pages/CreateExercise";
import WorkoutCreate from "../pages/WorkoutCreate";
import WorkoutEdit from "../pages/WorkoutEdit";

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
        path: "/dashboard/exercise",
        component: Exercises,
      },
      {
        exact: true,
        path: "/dashboard/exercise/create",
        component: CreateExercise,
      },
      {
        exact: true,
        path: "/dashboard/exercise/:id/edit",
        component: CreateExercise,
      },
      {
        exact: true,
        path: "/dashboard/workout",
        component: Workouts,
      },
      {
        exact: true,
        path: "/dashboard/workout/create",
        component: WorkoutCreate,
      },
      {
        exact: true,
        path: "/dashboard/workout/:id/edit",
        component: WorkoutEdit,
      },
    ],
  },
];

export default routes;
