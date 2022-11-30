import { Box, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

export const SidebarCustom = () => {
	const [isCollapsed, setisCollapsed] = useState(false);
	const [selected, setselected] = useState("Dashboard");

	return (
		<Box
			sx={{
				"& .pro-sidebar-inner": {
					background: "#7E328B",
				},
				"& .pro-icon-wrapper": {
					backgroundColor: "transparent !important",
				},
				"& .pro-inner-item": {
					padding: "5px 35px 5px 20px !important",
				},
				"& .pro-inner-item:hover": {
					color: "#168dfb",
				},
				"& .pro-menu-item.active": {
					color: "#6870fa !important",
				},
			}}
		>
			<ProSidebar collapsed={isCollapsed}>
				<Menu iconShape="square">
					{/* USUARIO */}
					{!isCollapsed && (
						<Box
							mb="25px"
							sx={{
								background: "white",
							}}
						>
							<Box display="flex" justifyContent="center" alignItem="center">
								<img
									alt="logo"
									src="../../CEE600x321.png"
									width="300px"
									height="160px"
								/>
							</Box>
						</Box>
					)}

					<MenuItem
						onClick={() => setisCollapsed(!isCollapsed)}
						icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
						style={{
							margin: "10px 0 20px 0",
							color: "black",
						}}
					>
						{!isCollapsed && (
							<Box
								display="flex"
								justifyContent="space-between"
								alignItems="center"
								ml="15px"
							>
								<Typography variant="h5" color="initial"></Typography>
								<IconButton onClick={() => setisCollapsed(!isCollapsed)}>
									<MenuOutlinedIcon />
								</IconButton>
							</Box>
						)}
					</MenuItem>
				</Menu>
			</ProSidebar>
		</Box>
	);
};
