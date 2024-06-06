import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

const SubCategoryEditModal = ({ isOpen, onClose, editValue, handlechange, handleSubmit }) => {
    const handleClose = () => {
        onClose();
    };

    return (
        <>
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogContent>
                    <DialogContentText>To update sub category please input below your correct information.</DialogContentText>
                    <TextField
                        required
                        margin="dense"
                        id="subcategory_name"
                        name="subcategory_name"
                        label="Sub Category Name"
                        value={editValue.subcategory_name}
                        onChange={handlechange}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        id="code"
                        name="code"
                        label="Sub Category Code"
                        value={editValue.code}
                        onChange={handlechange}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        id="icon"
                        name="icon"
                        label="Sub Category Icon"
                        value={editValue.icon}
                        onChange={handlechange}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Update</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default SubCategoryEditModal;
