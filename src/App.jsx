import { LocalizationProvider } from "@mui/x-date-pickers";
import { AppRouter } from "./router/AppRouter";
import "./styles/generalContainer.css";
import { AppTheme } from "./theme/AppTheme";
import AdapterJalaali from "@date-io/jalaali";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import es from "date-fns/locale/es";

export const App = () => {
  return (
    <>
      <AppTheme>
        <LocalizationProvider adapterLocale={es} dateAdapter={AdapterDateFns}>
          <AppRouter></AppRouter>
        </LocalizationProvider>
      </AppTheme>
    </>
  );
};

export default App;
