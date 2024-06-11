import { useDispatch, useSelector } from 'react-redux';
import { uid } from 'uid';
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
import { errorObjectValueToArray, toTitleCase } from 'utils/utils';
import { fetchClientReview } from 'store/client-review/clientReview';
import ClientReviewEditModal from 'components/modal/edit-modal/client-review/ClientReviewEditModal';

const initialInputValue = {
  name: '',
  description: '',
  image: ''
};

const clientReviewURL = 'https://realestateback.innovativeskillsbd.com/api/clientreview/';

const ClientReviewInputPage = () => {
  const dispatch = useDispatch();
  const clientReviewFromState = useSelector((state) => state.clientReview);
  const [clientReviewInput, setClientReviewInput] = useState(initialInputValue);
  const [clientReviewList, setClientReviewList] = useState(clientReviewFromState.length ? clientReviewFromState : []);
  const [filteredClientReviewList, setFilteredClientReviewList] = useState(clientReviewList.length ? clientReviewList : []);
  const [searchInput, setSearchInput] = useState('');
  const [postPerPage, setPostPerPage] = useState(5);
  const [currentPage, setcurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalshow, setIsEditModalShow] = useState(false);
  const [selectedEditItem, setSelectedEditItem] = useState('');
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentClientReviewList = filteredClientReviewList.length ? filteredClientReviewList.slice(firstPostIndex, lastPostIndex) : [];
  const [updatedField, setUpdatedField] = useState(null);

  useEffect(() => {
    const result = clientReviewList.filter((item) => {
      return searchInput.toLowerCase() === '' ? item : item.name.toLowerCase().includes(searchInput);
    });
    setFilteredClientReviewList(result);
  }, [searchInput, clientReviewList]);

  if (filteredClientReviewList.length) {
    if (Math.ceil(filteredClientReviewList.length / postPerPage) < currentPage) {
      setcurrentPage(1);
    }
  }

  useEffect(() => {
    setClientReviewList(clientReviewFromState.length ? clientReviewFromState : []);
  }, [clientReviewFromState]);

  const handleInputValueChange = (e) => {
    setClientReviewInput((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    });
  };
  const handleFileChange = (event) => {
    setClientReviewInput((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.files[0]
      };
    });
  };
  const handleInputValueSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in clientReviewInput) {
      if (Object.hasOwnProperty.call(clientReviewInput, key)) {
        const value = clientReviewInput[key];
        formData.append(key, value);
      }
    }
    const response = await apiService.postDataAsFormData(clientReviewURL, formData);
    if (response.status == 201) {
      toast.success('Successfully added!');
      dispatch(fetchClientReview(clientReviewURL));
      setClientReviewInput(initialInputValue);
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
    const response = await apiService.deleteData(`${clientReviewURL}${id}/`);
    if (response.status == 204) {
      setIsDeleteModalOpen(false);
      toast.success('Deleted successfully');
      dispatch(fetchClientReview(clientReviewURL));
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
    console.log(selectedEditItem);
    const formData = new FormData();
    if (updatedField) {
      for (const key in updatedField) {
        if (Object.hasOwnProperty.call(updatedField, key)) {
          const value = updatedField[key];
          formData.append(key, value);
        }
      }
    }

    const response = await apiService.updateDataAsFormData(`${clientReviewURL}${id}/`, formData);
    if (response.status == 200) {
      setIsEditModalShow(false);
      toast.success('Successfully Updated');
      dispatch(fetchClientReview(clientReviewURL)); //dispatch action to update state
    } else {
      toast.error('Something went wrong.');
      setIsEditModalShow(false);
    }
    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }
  };

  return (
    <MainCard title="Client Review Input">
      {/* input form start */}
      <form onSubmit={handleInputValueSubmit} style={{ marginBottom: '20px' }}>
        <Box>
          {/* Two half-width input boxes */}
          <Grid container spacing={2} mb={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Name"
                id="name"
                name="name"
                value={clientReviewInput.name}
                onChange={handleInputValueChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item>
                  <Box display="flex" alignItems="center">
                    <Typography variant="h5" gutterBottom sx={{ marginLeft: 1 }}>
                      Client Image
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
          {/* Full-width input box */}
          <Box mb={2}>
            <TextField
              fullWidth
              label="Description"
              id="description"
              name="description"
              value={clientReviewInput.description}
              onChange={handleInputValueChange}
              required
              inputProps={{ minLength: 3 }}
              multiline
              rows={4}
            />
          </Box>

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

      <SubCard title="Client Review List">
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
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentClientReviewList &&
                  currentClientReviewList.map((row, index) => (
                    <TableRow key={uid()}>
                      <TableCell>{(currentPage - 1) * postPerPage + 1 + index}</TableCell>
                      <TableCell>{row.name}</TableCell>
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
            totalPost={clientReviewList.length}
          />
          {/* pagination section end */}
        </div>
        {/* table section end */}
      </SubCard>
      {/* Delete Modal */}
      <DeleteModal isOpen={isDeleteModalOpen} onClose={handleDeleteModalClose} handleDelete={handleDeleteConfirm} />

      {/* Edit Modal */}
      <ClientReviewEditModal
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

export default ClientReviewInputPage;
