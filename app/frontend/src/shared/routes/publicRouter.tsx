import React from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";

import { routePath } from "@/routes/paths";
import SuspendedWithSpinner from "@/components/wrappers/SuspendedWithSpinner";

const SignInPage = React.lazy(() => import("@/pages/SignInPage"));
const SignUpPage = React.lazy(() => import("@/pages/SignUpPage"));

const publicRouter = createBrowserRouter([
  {
    path: routePath.SIGN_IN,
    element: (
      <SuspendedWithSpinner>
        <SignInPage />
      </SuspendedWithSpinner>
    ),
  },
  {
    path: routePath.SIGN_UP,
    element: (
      <SuspendedWithSpinner>
        <SignUpPage />
      </SuspendedWithSpinner>
    ),
  },
  {
    path: "*",
    element: <Navigate to={routePath.HOME} />,
  },
]);

export default publicRouter;
