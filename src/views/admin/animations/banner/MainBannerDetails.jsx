import { useDispatch, useSelector } from 'react-redux';
import apiService from 'api';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Typography,
  TableHead,
  TableRow,
  Paper,
  Box,
  Grid,
  TextField,
  Button
} from '@mui/material';
import SearchInput from 'components/shared/SearchInput';
import SelectPostPerPage from 'components/shared/SelectPostPerPage';
import PaginationComponent from 'components/pagination/PaginationComponent';
import DeleteModal from 'components/modal/DeleteModal';
import CategoryEditModal from 'components/modal/edit-modal/category/CategoryEditModal';
import { fetchCategory } from 'store/category/categoryReducer';
import { errorObjectValueToArray, toTitleCase } from 'utils/utils';
import { fetchBannerDetails } from 'store/banner/banner';
import MainBannerEditModal from 'components/modal/edit-modal/main-banner/MainBannerEditModal';

const initialInputValue = {
  title: '',
  discount: '',
  image: ''
};
const categoryURL = 'https://website.innovativeskillsbd.com/mainCategories/categories/';
const bannerDetailsURL = 'url';

const MainBannerDetails = () => {
  const dispatch = useDispatch();
  const bannerFromState = useSelector((state) => state.banner);
  const [bannerDetailsInput, setBannerDetailsInput] = useState(initialInputValue);
  const [bannerDetailsList, setBannerDetailsList] = useState(bannerFromState.length ? bannerFromState : []);
  const [filteredBannerDetailsList, setFilteredBannerDetailsList] = useState(bannerDetailsList.length ? bannerDetailsList : []);
  const [searchInput, setSearchInput] = useState('');
  const [postPerPage, setPostPerPage] = useState(5);
  const [currentPage, setcurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalshow, setIsEditModalShow] = useState(false);
  const [selectedEditItem, setSelectedEditItem] = useState('');
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentBannerDetailsList = filteredBannerDetailsList.length ? filteredBannerDetailsList.slice(firstPostIndex, lastPostIndex) : [];
  const [updatedField, setUpdatedField] = useState(null);
  useEffect(() => {
    const result = bannerDetailsList.filter((item) => {
      return searchInput.toLowerCase() === '' ? item : item.title.toLowerCase().includes(searchInput);
    });

    if (result.length) {
      setFilteredBannerDetailsList(result);
    } else if (!searchInput.length) {
      setFilteredBannerDetailsList(bannerDetailsList);
    } else {
      setFilteredBannerDetailsList([]);
    }
  }, [searchInput, bannerDetailsList]);

  if (filteredBannerDetailsList.length) {
    if (Math.ceil(filteredBannerDetailsList.length / postPerPage) < currentPage) {
      setcurrentPage(1);
    }
  }

  useEffect(() => {
    setBannerDetailsList(bannerFromState.length ? bannerFromState : []);
  }, [bannerFromState]);

  const handleInputValueChange = (e) => {
    setBannerDetailsInput((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    });
  };
  const handleFileChange = (event) => {
    setBannerDetailsInput((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.files[0]
      };
    });
  };
  const handleInputValueSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', bannerDetailsInput.title);
    formData.append('discount', bannerDetailsInput.discount);
    formData.append('image', bannerDetailsInput.image);
    const response = await apiService.postDataAsFormData(bannerDetailsURL, formData);
    if (response.status == 201) {
      toast.success('Successfully added!');
      dispatch(fetchBannerDetails(bannerDetailsURL));
      setBannerDetailsInput(initialInputValue);
    } else if (response.response.status == 400) {
      const resultArray = errorObjectValueToArray(response.response.data);
      toast.error(`${toTitleCase(resultArray[0])}`);
    } else {
      toast.error('Something went wrong !');
    }
    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }
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
    const response = await apiService.deleteData(`${bannerDetailsURL}${id}/`);
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
    const formData = new FormData();
    if (updatedField) {
      for (const key in updatedField) {
        if (Object.hasOwnProperty.call(updatedField, key)) {
          const value = updatedField[key];
          formData.append(key, value);
        }
      }
    }

    const response = await apiService.updateDataAsFormData(`bannerDetailsURL${id}`, formData);
    if (response.status == 200) {
      setIsEditModalShow(false);
      toast.success('Successfully Updated');
      dispatch(fetchBannerDetails(bannerDetailsURL)); //dispatch action to update state
    } else {
      toast.error('Something went wrong.');
      setIsEditModalShow(false);
    }
  };

  return (
    <MainCard title="Banner Details Input">
      {/* input form start */}
      <form onSubmit={handleInputValueSubmit} style={{ marginBottom: '20px' }}>
        <Box>
          {/* Full-width input box */}
          <Box mb={2}>
            <TextField
              fullWidth
              label="Slider Title"
              id="title"
              name="title"
              value={bannerDetailsInput.title}
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
                type="number"
                label="Discount"
                id="discount"
                name="discount"
                value={bannerDetailsInput.discount}
                onChange={handleInputValueChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item>
                  <Box display="flex" alignItems="center">
                    <Typography variant="h5" gutterBottom sx={{ marginLeft: 1 }}>
                      Banner Image
                    </Typography>
                    <Button variant="outlined" color="secondary" component="label" sx={{ marginLeft: 5 }}>
                      Upload File
                      <input type="file" name="image" onChange={handleFileChange} />
                    </Button>
                  </Box>
                </Grid>
              </Grid>
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

      <SubCard title="Banner Details List">
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
                  <TableCell>Discount</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentBannerDetailsList &&
                  currentBannerDetailsList.map((row, index) => (
                    <TableRow key={row.id + 5}>
                      <TableCell>{(currentPage - 1) * postPerPage + 1 + index}</TableCell>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.discount}</TableCell>
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
            totalPost={bannerDetailsList.length}
          />
          {/* pagination section end */}
        </div>
        {/* table section end */}
      </SubCard>
      {/* Delete Modal */}
      <DeleteModal isOpen={isDeleteModalOpen} onClose={handleDeleteModalClose} handleDelete={handleDeleteConfirm} />

      {/* Edit Modal */}
      <MainBannerEditModal
        isOpen={isEditModalshow}
        onClose={handleEditModalClose}
        handleSubmit={handleConfirmEdit}
        selectedEditItem={selectedEditItem}
        setSelectedEditItem={setSelectedEditItem}
        setUpdate={setUpdatedField}
      />
    </MainCard>
  );
};

export default MainBannerDetails;
