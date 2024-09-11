import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Paper, MenuItem, Typography } from '@mui/material';
import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { PAYMCOMPANIES, PAYMBRANCHES, PAYMEMPLOYEE, PAYMLEAVE, SAVE } from '../../serverconfiguration/controllers';

const LeaveBalanceForm = () => {
  const [formData, setFormData] = useState({
    pn_CompanyId: '',
    pn_BranchId: '',
    pn_EmployeeId: '',
    Pn_LeaveId: '',
    Allow_Days: '',
    Taken_Days: '',
    Max_Days: '',
    Bal_Days: '',
    Basic_PerDay: '',
    Total_Amt: '',
    Date: '',
    YearEnd: '',
  });

  const [companies, setCompanies] = useState([]);
  const [branches, setBranches] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const companyData = await getRequest(ServerConfig.url, PAYMCOMPANIES);
        setCompanies(companyData.data);

        const branchData = await getRequest(ServerConfig.url, PAYMBRANCHES);
        setBranches(branchData.data);

        const employeeData = await getRequest(ServerConfig.url, PAYMEMPLOYEE);
        setEmployees(employeeData.data);

        const leaveData = await getRequest(ServerConfig.url, PAYMLEAVE);
        setLeaves(leaveData.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    }

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await postRequest(ServerConfig.url, SAVE, {
        query: `
          INSERT INTO [dbo].[paym_EncashmentDetails]
            ([pn_CompanyId], [pn_BranchId], [pn_EmployeeId], [Pn_LeaveId],
             [Allow_Days], [Taken_Days], [Max_Days], [Bal_Days],
             [Basic_PerDay], [Total_Amt], [Date], [YearEnd])
          VALUES
            (${formData.pn_CompanyId}, ${formData.pn_BranchId}, ${formData.pn_EmployeeId},
             ${formData.Pn_LeaveId}, ${formData.Allow_Days}, ${formData.Taken_Days},
             ${formData.Max_Days}, ${formData.Bal_Days}, ${formData.Basic_PerDay},
             ${formData.Total_Amt}, '${formData.Date}', '${formData.YearEnd}')
        `
      });

      if (response.status === 200) {
        alert('Data saved successfully');
        // Additional logic if needed
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
      pn_CompanyId: '',
      pn_BranchId: '',
      pn_EmployeeId: '',
      Pn_LeaveId: '',
      Allow_Days: '',
      Taken_Days: '',
      Max_Days: '',
      Bal_Days: '',
      Basic_PerDay: '',
      Total_Amt: '',
      Date: '',
      YearEnd: '',
    });
  };

  return (
    <Paper elevation={3} style={{ padding: 20, margin: 'auto', maxWidth: 800, height: '600px', marginTop: '20px', marginBottom: '20px' }}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" gutterBottom sx={{ marginTop: '10px' }}>Leave Balance Form</Typography>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Company"
              name="pn_CompanyId"
              value={formData.pn_CompanyId}
              onChange={handleChange}
              required
            >
              {companies.map(company => (
                <MenuItem key={company.pnCompanyId} value={company.pnCompanyId}>
                  {company.companyName}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Branch"
              name="pn_BranchId"
              value={formData.pn_BranchId}
              onChange={handleChange}
              required
            >
              {branches.map(branch => (
                  <MenuItem key={branch.pnBranchId} value={branch.pnBranchId}>
                    {branch.branchName}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Employee"
              name="pn_EmployeeId"
              value={formData.pn_EmployeeId}
              onChange={handleChange}
              required
            >
              {employees.map(employee => (
                  <MenuItem key={employee.pnEmployeeId} value={employee.pnEmployeeId}>
                    {employee.employeeFullName}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Leave"
              name="Pn_LeaveId"
              value={formData.Pn_LeaveId}
              onChange={handleChange}
              required
            >
              {leaves.map(leave => (
                  <MenuItem key={leave.pnLeaveId} value={leave.pnLeaveId}>
                    {leave.vLeaveName}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>


          {/* The remaining fields follow the same pattern as shown in the original code */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Allow Days"
              name="Allow_Days"
              type="number"
              value={formData.Allow_Days}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Taken Days"
              name="Taken_Days"
              type="number"
              value={formData.Taken_Days}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Max Days"
              name="Max_Days"
              type="number"
              value={formData.Max_Days}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Balance Days"
              name="Bal_Days"
              type="number"
              value={formData.Bal_Days}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Basic Per Day"
              name="Basic_PerDay"
              type="number"
              value={formData.Basic_PerDay}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Total Amount"
              name="Total_Amt"
              type="number"
              value={formData.Total_Amt}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Date"
              name="Date"
              type="date"
              value={formData.Date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Year End"
              name="YearEnd"
              value={formData.YearEnd}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} mt={3}>

            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>

            <Button onClick={handleReset} variant="contained" color="secondary" style={{  marginLeft: '50px'  }}>
              Reset
            </Button>

    
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default LeaveBalanceForm;
