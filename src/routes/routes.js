import Dashboard from "../pages/Dashboard";
import Exercises from "../pages/Exercises";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Template from "../pages/Template";
import History from "../pages/History";
import Settings from "../pages/Settings";
import Statistics from "../pages/Statistics";
import Profile from "../pages/Profile";
import CreateExercise from "../pages/CreateExercise";
import TemplateCreate from "../pages/TemplateCreate";
import TemplateEdit from "../pages/TemplateEdit";

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
        path: "/dashboard/profile",
        component: Profile,
      },
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
        path: "/dashboard/template",
        component: Template,
      },
      {
        exact: true,
        path: "/dashboard/template/create",
        component: TemplateCreate,
      },
      {
        exact: true,
        path: "/dashboard/template/:id/edit",
        component: TemplateEdit,
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
        path: "/dashboard/settings",
        component: Settings,
      },
    ],
  },
];

export default routes;
