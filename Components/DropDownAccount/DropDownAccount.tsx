import styles from "./DropDownAccount.module.css";
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { FaHistory, FaUserAlt, FaUserPlus } from "react-icons/fa";
import { AuthContext } from "@/context/AuthContext";
import { IoBagCheckOutline } from "react-icons/io5";

export default function AccountMenu() {
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState(null);

  //TODO: add right types here
  // @ts-ignore
  const { user, logout } = useContext(AuthContext);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box>
        <RiAccountPinCircleLine
          onClick={handleClick}
          className={styles.accountIcon}
        />
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
      >
        {user ? (
          <>
            <MenuItem onClick={() => router.push("/account/my-account")}>
              <FaUserAlt style={{ margin: "0 1rem 0 0 " }} /> Profile
            </MenuItem>
            <MenuItem onClick={() => router.push("/account/dashboard-user")}>
              <FaHistory style={{ margin: "0 1rem 0 0 " }} /> Order History
            </MenuItem>
            <MenuItem onClick={() => router.push("/payment/shipping-info")}>
              <IoBagCheckOutline
                style={{ margin: "0 1rem 0 0", fontSize: "1.2rem" }}
              />{" "}
              Checkout
            </MenuItem>
            <Divider />
            <MenuItem onClick={logout}>
              <FiLogOut style={{ margin: "0 1rem 0 0", fontSize: "1.2rem" }} />{" "}
              Logout
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={() => router.push("/account/checkout-login")}>
              <IoBagCheckOutline
                style={{ margin: "0 1rem 0 0", fontSize: "1.2rem" }}
              />{" "}
              Checkout
            </MenuItem>
            <MenuItem onClick={() => router.push("/account/login")}>
              <FiLogIn style={{ margin: "0 1rem 0 0", fontSize: "1.2rem" }} />{" "}
              Login
            </MenuItem>
            <MenuItem onClick={() => router.push("/account/register")}>
              <FaUserPlus
                style={{ margin: "0 1rem 0 0", fontSize: "1.2rem" }}
              />{" "}
              Register
            </MenuItem>
          </>
        )}
      </Menu>
    </>
  );
}
