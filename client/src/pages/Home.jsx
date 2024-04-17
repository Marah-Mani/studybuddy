import AppLayout from "../components/layout/AppLayout";
import { Box, Typography } from "@mui/material";
import { grayColor } from "../constants/color";

const Home = () => {
  return (
    <Box bgcolor={grayColor} display={"flex"} justifyContent={"center"} alignItems={"center"} height={"100%"}>
      <Typography  variant="h6" sx={{ color: 'gray' }}  textAlign={"center"}>
        Select a friend to chat
      </Typography>
    </Box>
  );
};

export default AppLayout()(Home);
