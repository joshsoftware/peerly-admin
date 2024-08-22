import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useResolveAppreciationMutation } from '../apiSlice';
import { moderationReq } from '../types';
import { toast } from 'react-toastify';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';

interface IProps {
    open: boolean;
    setOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
    id: number;
}
export default function ResolveDialog(props: IProps) {

  const authToken = useSelector((state: RootState) => state.loginStore.authToken);

  const handleClose = () => {
    props.setOpen(false);
  };

  const [resolveAppreciation] = useResolveAppreciationMutation();

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
            const moderationComment = formJson.moderator_comment;
            const req: moderationReq = {
                moderator_comment: moderationComment,
                id: props.id,
                authToken: authToken
            }
            resolveAppreciation(req).unwrap().then(resp=>{
                toast.success(resp.message)
            }).catch(err=>{
                toast.error(err.data.message)
            })
            handleClose();
          },
        }}
      >
        <DialogTitle>Resolve Appreciation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to resolve the appreciation?
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="moderator_comment"
            label="Moderation Comment"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Resolve</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}