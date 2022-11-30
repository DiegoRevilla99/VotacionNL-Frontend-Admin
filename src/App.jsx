import "./styles/generalContainer.css";
import { SidebarCustom } from "./ui/components/SidebarCustom";
import { Topbar } from "./ui/components/Topbar";

export const App = () => {
	return (
		<div className="app">
			<SidebarCustom />
			<main className="content">
				<Topbar />
			</main>
			{/* <div className="generalContainer">HOLA MUNDO</div> */}
		</div>
	);
};

export default App;
