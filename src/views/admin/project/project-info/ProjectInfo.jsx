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
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem
} from '@mui/material';
import SearchInput from 'components/shared/SearchInput';
import SelectPostPerPage from 'components/shared/SelectPostPerPage';
import PaginationComponent from 'components/pagination/PaginationComponent';
import DeleteModal from 'components/modal/DeleteModal';
import { errorObjectValueToArray, toTitleCase } from 'utils/utils';
import { fetchProjectInfo } from 'store/project/projectInfoSlice';
import ProjectInfoEditModal from 'components/modal/edit-modal/project/project-info/ProjectInfoEditModal';

const initialInputValue = {
  project_name: '',
  project_code: '',
  description: '',
  brochure_pdf: '',
  agent: ''
};

const projectInfoURL = 'https://realestateback.innovativeskillsbd.com/api/project/';

const ProjectInfo = () => {
  const dispatch = useDispatch();
  const teamMemberFromState = useSelector((state) => state.teamMember);
  const projectInfoFromState = useSelector((state) => state.projectInfo);
  const [projectInfoInput, setProjectInfoInput] = useState(initialInputValue);
  const [projectInfoList, setProjectInfoList] = useState(projectInfoFromState.length ? projectInfoFromState : []);
  const [filteredProjectInfoList, setFilteredProjectInfoList] = useState(projectInfoList.length ? projectInfoList : []);
  const [searchInput, setSearchInput] = useState('');
  const [postPerPage, setPostPerPage] = useState(5);
  const [currentPage, setcurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalshow, setIsEditModalShow] = useState(false);
  const [selectedEditItem, setSelectedEditItem] = useState('');
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentProjectInfoList = filteredProjectInfoList.length ? filteredProjectInfoList.slice(firstPostIndex, lastPostIndex) : [];
  const [updatedField, setUpdatedField] = useState(null);

  useEffect(() => {
    const result = projectInfoList.filter((item) => {
      return searchInput.toLowerCase() === '' ? item : item.project_name.toLowerCase().includes(searchInput.toLowerCase());
    });
    setFilteredProjectInfoList(result);
  }, [searchInput, projectInfoList]);

  if (filteredProjectInfoList.length) {
    if (Math.ceil(filteredProjectInfoList.length / postPerPage) < currentPage) {
      setcurrentPage(1);
    }
  }

  useEffect(() => {
    setProjectInfoList(projectInfoFromState.length ? projectInfoFromState : []);
  }, [projectInfoFromState]);

  const handleInputValueChange = (e) => {
    setProjectInfoInput((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    });
  };
  const handleFileChange = (event) => {
    setProjectInfoInput((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.files[0]
      };
    });
  };
  const handleInputValueSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in projectInfoInput) {
      if (Object.hasOwnProperty.call(projectInfoInput, key)) {
        const value = projectInfoInput[key];
        formData.append(key, value);
      }
    }

    const response = await apiService.postDataAsFormData(projectInfoURL, formData);
    if (response.status == 201) {
      toast.success('Successfully added!');
      dispatch(fetchProjectInfo(projectInfoURL));
      setProjectInfoInput(initialInputValue);
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
    const response = await apiService.deleteData(`${projectInfoURL}${id}/`);
    if (response.status == 204) {
      setIsDeleteModalOpen(false);
      toast.success('Deleted successfully');
      dispatch(fetchProjectInfo(projectInfoURL));
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
    const formData = new FormData();
    if (updatedField) {
      for (const key in updatedField) {
        if (Object.hasOwnProperty.call(updatedField, key)) {
          const value = updatedField[key];
          formData.append(key, value);
        }
      }
    }

    const response = await apiService.updateDataAsFormData(`${projectInfoURL}${id}/`, formData);
    if (response.status == 200) {
      setIsEditModalShow(false);
      toast.success('Successfully Updated');
      dispatch(fetchProjectInfo(projectInfoURL)); //dispatch action to update state
    } else {
      toast.error('Something went wrong.');
      setIsEditModalShow(false);
    }
    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }
  };

  return (
    <MainCard title="Project Info Input">
      {/* input form start */}
      <form onSubmit={handleInputValueSubmit} style={{ marginBottom: '20px' }}>
        <Box>
          {/* Two half-width input boxes */}
          <Grid container spacing={2} mb={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="subcategory">Select Team Member</InputLabel>
                <Select
                  required
                  labelId="agent"
                  id="agent"
                  value={projectInfoInput.agent}
                  label="Select Team Member"
                  name="agent"
                  onChange={handleInputValueChange}
                >
                  <MenuItem>Select</MenuItem>
                  {teamMemberFromState.map((singleMember) => (
                    <MenuItem key={uid()} value={singleMember.id}>
                      {singleMember.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item>
                  <Box display="flex" alignItems="center">
                    <Typography variant="h5" gutterBottom sx={{ marginLeft: 1 }}>
                      Brochure PDF
                    </Typography>
                    <Button variant="outlined" color="secondary" component="label" sx={{ marginLeft: 5 }}>
                      Upload File
                      <input type="file" name="brochure_pdf" onChange={handleFileChange} />
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* Two half-width input boxes */}
          <Grid container spacing={2} mb={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Project Name"
                id="project_name"
                name="project_name"
                value={projectInfoInput.project_name}
                onChange={handleInputValueChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Project Code"
                id="project_code"
                name="project_code"
                value={projectInfoInput.project_code}
                onChange={handleInputValueChange}
                required
              />
            </Grid>
          </Grid>

          {/* Full-width input box */}
          <Box mb={2}>
            <TextField
              fullWidth
              label="Description"
              id="description"
              name="description"
              value={projectInfoInput.description}
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

      <SubCard title="Project Info List">
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
                {currentProjectInfoList &&
                  currentProjectInfoList.map((row, index) => (
                    <TableRow key={uid()}>
                      <TableCell>{(currentPage - 1) * postPerPage + 1 + index}</TableCell>
                      <TableCell>{row.project_name}</TableCell>
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
            totalPost={projectInfoList.length}
          />
          {/* pagination section end */}
        </div>
        {/* table section end */}
      </SubCard>
      {/* Delete Modal */}
      <DeleteModal isOpen={isDeleteModalOpen} onClose={handleDeleteModalClose} handleDelete={handleDeleteConfirm} />

      {/* Edit Modal */}
      {/* <ClientReviewEditModal
        isOpen={isEditModalshow}
        onClose={handleEditModalClose}
        handleSubmit={handleConfirmEdit}
        selectedEditItem={selectedEditItem}
        setSelectedEditItem={setSelectedEditItem}
        setUpdate={setUpdatedField}
      /> */}
      <ProjectInfoEditModal
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

export default ProjectInfo;
