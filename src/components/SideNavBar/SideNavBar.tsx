import { Fragment } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Header from "../Header/Header";

const SideNavBar = () => {
  const location = useLocation();
  const navItems = [
    { label: "DASHBOARD", to: "/home/dashboard" },
    { label: "ABOUT", to: "/home/about" },
    { label: "TEAM", to: "/home/team" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        flexShrink: 0,
        width: { xs: "100%", md: 300 },
        "& .MuiDrawer-paper": {
          width: { xs: "100%", md: 300 },
          boxSizing: "border-box",
          backgroundColor: "var(--bg-section)",
          borderRight: "1px solid var(--border-subtle)",
        },
      }}
    >
      <Header />
      <List sx={{ padding: 0 }}>
        {navItems.map((item, index) => (
          <Fragment key={item.to}>
            <ListItemButton
              component={NavLink}
              to={item.to}
              selected={location.pathname.startsWith(item.to)}
              sx={{
                color: "var(--text-secondary)",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "var(--text-secondary)",
                },
                "&.Mui-selected": {
                  color: "var(--primary-highlight-strong)",
                  backgroundColor: "transparent",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "transparent",
                  color: "var(--primary-highlight-strong)",
                },
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontFamily: "Microsoft JhengHei, arial",
                  fontWeight: 700,
                  fontSize: { xs: 16, md: 28 },
                  textAlign: { xs: "center", md: "left" },
                }}
              />
            </ListItemButton>
            {index < navItems.length - 1 && (
              <Divider sx={{ borderColor: "var(--border-subtle)" }} />
            )}
          </Fragment>
        ))}
      </List>
    </Drawer>
  )
}
export default SideNavBar;
