import { Box, Button, IconButton, Typography } from "@mui/material";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutLinedIcon from "@mui/icons-material/HomeOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Item } from "./Item";
import { DividerItem } from "./DividerItem";
import { useDispatch } from "react-redux";
import { onLogout } from "../../store/auth/authSlice";
import LogoutIcon from "@mui/icons-material/Logout";
import { deleteToken } from "../../providers/Micro-Auth/configAuth";

export const SidebarCustom = ({ selected, setSelected }) => {
  const [isCollapsed, setisCollapsed] = useState(false);
  console.log(selected);
  const dispatch = useDispatch();
  const getSize = () => {
    const width = window.innerWidth;
    if (width < 1200 && !isCollapsed) {
      console.log("COLAPSA");
      setisCollapsed(true);
    } else if (width > 1200 && isCollapsed) {
      console.log("DESCOLAPSA");
      setisCollapsed(false);
    }
  };

  useLayoutEffect(() => {
    window.addEventListener("resize", getSize);
    return () => {
      window.removeEventListener("resize", getSize);
    };
  }, [window.innerWidth]);

  const logout = () => {
    console.log("logout....");
    deleteToken();
    dispatch(onLogout());
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: "#7E328B !important",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-menu": {
          paddingTop: "0px !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "currentColor !important",
        },
        "& .pro-menu-item.active": {
          color: "#7E328B !important",
        },
        "& .pro-inner-item:focus": {
          color: "#7E328B !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed} breakPoint="md">
        <Box mt="0px" pt="0px">
          <Menu iconShape="square">
            <Box
              mb="25px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                background: "#f8f7f3",
                height: "73.99px",
                boxShadow: 3,
              }}
            >
              <Box>
                <img
                  alt="logo"
                  // src="/../../CEE600x321.png"
                  src="./CEE600x321.png"
                  crossOrigin="anonymous"
                  style={{
                    transition: "width 0.5s, height 0.5s",
                    width: isCollapsed ? "75px" : "139px",
                    height: isCollapsed ? "40px" : "73.99px",
                  }}
                />
              </Box>
            </Box>

            <Box paddingLeft={isCollapsed ? undefined : "5%"} marginTop="1rem">
              <DividerItem isCollapsed={isCollapsed} title={"Principal"}></DividerItem>

              <Item
                title="Inicio"
                icon={<HomeOutLinedIcon />}
                selected={selected}
                setSelected={setSelected}
              ></Item>
              <Item
                title="Preparación"
                icon={<EditOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
                to={"preparacion/inicio"}
              ></Item>
              <Item
                title="Empadronamiento"
                icon={<PersonAddAltOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
                to={"empadronamiento/"}
              ></Item>
              <Item
                title="Jornada"
                icon={<BarChartOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
                to={"jornada/inicio"}
              ></Item>
              <DividerItem isCollapsed={isCollapsed} title={"Otros"}></DividerItem>
              {/* <Item
                title="Configuración"
                icon={<SettingsOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              ></Item> */}

              <Button
                endIcon={<LogoutIcon />}
                justifyContent="left"
                sx={{ width: "70%", color: "#fff" }}
                onClick={logout}
              >
                {!isCollapsed ? "Cerrar sesión" : ""}
              </Button>
            </Box>

            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              paddingRight="5px"
              sx={{ color: "white", paddingTop: "5rem" }}
            >
              <IconButton onClick={() => setisCollapsed(!isCollapsed)} sx={{ color: "white" }}>
                <MenuOutlinedIcon />
              </IconButton>
            </Box>
          </Menu>
        </Box>
      </ProSidebar>
    </Box>
  );
};
