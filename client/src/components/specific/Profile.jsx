import React from "react";
import { Avatar, Stack, Typography } from "@mui/material";
import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";
import moment from "moment";
import { transformImage } from "../../lib/features";

const Profile = ({ user }) => {

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function getInitials(fullName) {
    // Split the full name into separate words
    const nameParts = fullName.split(' ');

    // Handle cases with single or multiple words
    if (nameParts.length === 1) {
      return nameParts[0][0].toUpperCase(); // Get first letter of single word, uppercase
    } else {
      // Get first letter of first and last name, uppercase
      return nameParts[0][0].toUpperCase() + nameParts[nameParts.length - 1][0].toUpperCase();
    }
  }

  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
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
};

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

export default Profile;


// import React from "react";
// import { Avatar, Stack, Typography } from "@mui/material";
// import {
//   Face as FaceIcon,
//   AlternateEmail as UserNameIcon,
//   CalendarMonth as CalendarIcon,
// } from "@mui/icons-material";
// import moment from "moment";
// import { transformImage } from "../../lib/features";

// const Profile = ({ user }) => {

//   function stringToColor(string) {
//     let hash = 0;
//     let i;

//     /* eslint-disable no-bitwise */
//     for (i = 0; i < string.length; i += 1) {
//       hash = string.charCodeAt(i) + ((hash << 5) - hash);
//     }

//     let color = '#';

//     for (i = 0; i < 3; i += 1) {
//       const value = (hash >> (i * 8)) & 0xff;
//       color += `00${value.toString(16)}`.slice(-2);
//     }
//     /* eslint-enable no-bitwise */

//     return color;
//   }

//   function getInitials(fullName) {
//     // Split the full name into separate words
//     const nameParts = fullName.split(' ');

//     // Handle cases with single or multiple words
//     if (nameParts.length === 1) {
//       return nameParts[0][0].toUpperCase(); // Get first letter of single word, uppercase
//     } else {
//       // Get first letter of first and last name, uppercase
//       return nameParts[0][0].toUpperCase() + nameParts[nameParts.length - 1][0].toUpperCase();
//     }
//   }

//   return (
//     <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
//   {
//   user?.avatar?.url === "" ?<Avatar ></Avatar  
//      <Avatar
//         src={transformImage(user?.avatar?.url)}
//         alt={getInitials(user?.name)}
//         sx={{
//           width: 200,
//           height: 200,
//           objectFit: "contain",
//           marginBottom: "1rem",
//           border: "5px solid white",
//         }}
//       />}
      
//       <ProfileCard heading={"Bio"} text={user?.bio} />
//       <ProfileCard
//         heading={"Username"}
//         text={user?.username}
//         Icon={<UserNameIcon />}
//       />
//       <ProfileCard heading={"Name"} text={user?.name} Icon={<FaceIcon />} />
//       <ProfileCard
//         heading={"Joined"}
//         text={moment(user?.createdAt).fromNow()}
//         Icon={<CalendarIcon />}
//       />
//     </Stack>
//   );
// };

// const ProfileCard = ({ text, Icon, heading }) => (
//   <Stack
//     direction={"row"}
//     alignItems={"center"}
//     spacing={"1rem"}
//     color={"white"}
//     textAlign={"center"}
//   >
//     {Icon && Icon}

//     <Stack>
//       <Typography variant="body1">{text}</Typography>
//       <Typography color={"gray"} variant="caption">
//         {heading}
//       </Typography>
//     </Stack>
//   </Stack>
// );

// export default Profile;
