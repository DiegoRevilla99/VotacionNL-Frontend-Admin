import * as React from 'react';
import { Button } from '@material-ui/core';

export const DataGridRowGrouping = () => {

      return (
        <>
        <Button
            type=""
            variant="contained"
            size="large"
            disabled={status === "checking"}
            sx={{
                boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
                transition: "all 0.5s ease",
                backgroundColor: "#511079",
                width: "100%",
                borderRadius: "25px 25px 25px 25px",
                "&:hover": {
                    backgroundColor: "#7E328B !important",
                    transform: "translate(-5px, -5px)",
                    boxShadow: "5px 5px 1px rgba(0, 0, 0, 0.3)",
                },
            }}
        >
            Guardar
        </Button>
        </>

      );
    }