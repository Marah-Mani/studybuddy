import { Stack, Typography } from "@mui/material";
import ChatItem from "../shared/ChatItem";

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [
    {
      chatId: "",
      count: 0,
    },
  ],
  handleDeleteChat,
}) => {
  return (
    <Stack width={w} borderRadius={"0px"} borderRight={"1px solid gray"}  direction={"column"} overflow={"auto"} height={"100%"}>
      {chats.length === 0 ?
        <Typography height={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"} textAlign={"center"} padding="1rem">People or groups</Typography>
        : chats?.map((data, index) => {
          const { avatar, _id, name, groupChat, members } = data;
          console.log(data);
          const newMessageAlert = newMessagesAlert.find(
            ({ chatId }) => chatId === _id
          );

          const isOnline = members?.some((member) =>
            onlineUsers.includes(member)
          );

          return (
            <ChatItem
              style={{
                borderRadius: "2px",
              }}
              index={index}
              newMessageAlert={newMessageAlert}
              isOnline={isOnline}
              avatar={avatar}
              name={name}
              _id={_id}
              key={_id}
              groupChat={groupChat}
              sameSender={chatId === _id}
              handleDeleteChat={handleDeleteChat}
            />
          );
        })}
    </Stack>
  );
};

export default ChatList;
