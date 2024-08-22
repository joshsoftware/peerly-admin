import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useGetUsersQuery, useSendNotificationMutation } from '../apiSlice';
import { sendNotificationReq } from '../types';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { toast } from 'react-toastify';

interface IProps{
    open: boolean
    setOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  }

export default function NotifiyAllDialog(props: IProps) {

  const authToken = useSelector((state: RootState) => state.loginStore.authToken);

  const handleClose = () => {
    props.setOpen(false);
  };

  const [sendNotification] = useSendNotificationMutation()
  
  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const title = formJson.title;
            const body = formJson.message;
            const req : sendNotificationReq = {
                message: {
                    title: title,
                    body: body,
                },
                all: true,
                id: 0,
                authToken: authToken
            }
            sendNotification(req).then(resp => {
                console.log(resp)
                toast.success(resp.data?.message)
            }).catch(resp => {
                console.log(resp)
                toast.error(resp.data.message);
            })
            handleClose();
          },
        }}
      >
        <DialogTitle>Notification</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the notification title and message
          </DialogContentText>
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