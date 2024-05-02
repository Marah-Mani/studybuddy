import {
    Box,
    Stack,
    Avatar,
    Typography,

} from "@mui/material";
import { useSelector } from "react-redux";
import { transformImage } from "../../lib/features";
import {
    Face as FaceIcon,
    AlternateEmail as UserNameIcon,
    CalendarMonth as CalendarIcon,
} from "@mui/icons-material";
import moment from "moment";

export const DrawerList = ({ toggleDrawer }) => {
    const { user } = useSelector((state) => state.auth);
    return (
        <Stack paddingTop={"3rem"} sx={{ width: 415, height: "100%", backgroundColor: "#262626" }} spacing={"2rem"} direction={"column"} alignItems={"center"} role="presentation" onClick={toggleDrawer(false)}>
            <Typography sx={{ color: "white", fontSize: "2.5rem" }} variant="body1">User Info</Typography>
            <Avatar
                src={transformImage(user?.avatar?.url)}
                alt={user?.name}
                sx={{
                    width: 200,
                    height: 200,
                    objectFit: "contain",
                    marginBottom: "1rem",
                    border: "5px solid white",
                }}
            />
            <ProfileCard heading={"Bio"} text={user?.bio} />
            <ProfileCard
                heading={"Username"}
                text={user?.username}
                Icon={<UserNameIcon />}
            />
            <ProfileCard heading={"Name"} text={user?.name} Icon={<FaceIcon />} />
            <ProfileCard
                heading={"Joined"}
                text={moment(user?.createdAt).fromNow()}
                Icon={<CalendarIcon />}
            />
        </Stack>
    );
}

const ProfileCard = ({ text, Icon, heading }) => (
    <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        color={"white"}
        textAlign={"center"}
    >
        {Icon && Icon}
        <Stack>
            <Typography variant="body1">{text}</Typography>
            <Typography color={"gray"} variant="caption">
                {heading}
            </Typography>
        </Stack>
    </Stack>
);