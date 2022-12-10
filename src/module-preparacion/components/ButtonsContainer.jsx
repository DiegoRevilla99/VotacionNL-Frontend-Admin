import { Button, Grid } from "@mui/material";
import React from "react";

export const ButtonsContainer = React.memo(({ status }) => {
	console.log("Me renderizo botones");
	return (
		<Grid mt={"1rem"} container direction="row" justifyContent="flex-end" spacing={2}>
			<Grid item xs={12} md={6} lg={3}>
				<Button
					type="submit"
					// onClick={onSubmit}
					variant="contained"
					size="large"
					disabled={status === "checking"}
					sx={{
						boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
						transition: "all 0.5s ease",
						backgroundColor: "#511079",
						width: "100%",
						borderRadius: "2rem 2rem 2rem 2rem",
						"&:hover": {
							backgroundColor: "#7E328B !important",
							transform: "translate(-5px, -5px)",
							boxShadow: "5px 5px 1px rgba(0, 0, 0, 0.3)",
						},
					}}
				>
					Guardar
				</Button>
			</Grid>
			<Grid item xs={12} md={6} lg={3}>
				<Button
					// onClick={handleToggleModal}
					variant="contained"
					size="large"
					disabled={status === "checking"}
					sx={{
						boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
						transition: "all 0.5s ease",
						backgroundColor: "#791010",
						width: "100%",
						borderRadius: "2rem 2rem 2rem 2rem",
						"&:hover": {
							backgroundColor: "#8B3232 !important",
							transform: "translate(-5px, -5px)",
							boxShadow: "5px 5px 1px rgba(0, 0, 0, 0.3)",
						},
					}}
				>
					Cancelar
				</Button>
			</Grid>
		</Grid>
	);
});
