import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import { FaFlag } from 'react-icons/fa';

const options = [
  { label: 'Low', icon: <FaFlag color="green" /> },
  { label: 'Normal', icon: <FaFlag color="yellow" /> },
  { label: 'High', icon: <FaFlag color="red" /> },
];

function ConfirmationDialogRaw(props) {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleCancel = () => {
    onClose();
  };

  const handleListItemClick = (newValue) => {
    setValue(newValue);
    onClose(newValue);
  };

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '100%', maxHeight: 295, maxWidth: '220px', minHeight: '200px'} }}
      maxWidth="xs"
      open={open}
      {...other}
    >
      <DialogTitle>Priority</DialogTitle>
      <DialogContent dividers>
        <List>
          {options.map((option) => (
            <ListItemButton
              key={option.label}
              onClick={() => handleListItemClick(option.label)}
            >
              <ListItemText
                primary={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {option.icon}
                    <span style={{ marginLeft: '8px' }}>{option.label}</span>
                  </div>
                }
              />
            </ListItemButton>
          ))}
        </List>
      </DialogContent>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
        {/* No Ok button needed */}
      </Box>
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

export default function ConfirmationDialog() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('Low');

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 100 }}>
      <List component="div" role="group">
        <ListItemButton divider disabled></ListItemButton>
        <ListItemButton
          divider
          aria-haspopup="true"
          aria-controls="ringtone-menu"
          aria-label="phone ringtone"
          onClick={handleClickListItem}
        >
          <ListItemText primary="" secondary={value !== '' && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {options.find(option => option.label === value).icon}
              <span style={{ marginLeft: '8px' }}>{value}</span>
            </div>
          )} />
        </ListItemButton>

        <ConfirmationDialogRaw
          id="ringtone-menu"
          keepMounted
          open={open}
          onClose={handleClose}
          value={value}
        />
      </List>
    </Box>
  );
}
