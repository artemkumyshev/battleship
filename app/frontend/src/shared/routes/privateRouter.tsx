import React from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";

import { routePath } from "@/routes/paths";
import SuspendedWithSpinner from "@/components/wrappers/SuspendedWithSpinner";

const HomePage = React.lazy(() => import("@/pages/HomePage"));

const privateRouter = createBrowserRouter([
  {
    path: routePath.HOME,
    element: (
      <SuspendedWithSpinner>
        <HomePage />
      </SuspendedWithSpinner>
    ),
  },
  {
    path: "*",
    element: <Navigate to={routePath.HOME} />,
  },
]);

export default privateRouter;
