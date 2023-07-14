import ComponentOne from "../pages/ComponentOne";
import ComponentTwo from "../pages/ComponentTwo";
import ComponentTree from "../pages/CTree";

let routes = [
  {
    path: "/",
    component: ComponentOne,
    exact: true,
  },
  {
    path: "/two",
    component: ComponentTwo,
  },
  {
    path: "/tree",
    component: ComponentTree,
  },
];

export default routes;
