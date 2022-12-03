import { AppRouter } from "./router/AppRouter";
import "./styles/generalContainer.css";
import { AppTheme } from "./theme/AppTheme";

export const App = () => {
  return (
    <>
      <AppTheme>
        <AppRouter></AppRouter>
      </AppTheme>
    </>
  );
};

export default App;
