import "./NavBar.css";
// React and PropTypes
import { useState } from "react";
import PropTypes from "prop-types";
// MUI Components
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/system"; // Removed unused fontWeight import
import { InputBase } from "@mui/material";
// MUI Icons
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import CancelIcon from "@mui/icons-material/Cancel";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

import LogoutIcon from "@mui/icons-material/Logout";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// Redux
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function NavBar(props) {
  const userLogedIn = JSON.parse(localStorage.getItem("logedIn"));
  const productsState = useSelector((state) => state.products);
  const wishLength = productsState.wishProducts.length;
  const cartLength = productsState.cartProducts.length;
  const [openUserNav, setOpenUserNav] = useState(false);

  const drawerWidth = 240;
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  // Small Screens >>
  const drawer = (
    <Box>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemText>Home</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/aboutUs">
            <ListItemText>About</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/contact">
            <ListItemText>Contact</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/signUp">
            <ListItemText>SignUp</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
      {/* Wishlist and Cart for mobile menu */}
      <List className="icons-mobile">
        {/* ---------------------- */}
        <ListItem disablePadding>
          <ListItemButton className="icon-wrapper" component={Link} to="/wish">
            <FavoriteBorderIcon />
            <span className="lenght">{wishLength}</span>
            <ListItemText primary="Wishlist" />
          </ListItemButton>
        </ListItem>
        {/* ---------------------- */}
        <ListItem disablePadding>
          <ListItemButton className="icon-wrapper" component={Link} to="/cart">
            <ShoppingCartIcon />
            <span className="lenght">{cartLength}</span>
            <ListItemText primary="Cart" />
          </ListItemButton>
        </ListItem>
        {/* ---------------------- */}
        <ListItem disablePadding>
          {/* User Icons >>  */}
          {userLogedIn && (
            <Box
              className="user-icon"
              onClick={() => setOpenUserNav(!openUserNav)}>
              <ListItemButton className="icon-wrapper">
                <PermIdentityIcon />
                <ListItemText primary="Account" />
              </ListItemButton>
              {openUserNav && (
                <Box className="user-nav">
                  <Button>
                    <PermIdentityIcon />
                    <Typography component={Link} to="/manageAccount">
                      Manage My Account
                    </Typography>
                  </Button>
                  <Button>
                    <AddShoppingCartIcon />
                    <Typography>My Order</Typography>
                  </Button>
                  <Button>
                    <CancelIcon />
                    <Typography>My Cancellations</Typography>
                  </Button>
                  <Button>
                    <StarOutlineIcon />
                    <Typography>My Reviews</Typography>
                  </Button>
                  <Button
                    onClick={() => {
                      localStorage.setItem("logedIn", false);
                    }}>
                    <LogoutIcon />
                    <Typography>Logout</Typography>
                  </Button>
                </Box>
              )}
            </Box>
          )}
        </ListItem>
        {/* ---------------------- */}
      </List>
      <Divider />
      {/* Search bar in the drawer menu */}
      <Box sx={{ p: 2 }}>
        <TextField
          variant="outlined"
          size="mdall"
          placeholder="Search..."
          fullWidth
        />
      </Box>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Large Screens */}
      <AppBar className="nav">
        {/* _____________________________________________ */}
        {/* << Start Sale Jsx >>>>> */}
        <Box className="sale-msg">
          <Container className="sale-msg-container">
            <Typography variant="body1">
              Summer Sale For All Swim Suits And Free Express Delivery - OFF
              50%! <Link to={"/products"}>Shop Now</Link>
            </Typography>
            <Box>
              <Button>English</Button>
            </Box>
          </Container>
        </Box>
        {/* END Sale Jsx //>> */}
        {/* _____________________________________________ */}

        {/* _____________________________________________ */}
        {/* << Start Nav bar jsx */}
        <Container className="navbar-container">
          <Toolbar className="toolbar">
            {/* << Start Logo */}
            <Typography className="logo" variant="h6" component={Link} to="/">
              Exclusive
            </Typography>
            {/* End Logo //>> */}

            {/* ((((( M E N U E ))))) Icon */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { md: "none" } }}>
              <MenuIcon />
            </IconButton>

            {/* << Start Links */}
            <Box
              className="nav-box"
              sx={{
                display: { xs: "none", md: "flex" },
              }}>
              <Button>
                <Link className="nav-link" to={"/"}>
                  Home
                </Link>
              </Button>
              <Button>
                <Link className="nav-link" to={"/aboutUs"}>
                  About
                </Link>
              </Button>
              <Button>
                <Link className="nav-link" to={"/contact"}>
                  Contact
                </Link>
              </Button>
              <Button>
                <Link className="nav-link" to={"/signUp"}>
                  SignUp
                </Link>
              </Button>
            </Box>
            {/* End Links //>> */}

            {/* << Start Search Bar + Icons */}
            {/* Search */}
            <Box
              className="search-box"
              sx={{
                display: { xs: "none", md: "flex" },
              }}>
              <InputBase placeholder="What are you looking for?" />
              <SearchIcon className="search-icon" />
            </Box>

            {/* Wishlist, Cart Icons, and User Icons */}
            <Box
              className="icons-container"
              sx={{
                display: { xs: "none", md: "flex" },
              }}>
              <ListItemButton
                className="icon-wrapper"
                component={Link}
                to="/wish">
                <FavoriteBorderIcon />
                <span className="length">{wishLength}</span>
              </ListItemButton>

              <ListItemButton
                className="icon-wrapper"
                component={Link}
                to="/cart">
                <ShoppingCartIcon />
                <span className="length">{cartLength}</span>
              </ListItemButton>

              {/* User Icons */}
              {userLogedIn && (
                <Box
                  className="user-icon"
                  onClick={() => setOpenUserNav(!openUserNav)}>
                  <ListItemButton className="icon-wrapper">
                    <PermIdentityIcon />
                  </ListItemButton>
                  {openUserNav && (
                    <Box className="user-nav">
                      <Button>
                        <PermIdentityIcon />
                        <Typography component={Link} to="/manageAccount">
                          Manage My Account
                        </Typography>
                      </Button>
                      <Button>
                        <AddShoppingCartIcon />
                        <Typography>My Order</Typography>
                      </Button>
                      <Button>
                        <CancelIcon />
                        <Typography>My Cancellations</Typography>
                      </Button>
                      <Button>
                        <StarOutlineIcon />
                        <Typography>My Reviews</Typography>
                      </Button>
                      <Button
                        onClick={() => {
                          localStorage.setItem("logedIn", false);
                        }}>
                        <LogoutIcon />
                        <Typography>Logout</Typography>
                      </Button>
                    </Box>
                  )}
                </Box>
              )}
            </Box>

            {/* End Search Bar + Icons //>> */}
          </Toolbar>
        </Container>
        {/* End Nav bar jsx  //>>*/}
        {/* _____________________________________________ */}
      </AppBar>

      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}>
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

NavBar.propTypes = {
  window: PropTypes.func,
};
