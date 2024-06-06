import { useDispatch, useSelector } from 'react-redux';
import apiService from 'api';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import {
  Table,
  FormControl,
  InputLabel,
  Select,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Grid,
  TextField,
  Button,
  MenuItem
} from '@mui/material';
import SearchInput from 'components/shared/SearchInput';
import SelectPostPerPage from 'components/shared/SelectPostPerPage';
import PaginationComponent from 'components/pagination/PaginationComponent';
import DeleteModal from 'components/modal/DeleteModal';
import { fetchCategory } from 'store/category/categoryReducer';
import CourseContentEditModal from 'components/modal/edit-modal/course/CourseContentEditModal';
import { fetchCourseContent } from 'store/course/courseContentReducer';

const initialInputValue = {
  course: '',
  title: '',
  class_number: '',
  content_video_link: ''
};
const courseContentURL = 'https://website.innovativeskillsbd.com/mainCategories/categories/';

const CourseContent = () => {
  const dispatch = useDispatch();
  const categoryFromState = useSelector((state) => state.category);
  const courseListFromStore = useSelector((state) => state.course);
  const courseContentListFromStore = useSelector((state) => state.courseContent);
  const [courseContentInputFieldValue, setCourseContentCategoryInputFieldValue] = useState(initialInputValue);
  const [courseContentList, setCourseContentList] = useState(courseContentListFromStore);
  const [filteredCourseContentList, setFilteredCourseContentList] = useState(courseContentList);
  const [updatedCourseContentField, setUpdatedCourseContentField] = useState({}) //here will save just updated field
  const [searchInput, setSearchInput] = useState('');
  const [postPerPage, setPostPerPage] = useState(5);
  const [currentPage, setcurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalshow, setIsEditModalShow] = useState(false);
  const [selectedEditItem, setSelectedEditItem] = useState('');
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentCourseContentList = filteredCourseContentList.slice(firstPostIndex, lastPostIndex);

  useEffect(() => {
    const result = courseContentList.filter((item) => {
      return searchInput.toLowerCase() === '' ? item : item.title.toLowerCase().includes(searchInput);
    });

    if (result.length) {
      setFilteredCourseContentList(result);
    } else if (!searchInput.length) {
      setFilteredCourseContentList(courseContentList);
    } else {
      setFilteredCourseContentList([]);
    }
  }, [searchInput, courseContentList]);

  if (filteredCourseContentList.length) {
    if (Math.ceil(filteredCourseContentList.length / postPerPage) < currentPage) {
      setcurrentPage(1);
    }
  }

  useEffect(() => {
    setCourseContentList(courseContentListFromStore.length ? courseContentListFromStore : []);
  }, [courseContentListFromStore]);

  const handleInputValueChange = (e) => {
    setCourseContentCategoryInputFieldValue((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    });
  };
  const handleInputValueSubmit = async (e) => {
    e.preventDefault();
    console.log(courseContentInputFieldValue);
    const response = await apiService.postData(courseContentURL, JSON.stringify(categoryInputFieldValue));
    if (response.status == 201) {
      toast.success('Successfully added!');
      dispatch(fetchCourseContent(courseContentURL));
      setCategoryInputFieldValue(initialInputValue);
    } else {
      toast.error('Something went wrong!');
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
    const response = await apiService.deleteData(`${courseContentURL}${id}/`);
    if (response.status == 204) {
      setIsDeleteModalOpen(false);
      toast.success('Deleted successfully');
      dispatch(fetchCourseContent(courseContentURL));
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
    setUpdatedCourseContentField((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    })
  };

  const handleConfirmEdit = async () => {
    const id = selectedEditItem.id;
    const response = await apiService.updateData(`${courseContentURL}${id}/`, JSON.stringify(updatedCourseContentField));
    if (response.status == 200) {
      setIsEditModalShow(false);
      toast.success('Successfully Updated');
      dispatch(fetchCourseContent(courseContentURL)); //dispatch action to update state
    } else {
      toast.error('Something went wrong.');
      setIsEditModalShow(false);
    }
  };

  return (
    <MainCard title="Course Content Input">
      {/* input form start */}
      <form onSubmit={handleInputValueSubmit} style={{ marginBottom: '20px' }}>
        <Box>
          {/* Two half-width input boxes */}
          <Grid container spacing={2} mb={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="subcategory">Select Course</InputLabel>
                <Select
                  required
                  labelId="course"
                  id="course"
                  value={courseContentInputFieldValue.course}
                  label="Select Course"
                  name="course"
                  onChange={handleInputValueChange}
                >
                  <MenuItem>Select</MenuItem>
                  {courseListFromStore.map((course) => (
                    <MenuItem key={course.id} value={course.id}>
                      {course.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Content Title"
                id="title"
                name="title"
                value={courseContentInputFieldValue.title}
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
                label="Class Number"
                id="class_number"
                name="class_number"
                value={courseContentInputFieldValue.class_number}
                onChange={handleInputValueChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Content Video Link"
                id="content_video_link"
                name="content_video_link"
                value={courseContentInputFieldValue.content_video_link}
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

      <SubCard title="Course Content List">
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
                  <TableCell>Title</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentCourseContentList &&
                  currentCourseContentList.map((row, index) => (
                    <TableRow key={row.id}>
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
            totalPost={courseContentList.length}
          />
          {/* pagination section end */}
        </div>
        {/* table section end */}
      </SubCard>
      {/* Delete Modal */}
      <DeleteModal isOpen={isDeleteModalOpen} onClose={handleDeleteModalClose} handleDelete={handleDeleteConfirm} />

      {/* Edit Modal */}
      <CourseContentEditModal isOpen={isEditModalshow} onClose={handleEditModalClose} selectedEditItem={selectedEditItem} handleEditChange={handleEditValueChange} handleSubmit={handleConfirmEdit} />
    </MainCard>
  );
};

export default CourseContent;
