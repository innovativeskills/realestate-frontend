import React from 'react';
import { FormControl, Select, MenuItem, Typography, Box } from '@mui/material';

const SelectPostPerPage = ({ postPerPage, setPostPerPage }) => {
    const handleChange = (event) => {
        setPostPerPage(event.target.value);
    };

    return (
        <Box display="flex">
            <Typography sx={{ marginRight: '8px' }}>Show</Typography>
            <FormControl sx={{ minWidth: '80px', marginRight: '8px' }}>
                <Select
                    value={postPerPage}
                    onChange={handleChange}
                    sx={{
                        height: '30px', // Custom height
                        '& .MuiSelect-root': {
                            padding: '0' // Remove padding
                        }
                    }}
                >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={15}>15</MenuItem>
                </Select>
            </FormControl>
            <Typography>entries</Typography>
        </Box>
    );
};

export default SelectPostPerPage;
