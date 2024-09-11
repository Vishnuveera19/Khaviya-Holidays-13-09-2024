import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Input,
  Box,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { getRequest, postRequest } from "../../serverconfiguration/requestcomp";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import {
  PAYMCOMPANIES,
  PAYMBRANCHES,
  PAYMEMPLOYEE,
  SAVE,
} from "../../serverconfiguration/controllers";

const ReimbursementApprovalForm = () => {
  const [formData, setFormData] = useState({
    pn_CompanyID: "",
    pn_BranchID: "",
    pn_EmployeeID: "",
    Employee_Name: "",
    Expenses: "",
    Expense_Date: "",
    Claim_Amount: "",
    Receipts: null,
    Approve_By: "",
    Approval_Date: "",
    Approved_Amount: "",
    Approval_status: "",
  });

  const [companies, setCompanies] = useState([]);
  const [branches, setBranches] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const companyData = await getRequest(ServerConfig.url, PAYMCOMPANIES);
        setCompanies(companyData.data);

        const branchData = await getRequest(ServerConfig.url, PAYMBRANCHES);
        setBranches(branchData.data);

        const employeeData = await getRequest(ServerConfig.url, PAYMEMPLOYEE);
        setEmployees(employeeData.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      Receipts: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

    const formDataToSubmit = new FormData();
    for (let key in formData) {
      formDataToSubmit.append(key, formData[key]);
    }
    formDataToSubmit.append("Approval_Date", currentDate);

    try {
      const response = await postRequest(ServerConfig.url, SAVE, {
        query: `
                    INSERT INTO [dbo].[Reimbursement]
                        ([pn_CompanyID], [pn_BranchID], [pn_EmployeeID], [Employee_Name], [Expenses],
                         [Expense_Date], [Claim_Amount], [Submission_Date], [Receipts], [Approve_By],
                         [Approval_Date], [Approved_Amount], [Approval_status])
                    VALUES
                        (${formData.pn_CompanyID}, ${formData.pn_BranchID}, ${formData.pn_EmployeeID},
                         '${formData.Employee_Name}', '${formData.Expenses}', '${formData.Expense_Date}',
                         ${formData.Claim_Amount}, '${formData.Submission_Date}', 
                         '${formData.Receipts ? formData.Receipts.name : ""}', '${formData.Approve_By}',
                         '${currentDate}', ${formData.Approved_Amount}, '${formData.Approval_status}')
                `,
      });

      if (response.status === 200) {
        alert("Data saved successfully");
      } else {
        alert("Failed to save data");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data");
    }
  };

  const handleReset = () => {
    setFormData({
      pn_CompanyID: "",
      pn_BranchID: "",
      pn_EmployeeID: "",
      Employee_Name: "",
      Expenses: "",
      Expense_Date: "",
      Claim_Amount: "",
      Receipts: null,
      Approve_By: "",
      Approval_Date: "",
      Approved_Amount: "",
      Approval_status: "",
    });
  };

  return (
    <Paper
      elevation={3}
      style={{
        padding: 20,
        margin: "auto",
        maxWidth: 800,
        height: "auto",
        marginTop: "20px",
        marginBottom: "20px",
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ marginTop: "10px" }}>
        Reimbursement Approval Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} mt={2}>
          {/* Company Name Field */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Company Name</InputLabel>
              <Select
                name="pn_CompanyID"
                value={formData.pn_CompanyID}
                onChange={handleChange}
              >
                {companies.map((company) => (
                  <MenuItem
                    key={company.pnCompanyId}
                    value={company.pnCompanyId}
                  >
                    {company.companyName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* Branch Name Field */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Branch Name</InputLabel>
              <Select
                name="pn_BranchID"
                value={formData.pn_BranchID}
                onChange={handleChange}
              >
                {branches.map((branch) => (
                  <MenuItem key={branch.pnBranchId} value={branch.pnBranchId}>
                    {branch.branchName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* Employee ID Field */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Employee ID</InputLabel>
              <Select
                name="pn_EmployeeID"
                value={formData.pn_EmployeeID}
                onChange={handleChange}
              >
                {employees.map((employee) => (
                  <MenuItem
                    key={employee.pnEmployeeId}
                    value={employee.pnEmployeeId}
                  >
                    {employee.pnEmployeeId}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Employee Name Field */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Employee Name</InputLabel>
              <Select
                name="Employee_Name"
                value={formData.Employee_Name}
                onChange={handleChange}
              >
                {employees.map((employee) => (
                  <MenuItem
                    key={employee.employeeFullName}
                    value={employee.employeeFullName}
                  >
                    {employee.employeeFullName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Expenses Field */}
          <Grid item xs={12} sm={6}>
            <TextField
              name="Expenses"
              label="Expense Name"
              fullWidth
              value={formData.Expenses}
              onChange={handleChange}
              required
            />
          </Grid>
          {/* Expense Date Field */}
          <Grid item xs={12} sm={6}>
            <TextField
              name="Expense_Date"
              label="Expense Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={formData.Expense_Date}
              onChange={handleChange}
              required
            />
          </Grid>
          {/* Claim Amount */}
          <Grid item xs={12} sm={6}>
            <TextField
              name="Claim_Amount"
              label="Claim Amount"
              type="number"
              fullWidth
              value={formData.Claim_Amount}
              onChange={handleChange}
              required
            />
          </Grid>
          {/* Receipts */}
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              component="label"
              startIcon={<CloudUploadIcon />}
            >
              Upload Receipts
              <Input
                type="file"
                name="Receipts"
                onChange={handleFileChange}
                hidden
              />
            </Button>
          </Grid>
          {/* Approve By */}
          <Grid item xs={12} sm={6}>
            <TextField
              name="Approve_By"
              label="Approved By"
              fullWidth
              value={formData.Approve_By}
              onChange={handleChange}
              required
            />
          </Grid>
          {/* Approval Date */}
          <Grid item xs={12} sm={6}>
            <TextField
              name="Approval_Date"
              label="Approval Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={formData.Approval_Date}
              onChange={handleChange}
              required
            />
          </Grid>
          {/* Approved Amount */}
          <Grid item xs={12} sm={6}>
            <TextField
              name="Approved_Amount"
              label="Approved Amount"
              type="number"
              fullWidth
              value={formData.Approved_Amount}
              onChange={handleChange}
              required
            />
          </Grid>
          {/* Approval Status */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Approval Status</InputLabel>
              <Select
                name="Approval_status"
                value={formData.Approval_status}
                onChange={handleChange}
              >
                <MenuItem value="Approved">Approved</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Box mt={3}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleReset}
            style={{ marginLeft: "10px" }}
          >
            Reset
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default ReimbursementApprovalForm;
