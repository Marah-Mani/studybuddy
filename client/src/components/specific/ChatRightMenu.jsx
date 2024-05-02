import React, { lazy, Suspense } from 'react'
import { Avatar, Stack, Tooltip, IconButton, Typography } from "@mui/material";
import {
    Add as AddIcon
} from "@mui/icons-material";
import { IoIosChatbubbles, IoMdPersonAdd } from "react-icons/io";
import moment from "moment";
import { transformImage } from "../../lib/features";
import {
    setIsMobile,
    setIsNewGroup,
    setIsNotification,
    setIsSearch,
} from "../../redux/reducers/misc";
import { MdGroups2 } from "react-icons/md";

import { useDispatch, useSelector } from 'react-redux';
const SearchDialog = lazy(() => import("../specific/Search"));
const NewGroupDialog = lazy(() => import("../specific/NewGroup"));


function ChatRightMenu() {
    const dispatch = useDispatch();

    const { isSearch, isNotification, isNewGroup } = useSelector(
        (state) => state.misc
    );
    const { notificationCount } = useSelector((state) => state.chat);

    const handleMobile = () => dispatch(setIsMobile(true));

    const openSearch = () => dispatch(setIsSearch(true));

    const openNewGroup = () => {
        dispatch(setIsNewGroup(true));
    };


    return (
        <Stack spacing={"0"} direction={"column"} alignItems={"center"}>
            <IconBtn
               title={"Search"}
               icon={<IoMdPersonAdd />}
               onClick={openSearch}
            />
            <IconBtn
            title={"New Group"}
            icon={<MdGroups2 />}
            onClick={openNewGroup}
             
            />
        </Stack>
    )
}



const IconBtn = ({ title, icon, onClick, value }) => {
    return (
        <Tooltip title={title}>
            <IconButton sx={{
                color: "white",
            }} size="large" onClick={onClick}>
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




export default ChatRightMenu