import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

const CategoryEditModal = ({ isOpen, onClose, editValue, handlechange, handleSubmit }) => {
    const handleClose = () => {
        onClose();
    };

    return (
        <>
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogContent>
                    <DialogContentText>To update category please input below your correct information.</DialogContentText>
                    <TextField
                        required
                        margin="dense"
                        id="category_name"
                        name="category_name"
                        label="Category Name"
                        value={editValue.category_name}
                        onChange={handlechange}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        id="category_code"
                        name="category_code"
                        label="Category Code"
                        value={editValue.category_code}
                        onChange={handlechange}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        id="category_icon"
                        name="category_icon"
                        label="Category Icon"
                        value={editValue.category_icon}
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

export default CategoryEditModal;
