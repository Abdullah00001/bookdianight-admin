import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@/pages/Login";

const Routes = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default Routes;
