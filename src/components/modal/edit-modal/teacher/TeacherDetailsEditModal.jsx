import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

const TeacherDetailsEditModal = ({ isOpen, onClose, editValue, handlechange, handleSubmit }) => {
    const handleClose = () => {
        onClose();
    };

    return (
        <>
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogContent>
                    <DialogContentText>To update teacher details please input below your correct information.</DialogContentText>
                    <TextField
                        required
                        margin="dense"
                        id="name"
                        name="name"
                        label="Name"
                        value={editValue.name}
                        onChange={handlechange}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        id="educational_background"
                        name="educational_background"
                        label="Educational Background"
                        value={editValue.educational_background}
                        onChange={handlechange}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        id="job_exp"
                        name="job_exp"
                        label="Job Experience"
                        value={editValue.job_exp}
                        onChange={handlechange}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        id="projects"
                        name="projects"
                        label="Projects"
                        value={editValue.projects}
                        onChange={handlechange}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        id="skills"
                        name="skills"
                        label="Skills"
                        value={editValue.skills}
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

export default TeacherDetailsEditModal;
