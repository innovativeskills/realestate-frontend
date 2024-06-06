import { useDispatch, useSelector } from 'react-redux';
import apiService from 'api';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Grid, TextField, Button } from '@mui/material';
import SearchInput from 'components/shared/SearchInput';
import SelectPostPerPage from 'components/shared/SelectPostPerPage';
import PaginationComponent from 'components/pagination/PaginationComponent';
import DeleteModal from 'components/modal/DeleteModal';
import CategoryEditModal from 'components/modal/edit-modal/category/CategoryEditModal';
import { fetchCategory } from 'store/category/categoryReducer';
import { errorObjectValueToArray, toTitleCase } from 'utils/utils';

const initialInputValue = {
  category_name: '',
  category_code: '',
  category_icon: ''
};
const categoryURL = 'https://website.innovativeskillsbd.com/mainCategories/categories/';

const Category = () => {
  const dispatch = useDispatch();
  const categoryFromState = useSelector((state) => state.category);
  const [categoryInputFieldValue, setCategoryInputFieldValue] = useState(initialInputValue);
  const [categoryList, setCategoryList] = useState(categoryFromState.length ? categoryFromState : []);
  const [filteredCetegoryList, setFilteredCetegoryList] = useState(categoryList.length ? categoryList : []);
  const [searchInput, setSearchInput] = useState('');
  const [postPerPage, setPostPerPage] = useState(5);
  const [currentPage, setcurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalshow, setIsEditModalShow] = useState(false);
  const [selectedEditItem, setSelectedEditItem] = useState('');
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentCategoryList = filteredCetegoryList.length ? filteredCetegoryList.slice(firstPostIndex, lastPostIndex) : [];

  useEffect(() => {
    const result = categoryList.filter((item) => {
      return searchInput.toLowerCase() === '' ? item : item.category_name.toLowerCase().includes(searchInput);
    });

    if (result.length) {
      setFilteredCetegoryList(result);
    } else if (!searchInput.length) {
      setFilteredCetegoryList(categoryList);
    } else {
      setFilteredCetegoryList([]);
    }
  }, [searchInput, categoryList]);

  if (filteredCetegoryList.length) {
    if (Math.ceil(filteredCetegoryList.length / postPerPage) < currentPage) {
      setcurrentPage(1);
    }
  }

  useEffect(() => {
    setCategoryList(categoryFromState.length ? categoryFromState : []);
  }, [categoryFromState]);

  const handleInputValueChange = (e) => {
    setCategoryInputFieldValue((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    });
  };
  const handleInputValueSubmit = async (e) => {
    e.preventDefault();
    const response = await apiService.postData(categoryURL, JSON.stringify(categoryInputFieldValue));
    if (response.status == 201) {
      toast.success('Successfully added!');
      dispatch(fetchCategory(categoryURL));
      setCategoryInputFieldValue(initialInputValue);
    } else if (response.response.status == 400) {
      const resultArray = errorObjectValueToArray(response.response.data);
      toast.error(`${toTitleCase(resultArray[0])}`);
    } else {
      toast.error('Something went wrong !');
    }
  };
  const changePage = (pageNumber) => {
    setcurrentPage(pageNumber);
  };
  const handleDeleteClick = (item) => {
    setSelectedEditItem(item);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    const id = selectedEditItem.id;
    const response = await apiService.deleteData(`${categoryURL}${id}/`);
    if (response.status == 204) {
      setIsDeleteModalOpen(false);
      toast.success('Deleted successfully');
      dispatch(fetchCategory(categoryURL));
    } else {
      toast.error('Something went wrong');
    }
  };

  const handleDeleteModalClose = () => {
    // Reset selectedItemId and close the modal
    setSelectedEditItem('');
    setIsDeleteModalOpen(false);
  };
  const handleEditModalClose = () => {
    setSelectedEditItem('');
    setIsEditModalShow(false);
  };

  const handleEditClick = (item) => {
    setSelectedEditItem(item);
    setIsEditModalShow(true);
  };

  const handleEditValueChange = (e) => {
    setSelectedEditItem((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    });
  };

  const handleConfirmEdit = async () => {
    const id = selectedEditItem.id;
    const updatedField = {
      category_name: selectedEditItem.category_name,
      category_code: selectedEditItem.category_code,
      category_icon: selectedEditItem.category_icon
    };
    const response = await apiService.updateData(`${categoryURL}${id}/`, JSON.stringify(updatedField));
    if (response.status == 200) {
      setIsEditModalShow(false);
      toast.success('Successfully Updated');
      dispatch(fetchCategory(categoryURL)); //dispatch action to update state
    } else {
      toast.error('Something went wrong.');
      setIsEditModalShow(false);
    }
  };

  return (
    <MainCard title="Category Input">
      {/* input form start */}
      <form onSubmit={handleInputValueSubmit} style={{ marginBottom: '20px' }}>
        <Box>
          {/* Full-width input box */}
          <Box mb={2}>
            <TextField
              fullWidth
              label="Category Name"
              id="category_name"
              name="category_name"
              value={categoryInputFieldValue.category_name}
              onChange={handleInputValueChange}
              required
              inputProps={{ minLength: 3 }}
            />
          </Box>

          {/* Two half-width input boxes */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Category Code"
                id="category_code"
                name="category_code"
                value={categoryInputFieldValue.category_code}
                onChange={handleInputValueChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Category Icon"
                id="category_icon"
                name="category_icon"
                value={categoryInputFieldValue.category_icon}
                onChange={handleInputValueChange}
                required
              />
            </Grid>
          </Grid>

          {/* Submit button */}
          <Grid container justifyContent="flex-start" mt={2}>
            <Grid item>
              <Button variant="contained" color="secondary" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
      {/* input form end */}

      <SubCard title="Category List">
        {/* table section start */}
        <div>
          {/* pre table section start */}
          <Box display="flex" justifyContent="space-between">
            <SelectPostPerPage setPostPerPage={setPostPerPage} postPerPage={postPerPage} />
            <SearchInput placeholder={'Search here'} searchInput={searchInput} setSearchInput={setSearchInput} />
          </Box>
          {/* pre table section end */}

          {/* main table section start */}
          <TableContainer
            component={Paper}
            sx={{ border: '1px solid #e0e0e0', borderRadius: '4px', overflow: 'hidden', marginBottom: '10px' }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Serial</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Code</TableCell>
                  <TableCell>Icon</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentCategoryList &&
                  currentCategoryList.map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell>{(currentPage - 1) * postPerPage + 1 + index}</TableCell>
                      <TableCell>{row.category_name}</TableCell>
                      <TableCell>{row.category_code}</TableCell>
                      <TableCell>{row.category_icon}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleEditClick(row)} variant="contained" color="primary" style={{ marginRight: '5px' }}>
                          Edit
                        </Button>
                        <Button onClick={() => handleDeleteClick(row)} variant="contained" color="secondary">
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* main table section end */}

          {/* pagination section start */}
          <PaginationComponent
            changePage={changePage}
            currentPage={currentPage}
            postPerPage={postPerPage}
            totalPost={categoryList.length}
          />
          {/* pagination section end */}
        </div>
        {/* table section end */}
      </SubCard>
      {/* Delete Modal */}
      <DeleteModal isOpen={isDeleteModalOpen} onClose={handleDeleteModalClose} handleDelete={handleDeleteConfirm} />

      {/* Edit Modal */}
      <CategoryEditModal
        isOpen={isEditModalshow}
        onClose={handleEditModalClose}
        editValue={selectedEditItem}
        handlechange={handleEditValueChange}
        handleSubmit={handleConfirmEdit}
      />
    </MainCard>
  );
};

export default Category;
