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
import { useEditRenewalFrequencyMutation } from '../apiSlice';
import { editRenewalFrequencyReq } from '../types';

interface IProps {
    open: boolean;
    setOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}
export default function EditRenewalFreqDialog(props: IProps) {

  const authToken = useSelector((state: RootState) => state.loginStore.authToken);

  const handleClose = () => {
    props.setOpen(false);
  };

  const [editRenewalFrequency] = useEditRenewalFrequencyMutation();


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
            console.log(formData)
            const formJson = Object.fromEntries((formData as any).entries());
            const renewalFrequency = Number(formJson.renewal_frequency);
            const req: editRenewalFrequencyReq = {
                reward_quota_renewal_frequency: renewalFrequency,
                authToken: authToken
            }
            editRenewalFrequency(req).unwrap().then(resp=>{
                toast.success(resp.message)
            }).catch(err=>{
                toast.error(err.data.message)
            })
            handleClose();
          },
        }}
      >
        <DialogTitle>Edit renewal frequency</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="renewal_frequency"
            label="Renewal Frequency"
            type="number"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Apply</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}