import { Input } from '@mui/material';

const SearchInput = ({ searchInput, setSearchInput, placeholder }) => {
    return (
        <Input
            className="form-control"
            type="search"
            placeholder={placeholder}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            sx={{
                width: '100%',
                maxWidth: '300px', // Adjust as needed
                marginBottom: '16px' // Adjust as needed
            }}
        />
    );
};

export default SearchInput;
