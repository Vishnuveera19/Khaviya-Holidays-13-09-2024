import {
  Grid,
  Card,
  TextField,
  Button,
  Typography,
  Box,
  CardContent,
  FormControl,
  InputLabel,
  IconButton,
  FormHelperText,
} from "@mui/material";
import { useState, useEffect } from "react";
import {
  PAYMBRANCHES,
  PAYMCOMPANIES,
  PAYMEMPLOYEE,
  PAYMDIVISION,
  PAYMDEPARTMENT,
  PAYMDESIGNATION,
  PAYMGRADE,
  PAYMSHIFT,
  PAYMCATEGORY,
  JOBSTATUS,
  PAYMLEVEL,
  SAVE,
} from "../../serverconfiguration/controllers";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { getRequest, postRequest } from "../../serverconfiguration/requestcomp";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import { useNavigate } from "react-router-dom";

export default function Employeeprofile0909090() {
  const navigate = useNavigate();
  const [company, setCompany] = useState([]);
  const [branch, setBranch] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [division, setDivision] = useState([]);
  const [department, setDepartment] = useState([]);
  const [designation, setDesignation] = useState([]);
  const [grade, setGrade] = useState([]);
  const [shift, setShift] = useState([]);
  const [category, setCategory] = useState([]);
  const [jobstatus, setJobStatus] = useState([]);
  const [level, setLevel] = useState([]);
  const [pnCompanyId, setPnCompanyId] = useState("");
  const [pnBranchId, setPnBranchId] = useState("");
  const [pnEmployeeId, setPnEmployeeId] = useState("");
  const [pnDivisionId, setPnDivisionId] = useState("");
  const [pnDepartmentId, setPnDepartmentId] = useState("");
  const [pnDesignationId, setPnDesignationId] = useState("");
  const [pnGradeId, setPnGradeId] = useState("");
  const [pnShiftId, setPnShiftId] = useState("");
  const [pnCategoryId, setPnCategoryId] = useState("");
  const [pnJobStatusId, setPnJobStatusId] = useState("");
  const [pnLevelId, setPnLevelId] = useState("");
  const [pnProjectsiteId, setPnProjectsiteId] = useState("");
  const [dDate, setDDate] = useState("");
  const [vReason, setVReason] = useState("");
  const [rDepartment, setRDepartment] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [empProfileImage, setEmpProfileImage] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        const [companies, branches, employees, divisions, departments, designations, grades, shifts, categories, jobStatuses, levels] = await Promise.all([
          getRequest(ServerConfig.url, PAYMCOMPANIES),
          getRequest(ServerConfig.url, PAYMBRANCHES),
          getRequest(ServerConfig.url, PAYMEMPLOYEE),
          getRequest(ServerConfig.url, PAYMDIVISION),
          getRequest(ServerConfig.url, PAYMDEPARTMENT),
          getRequest(ServerConfig.url, PAYMDESIGNATION),
          getRequest(ServerConfig.url, PAYMGRADE),
          getRequest(ServerConfig.url, PAYMSHIFT),
          getRequest(ServerConfig.url, PAYMCATEGORY),
          getRequest(ServerConfig.url, JOBSTATUS),
          getRequest(ServerConfig.url, PAYMLEVEL),
        ]);

        setCompany(companies.data);
        setBranch(branches.data);
        setEmployee(employees.data);
        setDivision(divisions.data);
        setDepartment(departments.data);
        setDesignation(designations.data);
        setGrade(grades.data);
        setShift(shifts.data);
        setCategory(categories.data);
        setJobStatus(jobStatuses.data);
        setLevel(levels.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate required fields
    if (!pnCompanyId || !pnCategoryId || !vReason || !dDate || !rDepartment || !fatherName) {
      alert("Please fill out all required fields.");
      return;
    }
  
    // Prepare the form data
    const formData = {
      pnCompanyId,
      pnBranchId,
      pnEmployeeId,
      pnDivisionId,
      pnDepartmentId,
      pnDesignationId,
      pnGradeId,
      pnShiftId,
      pnCategoryId,
      pnJobStatusId,
      pnLevelId,
      pnProjectsiteId,
      dDate,
      vReason,
      rDepartment,
      fatherName,
      empProfileImage
    };
  
    try {
      const response = await postRequest(ServerConfig.url, SAVE, {
        query: `
          INSERT INTO [dbo].[paym_employee_profile1]
            ([pn_CompanyID], [pn_BranchID], [pn_EmployeeID], [pn_DivisionId], [pn_DepartmentId], [pn_DesingnationId], [pn_GradeId], [pn_ShiftId], [pn_CategoryId], [pn_JobStatusId], [pn_LevelID], [pn_projectsiteID], [d_Date], [v_Reason], [r_Department], [father_name], [Emp_Profile_Image])
          VALUES
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        params: [
          formData.pnCompanyId,
          formData.pnBranchId,
          formData.pnEmployeeId,
          formData.pnDivisionId,
          formData.pnDepartmentId,
          formData.pnDesignationId,
          formData.pnGradeId,
          formData.pnShiftId,
          formData.pnCategoryId,
          formData.pnJobStatusId,
          formData.pnLevelId,
          formData.pnProjectsiteId,
          formData.dDate,
          formData.vReason,
          formData.rDepartment,
          formData.fatherName,
          formData.empProfileImage
        ]
      });
  
      if (response.status === 200) {
        alert('Form submitted successfully!');
        navigate('/success-page'); // Replace with the appropriate navigation
      } else {
        alert('Submission failed. Please try again.');
      }
    } catch (error) {
      console.error("Error submitting form", error.response?.data || error.message);
      alert("Submission failed. Check console for details.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEmpProfileImage(reader.result);
      };
      reader.readAsDataURL(file); // Converts to Base64
    }
  };

  return (
    <div>
      <Grid style={{ padding: "80px 5px 0 5px" }}>
        <Card style={{ maxWidth: 600, margin: "0 auto" }}>
          <CardContent>
            <Typography variant="h5" color="textSecondary" align="center">
              Paym Employee Profile
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} inputlabelprops={{ shrink: true }}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Company</InputLabel>
                    <select
                      name="pnCompanyId"
                      value={pnCompanyId}
                      onChange={(e) => setPnCompanyId(e.target.value)}
                      style={{ height: "50px" }}
                    >
                      <option value="">Select</option>
                      {company.map((e) => (
                        <option key={e.pnCompanyId} value={e.pnCompanyId}>
                          {e.companyName}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Branch</InputLabel>
                    <select
                      name="pnBranchId"
                      value={pnBranchId}
                      onChange={(e) => setPnBranchId(e.target.value)}
                      style={{ height: "50px" }}
                    >
                      <option value="">Select</option>
                      {branch
                        .filter((e) => e.pnCompanyId == pnCompanyId)
                        .map((e) => (
                          <option key={e.pnBranchId} value={e.pnBranchId}>
                            {e.branchName}
                          </option>
                        ))}
                    </select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Box
                      sx={{
                        position: 'relative',
                        display: 'inline-block',
                        width: '200px',
                        height: '200px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        backgroundColor: '#f0f0f0',
                        border: '1px solid #ccc',
                      }}
                    >
                      <img
                        src={empProfileImage || 'default-avatar.png'}
                        alt="Profile"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                      <label htmlFor="upload-image">
                        <IconButton
                          component="span"
                          style={{
                            position: 'absolute',
                            bottom: '5px',
                            right: '5px',
                            backgroundColor: '#fff',
                          }}
                        >
                          <AddAPhotoIcon />
                        </IconButton>
                      </label>
                      <input
                        type="file"
                        id="upload-image"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                      />
                    </Box>
                  </FormControl>
                </Grid>

                {/* Add other form fields similarly */}

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}
