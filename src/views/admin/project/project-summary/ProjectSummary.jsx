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
import { fetchProjectSummary } from 'store/project/projectSummarySlice';
import ProjectSummaryEditModal from 'components/modal/edit-modal/project/project-summary/ProjectSummaryEditModal';

const initialInputValue = {
  project: '',
  icon: '',
  number: '',
  title: ''
};

const projectSummaryURL = 'https://realestateback.innovativeskillsbd.com/api/projectsummary/';

const ProjectSummary = () => {
  const dispatch = useDispatch();
  const projectInfoFromState = useSelector((state) => state.projectInfo);
  const projectSummaryFromState = useSelector((state) => state.projectSummary);
  const [projectSummaryInput, setProjectSummaryInput] = useState(initialInputValue);
  const [projectSummaryList, setProjectSummaryList] = useState(projectSummaryFromState.length ? projectSummaryFromState : []);
  const [filteredProjectSummaryList, setFilteredProjectSummaryList] = useState(projectSummaryList.length ? projectSummaryList : []);
  const [searchInput, setSearchInput] = useState('');
  const [postPerPage, setPostPerPage] = useState(5);
  const [currentPage, setcurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalshow, setIsEditModalShow] = useState(false);
  const [selectedEditItem, setSelectedEditItem] = useState('');
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentProjectSummaryList = filteredProjectSummaryList.length
    ? filteredProjectSummaryList.slice(firstPostIndex, lastPostIndex)
    : [];
  const [updatedField, setUpdatedField] = useState(null);
  useEffect(() => {
    const result = projectSummaryList.filter((item) => {
      return searchInput.toLowerCase() === '' ? item : item.title.toLowerCase().includes(searchInput.toLowerCase());
    });
    setFilteredProjectSummaryList(result);
  }, [searchInput, projectSummaryList]);

  if (filteredProjectSummaryList.length) {
    if (Math.ceil(filteredProjectSummaryList.length / postPerPage) < currentPage) {
      setcurrentPage(1);
    }
  }

  useEffect(() => {
    setProjectSummaryList(projectSummaryFromState.length ? projectSummaryFromState : []);
  }, [projectSummaryFromState]);

  const handleInputValueChange = (e) => {
    setProjectSummaryInput((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    });
  };

  const handleInputValueSubmit = async (e) => {
    e.preventDefault();
    const response = await apiService.postData(projectSummaryURL, JSON.stringify(projectSummaryInput));
    if (response.status == 201) {
      toast.success('Successfully added!');
      dispatch(fetchProjectSummary(projectSummaryURL));
      setProjectSummaryInput(initialInputValue);
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
    const response = await apiService.deleteData(`${projectSummaryURL}${id}/`);
    if (response.status == 204) {
      setIsDeleteModalOpen(false);
      toast.success('Deleted successfully');
      dispatch(fetchProjectSummary(projectSummaryURL));
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
    const response = await apiService.updateData(`${projectSummaryURL}${id}/`, JSON.stringify(updatedField));
    if (response.status == 200) {
      setIsEditModalShow(false);
      toast.success('Successfully Updated');
      dispatch(fetchProjectSummary(projectSummaryURL)); //dispatch action to update state
    } else {
      toast.error('Something went wrong.');
      setIsEditModalShow(false);
    }
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
                <InputLabel id="subcategory">Select Project</InputLabel>
                <Select
                  required
                  labelId="project"
                  id="project"
                  value={projectSummaryInput.project}
                  label="Select Team Member"
                  name="project"
                  onChange={handleInputValueChange}
                >
                  <MenuItem>Select</MenuItem>
                  {projectInfoFromState.map((singleProject) => (
                    <MenuItem key={uid()} value={singleProject.id}>
                      {singleProject.project_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Title"
                id="title"
                name="title"
                value={projectSummaryInput.title}
                onChange={handleInputValueChange}
                required
              />
            </Grid>
          </Grid>
          {/* Two half-width input boxes */}
          <Grid container spacing={2} mb={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Number"
                id="number"
                name="number"
                value={projectSummaryInput.number}
                onChange={handleInputValueChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Icon"
                id="icon"
                name="icon"
                value={projectSummaryInput.icon}
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
                {currentProjectSummaryList &&
                  currentProjectSummaryList.map((row, index) => (
                    <TableRow key={uid()}>
                      <TableCell>{(currentPage - 1) * postPerPage + 1 + index}</TableCell>
                      <TableCell>{row.title}</TableCell>
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
            totalPost={projectSummaryList.length}
          />
          {/* pagination section end */}
        </div>
        {/* table section end */}
      </SubCard>
      {/* Delete Modal */}
      <DeleteModal isOpen={isDeleteModalOpen} onClose={handleDeleteModalClose} handleDelete={handleDeleteConfirm} />

      {/* Edit Modal */}
      {/* <ProjectInfoEditModal
        isOpen={isEditModalshow}
        onClose={handleEditModalClose}
        handleSubmit={handleConfirmEdit}
        selectedEditItem={selectedEditItem}
        setSelectedEditItem={setSelectedEditItem}
        setUpdate={setUpdatedField}
      /> */}
      <ProjectSummaryEditModal
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

export default ProjectSummary;
