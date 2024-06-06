import MainCard from 'ui-component/cards/MainCard';
import HorizontalLinearStepper from './step-form/StepForm';
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
import CourseDetailsEditModal from 'components/modal/edit-modal/course/CourseDetailsEditModal';
import { fetchCourseDetails } from 'store/course/courseDetailsReducer';
import ShowErrorInCourseDetails from 'components/error/ShowErrorInCourseDetails';
import { errorObjectValueToArray } from 'utils/utils';

const initialCourseDetailsValue = {
  title: '',
  banner_image_or_video: '',
  overview: '',
  course_details: '',
  // syllabus: '',
  // free_video: '',
  actual_price: '',
  discount_price: '',
  discount_percentage: '',
  free_or_paid: '',
  what_you_will_learn: '',
  company_work_with_technology: '',
  course_evaluation: '',
  course_slug: '',
  tag: '',
  meta_tag: '',
  live_or_prerecorded: '',
  subcategory: '',
  teacher: ''
};

const courseURL = 'https://website.innovativeskillsbd.com/course/courses/';

const CourseDetails = () => {
  const dispatch = useDispatch();
  const courseDetailsFromState = useSelector((state) => state.course);
  const [errorMessageArray, setErrorMessageArray] = useState([]);
  const [courseDetailsInput, setCourseDetailsInput] = useState(initialCourseDetailsValue);
  const [courseDetailsList, setCourseDetailsList] = useState(courseDetailsFromState);
  const [filteredCourseDetailsList, setFilteredCourseDetailsList] = useState(courseDetailsList);
  const [updatedField, setUpdatedField] = useState({});
  const [searchInput, setSearchInput] = useState('');
  const [postPerPage, setPostPerPage] = useState(5);
  const [currentPage, setcurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalshow, setIsEditModalShow] = useState(false);
  const [selectedEditItem, setSelectedEditItem] = useState('');
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentCourseDetailsList = filteredCourseDetailsList ? filteredCourseDetailsList.slice(firstPostIndex, lastPostIndex) : [];

  //this is keeping in parent so that after submitting wen can reset form
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const result = courseDetailsList.filter((item) => {
      return searchInput.toLowerCase() === '' ? item : item.title.toLowerCase().includes(searchInput);
    });

    if (result.length) {
      setFilteredCourseDetailsList(result);
    } else if (!searchInput.length) {
      setFilteredCourseDetailsList(courseDetailsList);
    } else {
      setFilteredCourseDetailsList([]);
    }
  }, [searchInput, courseDetailsList]);

  if (filteredCourseDetailsList.length) {
    if (Math.ceil(filteredCourseDetailsList.length / postPerPage) < currentPage) {
      setcurrentPage(1);
    }
  }
  useEffect(() => {
    setCourseDetailsList(courseDetailsFromState);
  }, [courseDetailsFromState]);

  const handleCourseInputChange = (e) => {
    setCourseDetailsInput((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    });
  };

  const handleSubmit = async () => {
    const response = await apiService.postData(courseURL, JSON.stringify(courseDetailsInput));

    if (response.status == 201) {
      toast.success('Added successfully');
      setCourseDetailsInput(initialCourseDetailsValue);
      setActiveStep(0);
      dispatch(fetchCourseDetails(courseURL));
    } else if (response.response.status === 400) {
      if (response.response.data) {
        const errorArray = errorObjectValueToArray(response.response.data);
        setErrorMessageArray(errorArray);
      }
    } else {
      toast.error('Something went wrong');
    }
    console.log(JSON.stringify(courseDetailsInput));
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
    const response = await apiService.deleteData(`${courseURL}${id}/`);
    if (response.status == 204) {
      toast.success('Deleted successfully');
      setIsDeleteModalOpen(false);
      dispatch(fetchCourseDetails(courseURL));
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

  const handleEditSubmit = async () => {
    const id = selectedEditItem.id;
    const response = await apiService.updateData(`${courseURL}${id}/`, JSON.stringify(updatedField));
    if (response.status == 200) {
      toast.success('Updated successfully');
      setUpdatedField('');
      setSelectedEditItem('');
      //action dispatch to update state
      dispatch(fetchCourseDetails(courseURL));
    } else {
      toast.error('Something went wrong');
    }
  };

  return (
    <MainCard title="Course Details Input">
      <Box mb={3}>
        <HorizontalLinearStepper
          handleChange={handleCourseInputChange}
          fieldValue={courseDetailsInput}
          handleSubmit={handleSubmit}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      </Box>
      {errorMessageArray.length > 0 && <ShowErrorInCourseDetails messages={errorMessageArray} />}

      <SubCard title="Course Details List">
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
                {currentCourseDetailsList &&
                  currentCourseDetailsList.map((row, index) => (
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
            totalPost={courseDetailsList.length}
          />
          {/* pagination section end */}
        </div>
        {/* table section end */}
      </SubCard>
      {/* Delete Modal */}
      <DeleteModal isOpen={isDeleteModalOpen} onClose={handleDeleteModalClose} handleDelete={handleDeleteConfirm} />

      {/* Edit Modal */}
      <CourseDetailsEditModal
        isOpen={isEditModalshow}
        onClose={handleEditModalClose}
        selectedEditItem={selectedEditItem}
        setSelectedEditItem={setSelectedEditItem}
        handleSubmit={handleEditSubmit}
        setUpdate={setUpdatedField}
      />
    </MainCard>
  );
};

export default CourseDetails;
