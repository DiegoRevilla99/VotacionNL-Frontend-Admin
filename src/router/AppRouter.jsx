import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../module-auth/routes/AuthRoutes";

import { AdminRoutes } from "../routes/AdminRoutes";

import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  return (
    <Routes>
      {/* LOGIN Y REGISTRO */}

      <Route path="/auth/*" element={<AuthRoutes />}></Route>

      <Route
        path="/*"
        element={
          <PrivateRoute>
            <AdminRoutes />
          </PrivateRoute>
        }
      ></Route>
    </Routes>
  );
};
