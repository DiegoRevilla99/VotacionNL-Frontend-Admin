import { MenuItem } from "react-pro-sidebar";
import Typography from "@mui/material/Typography";
import { keyframes } from "@emotion/react";
import { Box } from "@mui/system";

const animacion = keyframes`
0%{
	background-position: 0% 50%;
}

100%{
	background-position: 100% 100%;
}
`;

export const Item = ({ title, to, icon, selected, setSelected }) => {
	return (
		<Box
			sx={{
				"& .active": {
					boxShadow: "3px 3px 3px rgba(0, 0, 0, 0.3)",
					// 	animation: `${animacion} 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
					// },
					borderTopLeftRadius: 20,
					borderBottomLeftRadius: 20,
					// backgroundImage: "linear-gradient(90deg, #7E328B , #ffffff)",
					backgroundColor: "#f8f7f3",
					// backgroundSize: "600%",
					animation: `${animacion} 0.3s both`,
				},
			}}
		>
			<MenuItem
				active={selected === title}
				style={{
					color: selected === title ? "black" : "white",
					marginTop: "0.5rem",
				}}
				onClick={() => setSelected(title)}
				icon={icon}
			>
				<Typography variant="button">{title}</Typography>
			</MenuItem>
		</Box>
	);
};
