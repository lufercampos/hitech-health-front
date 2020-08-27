import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Tooltip from "@material-ui/core/Tooltip";
import { useDispatch } from "react-redux";
import { logout } from "../../store/actions/AuthAction";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appbar: {
    backgroundColor: "#fff",
    color: "black",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function PrimarySearchAppBar(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const exitToApp = () => {
    dispatch(logout());
  };

  return (
    <div className={classes.grow}>
      <AppBar elevation={0} className={classes.appbar} position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            HiTech-Health-Teste-Crud-Luiz
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Box display="flex" flexDirection="row">
              <Box style={{ marginTop: "10px" }}>
                <Typography variant="subtitle1">
                  {JSON.parse(sessionStorage.getItem("user")).name}
                </Typography>
              </Box>
              <Box>
                <Tooltip title="Exit to App">
                  <IconButton onClick={exitToApp} aria-label="Exit to App">
                    <ExitToAppIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </div>
          <div className={classes.sectionMobile}>
            <Box display="flex" flexDirection="row">
              <Box style={{ marginTop: "10px" }}>
                <Typography variant="subtitle1">
                  {JSON.parse(sessionStorage.getItem("user")).name}
                </Typography>
              </Box>
              <Box>
                <Tooltip title="Exit to App">
                  <IconButton onClick={exitToApp} aria-label="Exit to App">
                    <ExitToAppIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
