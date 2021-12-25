import Dashboard from "../pages/Dashboard";
import Exercises from "../pages/Exercises";
import ExerciseEdit from "../pages/ExerciseEdit";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Template from "../pages/Template";
import TemplateCreate from "../pages/TemplateCreate";
import TemplateEdit from "../pages/TemplateEdit";
import TemplateAddExercise from "../pages/TemplateAddExercise";
import History from "../pages/History";
import HistoryEdit from "../pages/HistoryEdit";
import HistoryAddExercise from "../pages/HistoryAddExercise";
import Settings from "../pages/Settings";
import Statistics from "../pages/Statistics";
import ExerciseCreate from "../pages/ExerciseCreate";
import Active from "../pages/Active";
import ActiveAddExercise from "../pages/ActiveAddExercise";

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
        path: "/dashboard/workout/active/edit",
        component: Active,
      },
      {
        exact: true,
        path: "/dashboard/workout/active/add-exercise",
        component: ActiveAddExercise,
      },
      {
        exact: true,
        path: "/dashboard/exercise",
        component: Exercises,
      },
      {
        exact: true,
        path: "/dashboard/exercise/create",
        component: ExerciseCreate,
      },
      {
        exact: true,
        path: "/dashboard/exercise/:id/edit",
        component: ExerciseEdit,
      },
      {
        exact: true,
        path: "/dashboard/workout",
        component: Template,
      },
      {
        exact: true,
        path: "/dashboard/workout/create",
        component: TemplateCreate,
      },
      {
        exact: true,
        path: "/dashboard/workout/:id/edit",
        component: TemplateEdit,
      },
      {
        exact: true,
        path: "/dashboard/workout/:id/add-exercise",
        component: TemplateAddExercise,
      },
      {
        exact: true,
        path: "/dashboard/statistics",
        component: Statistics,
      },
      {
        exact: true,
        path: "/dashboard/history",
        component: History,
      },
      {
        exact: true,
        path: "/dashboard/history/:id/edit",
        component: HistoryEdit,
      },
      {
        exact: true,
        path: "/dashboard/history/:id/add-exercise",
        component: HistoryAddExercise,
      },
      {
        exact: true,
        path: "/dashboard/settings",
        component: Settings,
      },
      {
        path: "/dashboard/*",
        component: Template,
      },
    ],
  },
  {
    path: "*",
    component: Home,
  },
];

export default routes;
