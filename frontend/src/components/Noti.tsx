import { ListItemButton, ListItemText, Divider } from "@mui/material";
import moment from "moment";
import { FC } from "react";
import { UserNotification } from "../types";

export const Noti: FC<{ un: UserNotification }> = ({ un }) => (
    <>
      <ListItemButton alignItems="flex-start" component="a" href={un.link}>
        <ListItemText
          primary={un.title}
          secondary={`${un.body} // ${moment(un.date).fromNow()}`} />
      </ListItemButton>
      <Divider />
    </>
  );