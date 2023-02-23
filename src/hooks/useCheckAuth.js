import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getToken } from "../providers/Micro-Auth/configAuth";
import { onLogout } from "../store/auth/authSlice";
import { onRefreshSession } from "../store/auth/authThunks";
// import { getToken } from "../../providers/Micro-Auth/configAuth";
// import { onChecking, onError, onLogin, onLogout } from "../../store/auth/authSlice";
// import { onRefreshSession } from "../../store/auth/authThunks";

export const useCheckAuth = () => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("CheckAuth");
    async function cargaUsuario() {
      console.log("tokennnnnnn:", getToken());
      if (!getToken()) {
        dispatch(onLogout());
        return;
      }

      try {
        // const {data: usuario} = await axios.get("url")
        dispatch(onRefreshSession()); //!Implementar
        // console.log("LLEGA AQUI");
        // await timeout(500);
        // dispatch(
        //  onLogin({
        //    accessToken: getToken(),
        //    username: "DEFAULT",
        //    refreshToken: "aaa",
        //    email: "DEFAULT",
        //  })
        // );
        console.log("desde checkout:", sessionStorage.getItem("Location"));
        navigate(sessionStorage.getItem("Location"));
      } catch (error) {
        // dispatch(onError({ errorMessage: "PROBANDO1 " }));
        dispatch(onLogout());
        console.log(error);
      }
    }

    cargaUsuario();
  }, []);

  return {
    status: status,
  };
};
