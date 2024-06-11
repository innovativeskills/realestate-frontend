import { useDispatch, useSelector } from 'react-redux';
import { uid } from 'uid';
import apiService from 'api';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import SearchInput from 'components/shared/SearchInput';
import SelectPostPerPage from 'components/shared/SelectPostPerPage';
import PaginationComponent from 'components/pagination/PaginationComponent';
import DeleteModal from 'components/modal/DeleteModal';
import { errorObjectValueToArray, toTitleCase } from 'utils/utils';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Grid, TextField, Button } from '@mui/material';

import { fetchContactInfo } from 'store/company/contactInfoSlice';
import ContactInfoEditModal from 'components/modal/edit-modal/contact-info/ContactInfoEditModal';
import { fetchUserContact } from 'store/user-contact/userContactSlice';
import UserContactModal from 'components/modal/edit-modal/user-contact/UserContactModal';

const initialInputValue = {
  name: '',
  phone_number: '',
  email: '',
  subject: '',
  message: ''
};

const userContactURL = 'https://realestateback.innovativeskillsbd.com/api/usercontact/';

const UserContact = () => {
  const dispatch = useDispatch();
  const userContactFromState = useSelector((state) => state.userContact);
  const [userContactInput, setUserContactInput] = useState(initialInputValue);
  const [userContactList, setUserContactList] = useState(userContactFromState.length ? userContactFromState : []);
  const [filtereduUerContactList, setFiltereduUerContactList] = useState(userContactList.length ? userContactList : []);
  const [searchInput, setSearchInput] = useState('');
  const [postPerPage, setPostPerPage] = useState(5);
  const [currentPage, setcurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalshow, setIsEditModalShow] = useState(false);
  const [selectedEditItem, setSelectedEditItem] = useState('');
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentUserContactList = filtereduUerContactList.length ? filtereduUerContactList.slice(firstPostIndex, lastPostIndex) : [];
  const [updatedField, setUpdatedField] = useState(null);
  useEffect(() => {
    const result = userContactList.filter((item) => {
      return searchInput.toLowerCase() === '' ? item : item.name.toLowerCase().includes(searchInput.toLowerCase());
    });
    setFiltereduUerContactList(result);
  }, [searchInput, userContactList]);

  if (filtereduUerContactList.length) {
    if (Math.ceil(filtereduUerContactList.length / postPerPage) < currentPage) {
      setcurrentPage(1);
    }
  }

  useEffect(() => {
    setUserContactList(userContactFromState.length ? userContactFromState : []);
  }, [userContactFromState]);

  const handleInputValueChange = (e) => {
    setUserContactInput((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    });
  };

  const handleInputValueSubmit = async (e) => {
    e.preventDefault();
    const response = await apiService.postData(userContactURL, JSON.stringify(userContactInput));
    if (response.status == 201) {
      toast.success('Successfully added!');
      dispatch(fetchUserContact(userContactURL));
      setUserContactInput(initialInputValue);
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
    const response = await apiService.deleteData(`${userContactURL}${id}/`);
    if (response.status == 204) {
      setIsDeleteModalOpen(false);
      toast.success('Deleted successfully');
      dispatch(fetchUserContact(userContactURL));
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

  const handleConfirmEdit = async () => {
    const id = selectedEditItem.id;
    const response = await apiService.updateData(`${userContactURL}${id}/`, JSON.stringify(updatedField));
    if (response.status == 200) {
      setIsEditModalShow(false);
      toast.success('Successfully Updated');
      dispatch(fetchUserContact(userContactURL)); //dispatch action to update state
    } else {
      toast.error('Something went wrong.');
      setIsEditModalShow(false);
    }
  };

  return (
    <MainCard title="User Contact Input">
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
                value={userContactInput.name}
                onChange={handleInputValueChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Email" id="email" name="email" value={userContactInput.email} onChange={handleInputValueChange} />
            </Grid>
          </Grid>
          {/* Two half-width input boxes */}
          <Grid container spacing={2} mb={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Phone Number"
                id="phone_number"
                name="phone_number"
                value={userContactInput.phone_number}
                onChange={handleInputValueChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Subject"
                id="subject"
                name="subject"
                value={userContactInput.subject}
                onChange={handleInputValueChange}
                required
              />
            </Grid>
          </Grid>
          {/* Two half-width input boxes */}

          {/* Full-width input box */}
          <Box mb={2}>
            <TextField
              fullWidth
              label="Message"
              id="message"
              name="message"
              value={userContactInput.message}
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

      <SubCard title="User Contact List">
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
                {currentUserContactList &&
                  currentUserContactList.map((row, index) => (
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
            totalPost={userContactList.length}
          />
          {/* pagination section end */}
        </div>
        {/* table section end */}
      </SubCard>
      {/* Delete Modal */}
      <DeleteModal isOpen={isDeleteModalOpen} onClose={handleDeleteModalClose} handleDelete={handleDeleteConfirm} />

      {/* Edit Modal */}
      <UserContactModal
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

export default UserContact;
