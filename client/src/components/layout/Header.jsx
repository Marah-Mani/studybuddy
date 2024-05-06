import {
  AppBar,
  Backdrop,
  Badge,
  Box,
  Drawer,
  Avatar,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { DrawerList as DL } from "../shared/DrawerItems"
import React, { Suspense, lazy, useState } from "react";
import { orange } from "../../constants/color";
import { IoIosChatbubbles, IoMdPersonAdd } from "react-icons/io";
import { MdGroups2 } from "react-icons/md";
import { Link } from 'react-router-dom'; // Import Link component for routing
import { FaStore } from "react-icons/fa";
import study from "../../assets/buddystudy.png";
import {
  Add as AddIcon,
  Menu as MenuIcon,
  // Search as SearchIcon,
  // Group as GroupIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { server } from "../../constants/config";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userNotExists } from "../../redux/reducers/auth";
import {
  setIsMobile,
  setIsNewGroup,
  setIsNotification,
  setIsSearch,
} from "../../redux/reducers/misc";
import { resetNotificationCount } from "../../redux/reducers/chat";

const SearchDialog = lazy(() => import("../specific/Search"));
const NotifcationDialog = lazy(() => import("../specific/Notifications"));
const NewGroupDialog = lazy(() => import("../specific/NewGroup"));

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const { isSearch, isNotification, isNewGroup } = useSelector(
    (state) => state.misc
  );
  const { notificationCount } = useSelector((state) => state.chat);

  const handleMobile = () => dispatch(setIsMobile(true));

  const openSearch = () => dispatch(setIsSearch(true));

  const openNewGroup = () => {
    dispatch(setIsNewGroup(true));
  };

  const openNotification = () => {
    dispatch(setIsNotification(true));
    dispatch(resetNotificationCount());
  };

  const { user } = useSelector((state) => state.auth);

  const gotoMarketplace = () => {
    if (location.pathname === "/market") {

      window.location.reload();
    }
    else {
      navigate("/market")
    }
  };
  const openChatHome = () => navigate("/chat-home");


  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });
      dispatch(userNotExists());
      toast.success(data.message);
      navigate("/login")
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar
          position="static"
          sx={{
            bgcolor: 'black',
          }}
        >
          <Toolbar>


            <Link to="/">
              <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
                <img
                  src={study}
                  alt="StuddyBuddy"
                  style={{ width: "145px", height: "50px", marginTop: "5px" }}
                />
              </Typography>
            </Link>

            <Box
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
              }}
            />
            <Box>
              <IconBtn
                title={"Marketplace"}
                icon={<FaStore />}
                onClick={gotoMarketplace}
              />
              <IconBtn
                title={"Chat"}
                icon={<IoIosChatbubbles />}
                onClick={openChatHome}
              />
              <IconBtn
                title={"Profile"}
                icon={<Avatar src={user?.avatar?.url} />}
                // onClick={openSearch}
                onClick={toggleDrawer(true)}
              />
              <Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
                <DL toggleDrawer={toggleDrawer} />
              </Drawer>

              {/* 
              <IconBtn
                title={"New Group"}
                icon={<AddIcon />}
                onClick={openNewGroup}
              />

              <IconBtn
                title={"Manage Groups"}
                // icon={<GroupIcon />}
                icon={<MdGroups2 />}
                onClick={navigateToGroup}
              /> */}

              <IconBtn
                title={"Notifications"}
                icon={<NotificationsIcon />}
                onClick={openNotification}
                value={notificationCount}
              />

              <IconBtn
                title={"Logout"}
                icon={<LogoutIcon />}
                onClick={logoutHandler}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SearchDialog />
        </Suspense>
      )}

      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <NotifcationDialog />
        </Suspense>
      )}

      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroupDialog />
        </Suspense>
      )}
    </>
  );
};

const IconBtn = ({ title, icon, onClick, value }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {value ? (
          <Badge badgeContent={value} color="error">
            {icon}
          </Badge>
        ) : (
          icon
        )}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
