import { Box, IconButton, Typography } from "@mui/material";

export const DividerItem = ({ isCollapsed, title }) => {
	return (
		<Box display="flex" alignItems="center" sx={{ mt: "3rem", mb: "1rem" }}>
			<Typography
				variant="subtitle1"
				color="#d8d8d8"
				sx={{
					// m: isCollapsed ? "25px 0 5px 0px" : "25px 0 5px 5px",
					position: "absolute",
					left: isCollapsed ? "50%" : "1rem",
					// left: "3rem",
					transform: isCollapsed ? "translateX(-50%)" : "translateX(0)",
					transition: "all 300ms",
				}}
			>
				{title}
			</Typography>
		</Box>
	);
};
