import * as React from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import { blue } from "@mui/material/colors";
import { Login } from "../../utils/auth/Login";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export interface SimpleDialogProps {
  open: boolean;
  onClose: (value: Login) => void;
  userDetails: Login[];
}
type SetUserInfo = React.Dispatch<React.SetStateAction<Login>>;

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, open, userDetails } = props;

  const handleListItemClick = (user: Login) => {
    onClose(user);
  };

  return (
    <Dialog
      onClose={() => onClose({ userName: "", password: "", id: "" })}
      open={open}
    >
      <DialogTitle>Choose Assignee</DialogTitle>
      <List sx={{ pt: 0 }}>
        {userDetails.map((user) => (
          <ListItem disableGutters key={user.id}>
            <ListItemButton onClick={() => handleListItemClick(user)}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.userName} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default function DialogDemo(props: { setUserInfo: SetUserInfo }) {
  const curUser: Login = useSelector((store: any) => store.user);
  const { setUserInfo } = props;
  const fetchUsers = async (): Promise<void> => {
    const userData = await fetch("http://localhost:3000/users");
    const userJsonData : Login[] = await userData.json();
    const filterUsers : Login[] = userJsonData.filter((user : Login) => user.id != curUser.id);
    setUserDetails(filterUsers);
  };
  const [userDetails, setUserDetails] = useState<Login[]>([
    {
      userName: "",
      password: "",
      id: "",
    },
  ]);
  useEffect(() => {
    fetchUsers();
  }, []);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (user: Login) => {
    setOpen(false);

    setUserInfo(user);
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Choose Assignee
      </Button>
      <SimpleDialog
        open={open}
        onClose={handleClose}
        userDetails={userDetails}
      />
    </div>
  );
}
