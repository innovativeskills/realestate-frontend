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
import { fetchCompanySummary } from 'store/company/companySummary';
import { fetchContactInfo } from 'store/company/contactInfoSlice';
import ContactInfoEditModal from 'components/modal/edit-modal/contact-info/ContactInfoEditModal';

const initialInputValue = {
  name: '',
  email: '',
  phone_number_one: '',
  phone_number_two: '',
  address: '',
  facebook_link: '',
  instagram_link: '',
  linkedin_link: '',
  youtube_link: ''
};

const contactInfoURL = 'https://realestateback.innovativeskillsbd.com/api/contactinfo/';

const ContactInfo = () => {
  const dispatch = useDispatch();
  const contactInfoFromState = useSelector((state) => state.contactInfo);
  const [contactInfoInput, setcontactInfoInput] = useState(initialInputValue);
  const [contactInfoList, setContactInfoList] = useState(contactInfoFromState.length ? contactInfoFromState : []);
  const [filteredContactInfoList, setFilteredContactInfoList] = useState(contactInfoList.length ? contactInfoList : []);
  const [searchInput, setSearchInput] = useState('');
  const [postPerPage, setPostPerPage] = useState(5);
  const [currentPage, setcurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalshow, setIsEditModalShow] = useState(false);
  const [selectedEditItem, setSelectedEditItem] = useState('');
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentContactInfoList = filteredContactInfoList.length ? filteredContactInfoList.slice(firstPostIndex, lastPostIndex) : [];
  const [updatedField, setUpdatedField] = useState(null);

  useEffect(() => {
    const result = contactInfoList.filter((item) => {
      return searchInput.toLowerCase() === '' ? item : item.name.toLowerCase().includes(searchInput.toLowerCase());
    });
    setFilteredContactInfoList(result);
  }, [searchInput, contactInfoList]);

  if (filteredContactInfoList.length) {
    if (Math.ceil(filteredContactInfoList.length / postPerPage) < currentPage) {
      setcurrentPage(1);
    }
  }

  useEffect(() => {
    setContactInfoList(contactInfoFromState.length ? contactInfoFromState : []);
  }, [contactInfoFromState]);

  const handleInputValueChange = (e) => {
    setcontactInfoInput((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    });
  };

  const handleInputValueSubmit = async (e) => {
    e.preventDefault();
    console.log(contactInfoInput);
    const response = await apiService.postData(contactInfoURL, JSON.stringify(contactInfoInput));
    if (response.status == 201) {
      toast.success('Successfully added!');
      dispatch(fetchContactInfo(contactInfoURL));
      setcontactInfoInput(initialInputValue);
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
    const response = await apiService.deleteData(`${contactInfoURL}${id}/`);
    if (response.status == 204) {
      setIsDeleteModalOpen(false);
      toast.success('Deleted successfully');
      dispatch(fetchContactInfo(contactInfoURL));
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
    const response = await apiService.updateData(`${contactInfoURL}${id}/`, JSON.stringify(updatedField));
    if (response.status == 200) {
      setIsEditModalShow(false);
      toast.success('Successfully Updated');
      dispatch(fetchContactInfo(contactInfoURL)); //dispatch action to update state
    } else {
      toast.error('Something went wrong.');
      setIsEditModalShow(false);
    }
  };

  return (
    <MainCard title="Contact Info Input">
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
                value={contactInfoInput.name}
                onChange={handleInputValueChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Email" id="email" name="email" value={contactInfoInput.email} onChange={handleInputValueChange} />
            </Grid>
          </Grid>
          {/* Two half-width input boxes */}
          <Grid container spacing={2} mb={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Phone Number 1"
                id="phone_number_one"
                name="phone_number_one"
                value={contactInfoInput.phone_number_one}
                onChange={handleInputValueChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Phone Number 2"
                id="phone_number_two"
                name="phone_number_two"
                value={contactInfoInput.phone_number_two}
                onChange={handleInputValueChange}
              />
            </Grid>
          </Grid>
          {/* Two half-width input boxes */}
          <Grid container spacing={2} mb={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Address"
                id="address"
                name="address"
                value={contactInfoInput.address}
                onChange={handleInputValueChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Facebook Link"
                id="facebook_link"
                name="facebook_link"
                value={contactInfoInput.facebook_link}
                onChange={handleInputValueChange}
              />
            </Grid>
          </Grid>
          {/* Two half-width input boxes */}
          <Grid container spacing={2} mb={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Instagram Link"
                id="instagram_link"
                name="instagram_link"
                value={contactInfoInput.instagram_link}
                onChange={handleInputValueChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Linkedin Link"
                id="linkedin_link"
                name="linkedin_link"
                value={contactInfoInput.linkedin_link}
                onChange={handleInputValueChange}
              />
            </Grid>
          </Grid>
          {/* Two half-width input boxes */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Youtube Link"
                id="youtube_link"
                name="youtube_link"
                value={contactInfoInput.youtube_link}
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

      <SubCard title="Contact Info List">
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
                {currentContactInfoList &&
                  currentContactInfoList.map((row, index) => (
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
            totalPost={contactInfoList.length}
          />
          {/* pagination section end */}
        </div>
        {/* table section end */}
      </SubCard>
      {/* Delete Modal */}
      <DeleteModal isOpen={isDeleteModalOpen} onClose={handleDeleteModalClose} handleDelete={handleDeleteConfirm} />

      {/* Edit Modal */}
      <ContactInfoEditModal
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

export default ContactInfo;
