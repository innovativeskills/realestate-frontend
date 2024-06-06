/* eslint-disable prettier/prettier */
import { useDispatch, useSelector } from 'react-redux';
import apiService from 'api';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import {
  Table,
  FormControl,
  TableBody,
  TableCell,
  InputLabel,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem
} from '@mui/material';
import SearchInput from 'components/shared/SearchInput';
import SelectPostPerPage from 'components/shared/SelectPostPerPage';
import PaginationComponent from 'components/pagination/PaginationComponent';
import DeleteModal from 'components/modal/DeleteModal';
import SubCategoryEditModal from 'components/modal/edit-modal/category/SubCategoryEditModal';
import { fetchSubCategories } from 'store/sub-category/SubCategoryReducer';
import { errorObjectValueToArray, toTitleCase } from 'utils/utils';

const initialInputValue = {
  category: '',
  subcategory_name: '',
  code: '',
  icon: ''
};
const subCategoryURL = 'https://website.innovativeskillsbd.com/subCategories/subcategories/';

const SubCategory = () => {
  const dispatch = useDispatch();
  const categoryFromState = useSelector((state) => state.category);
  const subCategoryFromState = useSelector((state) => state.subCategory);
  const [subCategoryInputFieldValue, setSubCategoryInputFieldValue] = useState(initialInputValue);
  const [subCategoryList, setSubCategoryList] = useState(subCategoryFromState);
  const [filteredSubCetegoryList, setFilteredSubCetegoryList] = useState(subCategoryList);
  const [searchInput, setSearchInput] = useState('');
  const [postPerPage, setPostPerPage] = useState(5);
  const [currentPage, setcurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalshow, setIsEditModalShow] = useState(false);
  const [selectedEditItem, setSelectedEditItem] = useState('');
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentSubCategoryList = filteredSubCetegoryList.slice(firstPostIndex, lastPostIndex);

  useEffect(() => {
    const result = subCategoryList.filter((item) => {
      return searchInput.toLowerCase() === '' ? item : item.subcategory_name.toLowerCase().includes(searchInput);
    });

    if (result.length) {
      setFilteredSubCetegoryList(result);
    } else if (!searchInput.length) {
      setFilteredSubCetegoryList(subCategoryList);
    } else {
      setFilteredSubCetegoryList([]);
    }
  }, [searchInput, subCategoryList]);

  if (filteredSubCetegoryList.length) {
    if (Math.ceil(filteredSubCetegoryList.length / postPerPage) < currentPage) {
      setcurrentPage(1);
    }
  }

  useEffect(() => {
    setSubCategoryList(subCategoryFromState);
  }, [subCategoryFromState]);

  const handleInputValueChange = (e) => {
    setSubCategoryInputFieldValue((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    });
  };
  const handleInputValueSubmit = async (e) => {
    e.preventDefault();
    const response = await apiService.postData(subCategoryURL, JSON.stringify(subCategoryInputFieldValue));
    if (response.status == 201) {
      toast.success('Successfully added!');
      setSubCategoryInputFieldValue(initialInputValue);
      dispatch(fetchSubCategories(subCategoryURL));
    } else if (response.response.status == 400) {
      const errorArray = errorObjectValueToArray(response.response.data);
      toast.error(`${toTitleCase(errorArray[0])}`);
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
    const response = await apiService.deleteData(`${subCategoryURL}${id}/`);
    if (response.status == 204) {
      setIsDeleteModalOpen(false);
      toast.success('Deleted Successfully');
      // Reset selectedItem and close the modal
      setSelectedEditItem('');
      dispatch(fetchSubCategories(subCategoryURL));
    } else {
      setIsDeleteModalOpen(false);
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
      subcategory_name: selectedEditItem.subcategory_name,
      code: selectedEditItem.code,
      icon: selectedEditItem.icon
    };
    const response = await apiService.updateData(`${subCategoryURL}${id}/`, JSON.stringify(updatedField));
    if (response.status == 200) {
      setIsEditModalShow(false);
      toast.success('Successfully Updated');
      dispatch(fetchSubCategories(subCategoryURL));
    } else {
      setIsEditModalShow(false);
      toast.error('Something went wrong');
    }
    console.log(updatedField);
  };

  return (
    <MainCard title="Sub Category Input">
      {/* input form start */}
      <form onSubmit={handleInputValueSubmit} style={{ marginBottom: '20px' }}>
        <Box>
          {/* Two half-width input boxes */}
          <Grid container spacing={2} mb={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={subCategoryInputFieldValue.category}
                  label="Select Category"
                  name="category"
                  onChange={handleInputValueChange}
                >
                  <MenuItem>Select</MenuItem>
                  {categoryFromState.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.category_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Sub Category Name"
                id="subcategory_name"
                name="subcategory_name"
                value={subCategoryInputFieldValue.subcategory_name}
                onChange={handleInputValueChange}
                required
              />
            </Grid>
          </Grid>
          {/* Two half-width input boxes */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Sub Category Code"
                id="code"
                name="code"
                value={subCategoryInputFieldValue.code}
                onChange={handleInputValueChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Sub Category Icon"
                id="icon"
                name="icon"
                value={subCategoryInputFieldValue.icon}
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

      <SubCard title="Sub Category List">
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
                  <TableCell>Sub Category Name</TableCell>
                  <TableCell>Code</TableCell>
                  <TableCell>Icon</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentSubCategoryList &&
                  currentSubCategoryList.map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell>{(currentPage - 1) * postPerPage + 1 + index}</TableCell>
                      <TableCell>{row.subcategory_name}</TableCell>
                      <TableCell>{row.code}</TableCell>
                      <TableCell>{row.icon}</TableCell>
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
            totalPost={subCategoryList.length}
          />
          {/* pagination section end */}
        </div>
        {/* table section end */}
      </SubCard>
      {/* delete modal */}
      <DeleteModal isOpen={isDeleteModalOpen} onClose={handleDeleteModalClose} handleDelete={handleDeleteConfirm} />

      {/* edit modal */}
      <SubCategoryEditModal
        editValue={selectedEditItem}
        handlechange={handleEditValueChange}
        handleSubmit={handleConfirmEdit}
        isOpen={isEditModalshow}
        onClose={handleEditModalClose}
      />
    </MainCard>
  );
};

export default SubCategory;
