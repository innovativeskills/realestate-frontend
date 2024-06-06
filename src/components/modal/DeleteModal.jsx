import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const DeleteModal = ({ isOpen, onClose, handleDelete }) => {
    const handleCancel = () => {
        onClose();
    };

    return (
        <React.Fragment>
            <Dialog open={isOpen} onClose={handleCancel} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title" style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center' }}>
                    Do you want to delete ?
                </DialogTitle>
                <DialogActions>
                    <Button color="primary" variant="outlined" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button color="secondary" variant="outlined" onClick={handleDelete}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default DeleteModal;
