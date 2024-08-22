import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useGetUsersQuery, useSendNotificationMutation } from "../apiSlice";
import { sendNotificationReq, user, userDropdown } from "../types";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { toast } from "react-toastify";
import { Autocomplete } from "@mui/material";

interface IProps {
  open: boolean;
  setOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

export default function NotifiyUserDialog(props: IProps) {
  const handleClose = () => {
    props.setOpen(false);
  };

  const [sendNotification] = useSendNotificationMutation();
  const authToken = useSelector(
    (state: RootState) => state.loginStore.authToken
  );

  const [selectedUser, setSelectedUser] = React.useState<userDropdown | null>();


  const { data, isError, isFetching } = useGetUsersQuery({
    page: 1,
    page_size: 400,
    authToken: authToken
  });

  const [users, setUsers] = React.useState<userDropdown[]>([])


  React.useEffect(()=>{
    setUsers([])
    if (data != undefined){
        data.data.user_list.map((user)=>{
            return setUsers((prevData)=>[...prevData,{
                label: user.first_name + " "+ user.last_name,
                id: user.id,
            }])
        })
    }
    console.log(users)
  },[data])

  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            console.log("formJson -> ", formJson)
            console.log("user -> ",selectedUser)
            const title = formJson.title;
            const body = formJson.message;
            const id =  selectedUser?.id
            const req: sendNotificationReq = {
              message: {
                title: title,
                body: body,
              },
              all: false,
              id: id,
              authToken: authToken,
            };
            sendNotification(req)
              .then((resp) => {
                console.log(resp);
                toast.success(resp.data?.message);
              })
              .catch((resp) => {
                console.log(resp);
                toast.error(resp.data.message);
              });
            handleClose();
          },
        }}
      >
        <DialogTitle>Notification</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the notification title and message
          </DialogContentText>
          <Autocomplete
          aria-required
            disablePortal
            options={users}
            value={selectedUser}
            onChange={(event, newValue) => setSelectedUser(newValue)}
            renderInput={(params) => (
              <TextField {...params} label="User" id="user" name="user" required />
            )}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="message"
            name="message"
            label="Message"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Send</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}