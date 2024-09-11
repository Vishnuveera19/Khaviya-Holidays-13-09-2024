import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Container, Typography, Select, MenuItem, FormControl, InputLabel, Paper } from '@mui/material';
import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { PAYMBRANCHES, PAYMCOMPANIES, PAYMEMPLOYEE, PAYMLOAN, LOANPOST, SAVE } from '../../serverconfiguration/controllers';

const LoanEntryForm = () => {
  const [formData, setFormData] = useState({
    pn_CompanyID: '',
    pn_BranchID: '',
    pn_EmployeeID: '',
    Loan_AutoID: '',
    fn_LoanID: '',
    san_date: '',
    d_effdate: '',
    Loan_Amt: '',
    InstalmentAmt: '',
    Instalmentcount: '',
    Balance_Amt: '',
    c_status: '',
    loan_name: '',
    loan_process: '',
    loan_calculation: '',
    comments: '',
    loan_appid: '',
    interest: '',
    tot_interest_amt: '',
    emp_name: '',
    loan_status: '',
    lasttransaction_from: '',
    lasttransaction_to: '',
  });

  const [companies, setCompanies] = useState([]);
  const [branches, setBranches] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loans, setLoans] = useState([]);
  const [loanPosts, setLoanPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const companyData = await getRequest(ServerConfig.url, PAYMCOMPANIES);
        setCompanies(companyData.data);

        const branchData = await getRequest(ServerConfig.url, PAYMBRANCHES);
        setBranches(branchData.data);

       const employeeData = await getRequest(ServerConfig.url, PAYMEMPLOYEE);
        setEmployees(employeeData.data);

        const LoanData = await getRequest(ServerConfig.url, PAYMLOAN);
        setLoans(LoanData.data);

        const loanPostData = await getRequest(ServerConfig.url, LOANPOST);
        setLoanPosts(loanPostData.data);


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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await postRequest(ServerConfig.url, SAVE, {
        query: `INSERT INTO [dbo].[LoanEntry]
                   ([pn_CompanyID], [pn_BranchID], [pn_EmployeeID], [Loan_AutoID], [fn_LoanID], [san_date], [d_effdate], [Loan_Amt], [InstalmentAmt], [Instalmentcount], [Balance_Amt], [c_status], [loan_name], [loan_process], [loan_calculation], [comments], [loan_appid], [interest], [tot_interest_amt], [emp_name], [loan_status], [lasttransaction_from], [lasttransaction_to])
                VALUES
                   (${formData.pn_CompanyID}, ${formData.pn_BranchID}, ${formData.pn_EmployeeID}, '${formData.Loan_AutoID}', ${formData.fn_LoanID}, '${formData.san_date}', '${formData.d_effdate}', ${formData.Loan_Amt}, ${formData.InstalmentAmt}, ${formData.Instalmentcount}, ${formData.Balance_Amt}, '${formData.c_status}', '${formData.loan_name}', '${formData.loan_process}', '${formData.loan_calculation}', '${formData.comments}', '${formData.loan_appid}', ${formData.interest}, ${formData.tot_interest_amt}, '${formData.emp_name}', '${formData.loan_status}', '${formData.lasttransaction_from}', '${formData.lasttransaction_to}')`
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
      pn_CompanyID: '',
      pn_BranchID: '',
      pn_EmployeeID: '',
      Loan_AutoID: '',
      fn_LoanID: '',
      san_date: '',
      d_effdate: '',
      Loan_Amt: '',
      InstalmentAmt: '',
      Instalmentcount: '',
      Balance_Amt: '',
      c_status: '',
      loan_name: '',
      loan_process: '',
      loan_calculation: '',
      comments: '',
      loan_appid: '',
      interest: '',
      tot_interest_amt: '',
      emp_name: '',
      loan_status: '',
      lasttransaction_from: '',
      lasttransaction_to: '',
    });
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Loan Entry Form
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            
            {/* Company Name Field */}
            <Grid item xs={12} sm={6}>
                        <FormControl fullWidth required>
                            <InputLabel>Company Name</InputLabel>
                            <Select
                                name="pn_CompanyID"
                                value={formData.pn_CompanyID}
                                onChange={handleChange}
                            >
                                {companies.map(company => (
                                    <MenuItem key={company.pnCompanyId} value={company.pnCompanyId}>
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
                                {branches.map(branch => (
                                    <MenuItem key={branch.pnBranchId} value={branch.pnBranchId}>
                                        {branch.branchName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    {/* Employee Name Field */}
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth required>
                            <InputLabel>Employee ID</InputLabel>
                            <Select
                                name="pn_EmployeeID"
                                value={formData.pn_EmployeeID}
                                onChange={handleChange}
                            >
                                {employees.map(employee => (
                                    <MenuItem key={employee.pnEmployeeId} value={employee.pnEmployeeId}>
                                        {employee.pnEmployeeId}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>


            <Grid item xs={12} sm={6}>
              <TextField
                label="Loan Auto ID"
                name="Loan_AutoID"
                value={formData.Loan_AutoID}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>


            {/* Loan Name Field */}
            <Grid item xs={12} sm={6}>
                        <FormControl fullWidth required>
                            <InputLabel>Loan ID</InputLabel>
                            <Select
                                name="fn_LoanID"
                                value={formData.fn_LoanID}
                                onChange={handleChange}
                            >
                                {loans.map(loan => (
                                    <MenuItem key={loan.fnLoanId} value={loan.fnLoanId}>
                                        {loan.pnLoanId}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

            

            <Grid item xs={12} sm={6}>
              <TextField
                name="san_date"
                label="Sanction Date"
                type="datetime-local"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={formData.san_date}
                onChange={(e) => handleChange({ target: { name: 'san_date', value: e.target.value } })}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="d_effdate"
                label="Effective Date"
                type="datetime-local"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={formData.d_effdate}
                onChange={(e) => handleChange({ target: { name: 'd_effdate', value: e.target.value } })}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Loan Amount"
                name="Loan_Amt"
                value={formData.Loan_Amt}
                onChange={handleChange}
                type="number"
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Instalment Amount"
                name="InstalmentAmt"
                value={formData.InstalmentAmt}
                onChange={handleChange}
                type="number"
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Instalment Count"
                name="Instalmentcount"
                value={formData.Instalmentcount}
                onChange={handleChange}
                type="number"
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Balance Amount"
                name="Balance_Amt"
                value={formData.Balance_Amt}
                onChange={handleChange}
                type="number"
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Status"
                name="c_status"
                value={formData.c_status}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Loan Name"
                name="loan_name"
                value={formData.loan_name}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Loan Process"
                name="loan_process"
                value={formData.loan_process}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Loan Calculation"
                name="loan_calculation"
                value={formData.loan_calculation}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Comments"
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            

            <Grid item xs={12} sm={6}>
              <TextField
                label="Loan App ID"
                name="loan_appid"
                value={formData.loan_appid}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Interest"
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                type="number"
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Total Interest Amount"
                name="tot_interest_amt"
                value={formData.tot_interest_amt}
                onChange={handleChange}
                type="number"
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Employee Name"
                name="emp_name"
                value={formData.emp_name}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Loan Status"
                name="loan_status"
                value={formData.loan_status}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="lasttransaction_from"
                label="Last Transaction From"
                type="datetime-local"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={formData.lasttransaction_from}
                onChange={(e) => handleChange({ target: { name: 'lasttransaction_from', value: e.target.value } })}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="lasttransaction_to"
                label="Last Transaction To"
                type="datetime-local"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={formData.lasttransaction_to}
                onChange={(e) => handleChange({ target: { name: 'lasttransaction_to', value: e.target.value } })}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 3 }}>
            <Grid item>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
            <Grid item>
              <Button type="button" variant="contained" color="secondary" onClick={handleReset}>
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default LoanEntryForm;
