import MainCard from 'ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import apiService from 'api';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import SubCard from 'ui-component/cards/SubCard';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Grid, TextField, Button } from '@mui/material';
import SearchInput from 'components/shared/SearchInput';
import SelectPostPerPage from 'components/shared/SelectPostPerPage';
import PaginationComponent from 'components/pagination/PaginationComponent';
import DeleteModal from 'components/modal/DeleteModal';
import TeacherDetailsEditModal from 'components/modal/edit-modal/teacher/TeacherDetailsEditModal';
import { fetchTeacherDetails } from 'store/teacher/teacherReducer';
import { errorObjectValueToArray, toTitleCase } from 'utils/utils';

const initialTeacherDetailsInput = {
  name: '',
  educational_background: '',
  job_exp: '',
  projects: '',
  skills: ''
};

const teacherURL = 'https://website.innovativeskillsbd.com/teacher/teachers/';

const Teacher = () => {
  const dispatch = useDispatch();
  const teacherDetailsFromState = useSelector((state) => state.teacher);
  const [teacherDetailsInput, setTeacherDetailsInput] = useState(initialTeacherDetailsInput);
  const [teacherDetailsList, setTeacherDetailsList] = useState(teacherDetailsFromState);
  const [filteredTeacherDetailsList, setFilteredTeacherDetailsList] = useState(teacherDetailsList);
  const [searchInput, setSearchInput] = useState('');
  const [postPerPage, setPostPerPage] = useState(5);
  const [currentPage, setcurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalshow, setIsEditModalShow] = useState(false);
  const [selectedEditItem, setSelectedEditItem] = useState('');
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentTeacherDetailsList = filteredTeacherDetailsList.slice(firstPostIndex, lastPostIndex);

  useEffect(() => {
    const result = teacherDetailsList.filter((item) => {
      return searchInput.toLowerCase() === '' ? item : item.name.toLowerCase().includes(searchInput);
    });

    if (result.length) {
      setFilteredTeacherDetailsList(result);
    } else if (!searchInput.length) {
      setFilteredTeacherDetailsList(teacherDetailsList);
    } else {
      setFilteredTeacherDetailsList([]);
    }
  }, [searchInput, teacherDetailsList]);

  if (filteredTeacherDetailsList.length) {
    if (Math.ceil(filteredTeacherDetailsList.length / postPerPage) < currentPage) {
      setcurrentPage(1);
    }
  }

  useEffect(() => {
    setTeacherDetailsList(teacherDetailsFromState);
  }, [teacherDetailsFromState]);

  const handleInputValueChange = (e) => {
    setTeacherDetailsInput((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    });
  };
  const handleInputValueSubmit = async (e) => {
    e.preventDefault();
    const response = await apiService.postData(teacherURL, JSON.stringify(teacherDetailsInput));
    if (response.status == 201) {
      toast.success('Successfully added!');
      setTeacherDetailsInput(initialTeacherDetailsInput);
      dispatch(fetchTeacherDetails(teacherURL));
    } else if (response.response.status == 400) {
      const errorArray = errorObjectValueToArray(response.response.data);
      toast.error(`${toTitleCase(errorArray[0])}`);
    } else {
      toast.error('Something went wrong!');
      setTeacherDetailsInput(initialTeacherDetailsInput);
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
    const response = await apiService.deleteData(`${teacherURL}${id}/`);
    if (response.status == 204) {
      setIsDeleteModalOpen(false);
      toast.success('Deleted Successfully!');
      setSelectedEditItem('');
      dispatch(fetchTeacherDetails(teacherURL));
    } else {
      toast.error('Something went wrong');
      setIsDeleteModalOpen(false);
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
      name: selectedEditItem.name,
      educational_background: selectedEditItem.educational_background,
      job_exp: selectedEditItem.job_exp,
      projects: selectedEditItem.projects,
      skills: selectedEditItem.skills
    };

    const response = await apiService.updateData(`${teacherURL}${id}/`, JSON.stringify(updatedField));
    if (response.status == 200) {
      setIsEditModalShow(false);
      setSelectedEditItem('');
      toast.success('Successfully Updated');
      dispatch(fetchTeacherDetails(teacherURL));
    } else {
      setIsEditModalShow(false);
      setSelectedEditItem('');
      toast.error('Something went wrong');
    }
  };

  return (
    <MainCard title="Teacher Deatils Input">
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
                value={teacherDetailsInput.name}
                onChange={handleInputValueChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Educational Background"
                id="educational_background"
                name="educational_background"
                value={teacherDetailsInput.educational_background}
                onChange={handleInputValueChange}
                required
              />
            </Grid>
          </Grid>
          {/* Two half-width input boxes */}
          <Grid container spacing={2} mb={2}>
            <Grid item xs={6}>
              <TextField
                type="number"
                fullWidth
                label="Job Experience"
                id="job_exp"
                name="job_exp"
                value={teacherDetailsInput.job_exp}
                onChange={handleInputValueChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Skills"
                id="skills"
                name="skills"
                value={teacherDetailsInput.skills}
                onChange={handleInputValueChange}
                required
              />
            </Grid>
          </Grid>
          {/* Two half-width input boxes */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                type="number"
                fullWidth
                label="Projects"
                id="project"
                name="projects"
                value={teacherDetailsInput.projects}
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

      <SubCard title="Teacher Details List">
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
                  <TableCell>Educational Background</TableCell>
                  <TableCell>Job Experience</TableCell>
                  {/* <TableCell>Projects</TableCell>
                  <TableCell>Skills</TableCell> */}
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentTeacherDetailsList &&
                  currentTeacherDetailsList.map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell>{(currentPage - 1) * postPerPage + 1 + index}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.educational_background}</TableCell>
                      {/* <TableCell>{row.job_exp}</TableCell>
                      <TableCell>{row.projects}</TableCell> */}
                      <TableCell>{row.skills}</TableCell>
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
            totalPost={teacherDetailsList.length}
          />
          {/* pagination section end */}
        </div>
        {/* table section end */}
      </SubCard>
      {/* Delete Modal */}
      <DeleteModal isOpen={isDeleteModalOpen} onClose={handleDeleteModalClose} handleDelete={handleDeleteConfirm} />

      {/* Edit Modal */}
      <TeacherDetailsEditModal
        editValue={selectedEditItem}
        handleSubmit={handleConfirmEdit}
        handlechange={handleEditValueChange}
        isOpen={isEditModalshow}
        onClose={handleEditModalClose}
      />
    </MainCard>
  );
};

export default Teacher;
