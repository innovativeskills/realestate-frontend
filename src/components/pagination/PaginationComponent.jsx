import { Pagination, PaginationItem, Box } from '@mui/material';

const PaginationComponent = ({ totalPost, postPerPage, currentPage, changePage }) => {
    const totalPages = Math.ceil(totalPost / postPerPage);
    const buttonsToShow = 5;

    const handleDecrement = () => {
        if (currentPage <= 1) {
            return;
        } else {
            changePage(currentPage - 1);
        }
    };

    const handleIncrement = () => {
        if (currentPage >= totalPages) {
            return;
        } else {
            changePage(currentPage + 1);
        }
    };

    const getPaginationItems = () => {
        const items = [];
        let startPage = Math.max(1, currentPage - Math.floor(buttonsToShow / 2));
        let endPage = Math.min(startPage + buttonsToShow - 1, totalPages);

        if (endPage - startPage + 1 < buttonsToShow) {
            startPage = Math.max(1, endPage - buttonsToShow + 1);
        }

        for (let number = startPage; number <= endPage; number++) {
            items.push(
                <PaginationItem
                    key={number}
                    selected={number === currentPage}
                    onClick={() => changePage(number)}
                    sx={number === currentPage ? { backgroundColor: 'secondary.main', color: 'white' } : {}}
                >
                    {number}
                </PaginationItem>
            );
        }

        return items;
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <Pagination count={totalPages} page={currentPage} onChange={(e, value) => changePage(value)}>
                <PaginationItem onClick={handleDecrement}>{/* <Pagination.Prev /> */}</PaginationItem>
                {getPaginationItems()}
                <PaginationItem onClick={handleIncrement}>{/* <Pagination.Next /> */}</PaginationItem>
            </Pagination>
        </Box>
    );
};

export default PaginationComponent;
