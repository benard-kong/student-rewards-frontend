/* eslint react/jsx-props-no-spreading: 0 */
import React from "react";
import { AppProps } from "next/app";
import { AppBar, Box, CssBaseline, Drawer, Hidden, IconButton, Toolbar, Typography } from "@material-ui/core";
import { makeStyles, useTheme, Theme, createStyles, styled } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { adminLinks, primaryLinks } from "./navigation.config";
import DrawerList from "./partials/DrawerList";

const drawerWidth = 280;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

const MainComponentContainer = styled(Box)({
  "background-color": "rgba(0, 0, 0, 0.075)",
  "min-height": "100vh",
  "min-width": `calc(100% - ${drawerWidth}px)`,
  "padding-top": "4em",
  "padding-left": "1em",
});

interface Props extends AppProps {
  pageProps: object;
  window?: () => Window;
}

// INFO: Temporary
const isAdmin = true;

export default function ResponsiveDrawer({ Component, pageProps = {}, router: { pathname }, window }: Props) {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <DrawerList linksList={primaryLinks} hasDivider pathname={pathname} mobileClose={handleDrawerToggle} />
      {isAdmin && <DrawerList linksList={adminLinks} hasDivider pathname={pathname} mobileClose={handleDrawerToggle} />}
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Student Rewards
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <MainComponentContainer>
        <Component {...pageProps} />
      </MainComponentContainer>
    </div>
  );
}
