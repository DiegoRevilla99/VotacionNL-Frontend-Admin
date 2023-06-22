import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { AuthRoutes } from "../module-auth/routes/AuthRoutes";
// import { VisualizadorDePDF } from "../module-jornada/pages/VisualizadorDePDF";

import { AdminRoutes } from "../routes/AdminRoutes";
import { onToastErrorOperation } from "../store/ui/uiSlice";

import { PublicRoute } from "./PublicRoute";
// import { PrivateRoute } from "./PrivateRoute";

export const AppRouter = () => {
  // const { status: userStatus } = useSelector((state) => state.auth);
  // const logged = userStatus === "logged" ? true : false;

  // const { status } = useCheckAuth();

  // console.log("STATUS LOGIN", status);

  // const location = useLocation();
  // console.log(location);
  // sessionStorage.setItem("Location", location.pathname);
  const logged = true;
  // if (status === "checking") return <>Cargando</>;
  // else
  const { status } = useCheckAuth();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const dispatch = useDispatch();

  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }

    function handleOffline() {
      dispatch(onToastErrorOperation({ errorMessage: "Sin conexión a internet" }));
      setIsOnline(false);
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  return (
    <>
      <Routes>
        {/* LOGIN Y REGISTRO */}

        <Route path="/auth/*" element={<AuthRoutes />}></Route>

        <Route
          path="/*"
          element={
            // <PrivateRoute>
            <PublicRoute>
              <AdminRoutes />
            </PublicRoute>
            // </PrivateRoute>
          }
        ></Route>

        {/* <Route path={"/verPDF/reporteInicial/*"} element={<VisualizadorDePDF />} /> */}
      </Routes>
    </>
  );
};
