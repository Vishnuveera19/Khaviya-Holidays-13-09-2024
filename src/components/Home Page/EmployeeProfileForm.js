import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Container, Typography, Select, MenuItem, FormControl, InputLabel, IconButton, Paper } from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { PAYMBRANCHES, PAYMCOMPANIES, PAYMEMPLOYEE, PAYMDIVISION, PAYMDEPARTMENT, PAYMDESIGNATION, PAYMGRADE, PAYMSHIFT, PAYMCATEGORY, PAYMJOBSTATUS, PAYMLEVEL, SAVE } from '../../serverconfiguration/controllers';

const EmployeeProfileForm = () => {
  const [formData, setFormData] = useState({
    pn_CompanyID: '',
    pn_BranchID: '',
    pn_EmployeeID: '',
    pn_DivisionId: '',
    pn_DepartmentId: '',
    pn_DesingnationId: '',
    pn_GradeId: '',
    pn_ShiftId: '',
    pn_CategoryId: '',
    pn_JobStatusId: '',
    pn_LevelID: '',
    pn_projectsiteID: '',
    d_Date: '',
    v_Reason: '',
    r_Department: '',
    father_name: '',
    Emp_Profile_Image: ''
  });

  const [companies, setCompanies] = useState([]);
  const [branches, setBranches] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [grades, setGrades] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [jobStatuses, setJobStatuses] = useState([]);
  const [levels, setLevels] = useState([]);


  useEffect(() => {
    async function fetchData() {
      try {
        const companyData = await getRequest(ServerConfig.url, PAYMCOMPANIES);
        setCompanies(companyData.data);

        const branchData = await getRequest(ServerConfig.url, PAYMBRANCHES);
        setBranches(branchData.data);


        const employeeData = await getRequest(ServerConfig.url, PAYMEMPLOYEE);
        setEmployees(employeeData.data);

        const divisionData = await getRequest(ServerConfig.url, PAYMDIVISION);
        setDivisions(divisionData.data);

        const departmentData = await getRequest(ServerConfig.url, PAYMDEPARTMENT);
        setDepartments(departmentData.data);

        const designationData = await getRequest(ServerConfig.url, PAYMDESIGNATION);
        setDesignations(designationData.data);

        const gradeData = await getRequest(ServerConfig.url, PAYMGRADE);
        setGrades(gradeData.data);

        const shiftData = await getRequest(ServerConfig.url, PAYMSHIFT);
        setShifts(shiftData.data);

        const categoryData = await getRequest(ServerConfig.url, PAYMCATEGORY);
        setCategories(categoryData.data);

        const jobstatusData = await getRequest(ServerConfig.url, PAYMJOBSTATUS);
        setJobStatuses(jobstatusData.data);

        const levelData = await getRequest(ServerConfig.url, PAYMLEVEL);
        setLevels(levelData.data);

      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
    
    fetchData();
  }, []);



  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData(prevData => ({
        ...prevData,
        Emp_Profile_Image: imageUrl
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await postRequest(ServerConfig.url, SAVE, {
        query: `INSERT INTO [dbo].[paym_employee_profile1]
                   ([pn_CompanyID]
                   ,[pn_BranchID]
                   ,[pn_EmployeeID]
                   ,[pn_DivisionId]
                   ,[pn_DepartmentId]
                   ,[pn_DesingnationId]
                   ,[pn_GradeId]
                   ,[pn_ShiftId]
                   ,[pn_CategoryId]
                   ,[pn_JobStatusId]
                   ,[pn_LevelID]
                   ,[pn_projectsiteID]
                   ,[d_Date]
                   ,[v_Reason]
                   ,[r_Department]
                   ,[father_name]
                   ,[Emp_Profile_Image])
                VALUES
                   ('${formData.pn_CompanyID}'
                   ,'${formData.pn_BranchID}'
                   ,'${formData.pn_EmployeeID}'
                   ,'${formData.pn_DivisionId}'
                   ,'${formData.pn_DepartmentId}'
                   ,'${formData.pn_DesingnationId}'
                   ,'${formData.pn_GradeId}'
                   ,'${formData.pn_ShiftId}'
                   ,'${formData.pn_CategoryId}'
                   ,'${formData.pn_JobStatusId}'
                   ,'${formData.pn_LevelID}'
                   ,'${formData.pn_projectsiteID}'
                   ,'${formData.d_Date}'
                   ,'${formData.v_Reason}'
                   ,'${formData.r_Department}'
                   ,'${formData.father_name}'
                   ,'${formData.Emp_Profile_Image}')`
      });

      if (response.status === 200) {
        alert('Data saved successfully');
        handleReset();
      } else {
        alert('Failed to save data');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Failed to save data');
    }
  };

  const handleReset = () => {
    setFormData({
      pn_CompanyID: '',
      pn_BranchID: '',
      pn_EmployeeID: '',
      pn_DivisionId: '',
      pn_DepartmentId: '',
      pn_DesingnationId: '',
      pn_GradeId: '',
      pn_ShiftId: '',
      pn_CategoryId: '',
      pn_JobStatusId: '',
      pn_LevelID: '',
      pn_projectsiteID: '',
      d_Date: '',
      v_Reason: '',
      r_Department: '',
      father_name: '',
      Emp_Profile_Image: ''
    });
  };

  return (
    <Paper
      elevation={3}
      style={{
        padding: 20,
        margin: "100px",
        maxWidth: "auto",
        height: "auto",
        marginTop: "20px",
        marginBottom: "20px",
      }}
    >
    <Container>
      <Typography variant="h4" gutterBottom mt={1} mb={4}>
        Employee Profile Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          {/* Company ID */}
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth required>
              <InputLabel id="company-select-label">Company ID</InputLabel>
              <Select
                labelId="company-select-label"
                name="pn_CompanyID"
                value={formData.pn_CompanyID}
                onChange={handleChange}
                label="Company ID"
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                {companies.map(company => (
                  <MenuItem key={company.pnCompanyId} value={company.pnCompanyId}>
                    {company.companyName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* Branch ID */}
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth required>
              <InputLabel id="branch-select-label">Branch ID</InputLabel>
              <Select
                labelId="branch-select-label"
                name="pn_BranchID"
                value={formData.pn_BranchID}
                onChange={handleChange}
                label="Branch ID"
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>

                {branches.map(branch => (
                    <MenuItem key={branch.pnBranchId} value={branch.pnBranchId}>
                      {branch.pnBranchId}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          {/* Employee ID */}
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth required>
              <InputLabel id="employee-select-label">Employee ID</InputLabel>
              <Select
                labelId="employee-select-label"
                name="pn_EmployeeID"
                value={formData.pn_EmployeeID}
                onChange={handleChange}
                label="Employee ID"
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                {employees.map(employee => (
                  <MenuItem key={employee.pnEmployeeId} value={employee.pnEmployeeId}>
                    {employee.pnEmployeeId}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* Division ID */}
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth required>
              <InputLabel id="division-select-label">Division ID</InputLabel>
              <Select
                labelId="division-select-label"
                name="pn_DivisionId"
                value={formData.pn_DivisionId}
                onChange={handleChange}
                label="Division ID"
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                {divisions.map(division => (
                  <MenuItem key={division.pnDivisionId} value={division.pnDivisionId}>
                    {division.pnDivisionId}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* Department ID */}
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth required>
              <InputLabel id="department-select-label">Department ID</InputLabel>
              <Select
                labelId="department-select-label"
                name="pn_DepartmentId"
                value={formData.pn_DepartmentId}
                onChange={handleChange}
                label="Department ID"
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                {departments.map(department => (
                  <MenuItem key={department.pnDepartmentId} value={department.pnDepartmentId}>
                    {department.pnDepartmentId}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>


          {/* Designation ID */}
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth required>
              <InputLabel id="designation-select-label">Designation ID</InputLabel>
              <Select
                labelId="designation-select-label"
                name="pn_DesingnationId"
                value={formData.pn_DesingnationId}
                onChange={handleChange}
                label="Designation ID"
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                {designations.map(designation => (
                  <MenuItem key={designation.pnDesignationId} value={designation.pnDesignationId}>
                    {designation.pnDesignationId}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          


          {/* Grade ID */}
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth required>
              <InputLabel id="grade-select-label">Grade ID</InputLabel>
              <Select
                labelId="grade-select-label"
                name="pn_GradeId"
                value={formData.pn_GradeId}
                onChange={handleChange}
                label="Grade ID"
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                {grades.map(grade => (
                  <MenuItem key={grade.pnGradeId} value={grade.pnGradeId}>
                    {grade.pnGradeId}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* Shift ID */}
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth required>
              <InputLabel id="shift-select-label">Shift ID</InputLabel>
              <Select
                labelId="shift-select-label"
                name="pn_ShiftId"
                value={formData.pn_ShiftId}
                onChange={handleChange}
                label="Shift ID"
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                {shifts.map(shift => (
                  <MenuItem key={shift.pnShiftId} value={shift.pnShiftId}>
                    {shift.pnShiftId}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* Category ID */}
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth required>
              <InputLabel id="category-select-label">Category ID</InputLabel>
              <Select
                labelId="category-select-label"
                name="pn_CategoryId"
                value={formData.pn_CategoryId}
                onChange={handleChange}
                label="Category ID"
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                {categories.map(category => (
                  <MenuItem key={category.pnCategoryId} value={category.pnCategoryId}>
                    {category.pnCategoryId}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* Job Status ID */}
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth required>
              <InputLabel id="jobstatus-select-label">Job Status ID</InputLabel>
              <Select
                labelId="jobstatus-select-label"
                name="pn_JobStatusId"
                value={formData.pn_JobStatusId}
                onChange={handleChange}
                label="Job Status ID"
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                {jobStatuses.map(jobStatus => (
                  <MenuItem key={jobStatus.pnJobStatusId} value={jobStatus.pnJobStatusId}>
                    {jobStatus.pnJobStatusId}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* Level ID */}
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth required>
              <InputLabel id="level-select-label">Level ID</InputLabel>
              <Select
                labelId="level-select-label"
                name="pn_LevelID"
                value={formData.pn_LevelID}
                onChange={handleChange}
                label="Level ID"
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                {levels.map(level => (
                  <MenuItem key={level.pnLevelId} value={level.pnLevelId}>
                    {level.pnLevelId}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* Project Site */}
          <Grid item xs={12} sm={4}>
            <TextField
              name="pn_projectsiteID"
              label="Project Site ID"
              value={formData.pn_projectsiteID}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          {/* Date */}
          <Grid item xs={12} sm={4}>
            <TextField
              name="d_Date"
              label="Date"
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              value={formData.d_Date}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          {/* Reason */}
          <Grid item xs={12} sm={5}>
            <TextField
              name="v_Reason"
              label="Reason"
              value={formData.v_Reason}
              onChange={handleChange}
              fullWidth
              InputProps={{
                style: { height: '100px' } 
              }}
            />
          </Grid>
          {/* Department */}
          <Grid item xs={12} sm={4}>
            <TextField
              name="r_Department"
              label="Department"
              value={formData.r_Department}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          {/* Father's Name */}
          <Grid item xs={12} sm={4}>
            <TextField
              name="father_name"
              label="Father's Name"
              value={formData.father_name}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          {/* Profile Image Upload */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
            Upload Profile Image
            </Typography>
            <input
              type="file"
              accept="image/*"
              id="profile-image-upload"
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />
            <label htmlFor="profile-image-upload">
              <IconButton color="primary" component="span">
                <CloudUploadIcon style={{ fontSize: 50 }}/>
              </IconButton>
            </label>
            {formData.Emp_Profile_Image && (
              <img
                src={formData.Emp_Profile_Image}
                alt="Profile"
                style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '10px' }}
              />
            )}
          </Grid>
          {/* Submit and Reset Buttons */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            <Button type="button" variant="contained" color="secondary" onClick={handleReset} style={{ marginLeft: '100px' }}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
    </Paper>
  );
};

export default EmployeeProfileForm;
