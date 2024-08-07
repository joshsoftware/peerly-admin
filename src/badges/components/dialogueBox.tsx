import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { useEditBadgeMutation } from '../apiSlice';
import { editBadgeReq } from '../types';

interface IProps {
    open: boolean;
    setOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
    id: number;
}
export default function EditBadgeDialog(props: IProps) {

  const authToken = useSelector((state: RootState) => state.loginStore.authToken);

  const handleClose = () => {
    props.setOpen(false);
  };

  const [editBadge] = useEditBadgeMutation();

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
            const reward_points = Number(formJson.reward_points);
            const req: editBadgeReq = {
                reward_points: reward_points,
                id: props.id,
                authToken: authToken
            }
            editBadge(req).unwrap().then(resp=>{
                toast.success(resp.message)
            }).catch(err=>{
                console.log(err)
            })
            handleClose();
          },
        }}
      >
        <DialogTitle>Edit grade points</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            Are you sure you want to delete the appreciation?
          </DialogContentText> */}
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="reward_points"
            label="Reward Points"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Update</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
