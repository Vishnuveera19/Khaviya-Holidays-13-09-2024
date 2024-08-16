import { Grid, Card, TextField, Button, Typography, CardContent, FormControl, FormHelperText } from '@mui/material';
import { useState, useEffect } from 'react';
import { PAYMBRANCHES, PAYMCOMPANIES, PAYMSHIFT } from '../../serverconfiguration/controllers';
import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
import { InputLabel } from '@mui/material';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { useNavigate } from 'react-router-dom';

export default function ShiftForm() {
  const navigate = useNavigate();
  const [company, setCompany] = useState([]);
  const [branch, setBranch] = useState([]);
  const [pnCompanyId, setpnCompanyId] = useState("");
  const [branchId, setBranchId] = useState("");
  const [vShiftName, setVshiftName] = useState("");
  const [vShiftFrom, setVshiftFrom] = useState("");
  const [vShiftTo, setVshiftTo] = useState("");
  const [status, setStatus] = useState("");
  const [vShiftCategory, setVshiftCategory] = useState("");

  const [companyError, setCompanyError] = useState(false);
  const [branchError, setBranchError] = useState(false);
  const [shiftNameError, setShiftNameError] = useState(false);
  const [shiftFromError, setShiftFromError] = useState(false);
  const [shiftToError, setShiftToError] = useState(false);
  const [statusError, setStatusError] = useState(false);
  const [shiftCategoryError, setShiftCategoryError] = useState(false);

  useEffect(() => {
    async function getData() {
      const data = await getRequest(ServerConfig.url, PAYMCOMPANIES);
      setCompany(data.data);
      const data1 = await getRequest(ServerConfig.url, PAYMBRANCHES);
      setBranch(data1.data);
    }
    getData();
  }, []);

  const checkExistingShift = async () => {
    const existingShifts = await getRequest(ServerConfig.url, PAYMSHIFT);
    return existingShifts.data.some(shift => 
      shift.pnCompanyId === pnCompanyId &&
      shift.branchId === branchId &&
      shift.vShiftName === vShiftName
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setCompanyError(!pnCompanyId);
    setBranchError(!branchId);
    setShiftNameError(!/^[A-Za-z0-9\s]{1,40}$/.test(vShiftName));
    setShiftFromError(!/^[A-Za-z0-9\s]{1,5}$/.test(vShiftFrom));
    setShiftToError(!/^[A-Za-z0-9\s]{1,5}$/.test(vShiftTo));
    setStatusError(!/^[A-Za-z]{1,1}$/.test(status));
    setShiftCategoryError(!/^[A-Za-z0-9\s]{1,20}$/.test(vShiftCategory));

    if (companyError || branchError || shiftNameError || shiftFromError || shiftToError || statusError || shiftCategoryError) {
      return;
    }

    const isExistingShift = await checkExistingShift();
    if (isExistingShift) {
      alert('Shift with the same name already exists for this company and branch.');
      return;
    }

    const formData = {
      pnCompanyId: pnCompanyId,
      vShiftName: vShiftName,
      vShiftFrom: vShiftFrom,
      vShiftTo: vShiftTo,
      status: status,
      branchId: branchId,
      vShiftCategory: vShiftCategory,
      pnCompany: { "pnCompanyId": pnCompanyId }
    };

    try {
      const response = await postRequest(ServerConfig.url, PAYMSHIFT, formData);
      if (response.status === 200) {
        navigate('/PaymshiftTable');
      } else {
        alert('Failed to save data');
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert('Conflict: Shift already exists.');
      } else {
        console.error('Error:', error);
        alert('Failed to save data');
      }
    }
  };

  const margin = { margin: "0 5px" };

  return (
    <div>
      <Grid style={{ padding: "80px 5px 0 5px" }}>
        <Card style={{ maxWidth: 600, margin: "0 auto" }}>
          <CardContent>
            <Typography variant='h5' color='S- Light' align='center'>Paym Shift</Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} inputlabelprops={{ shrink: true }}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={companyError}>
                    <InputLabel shrink>Company</InputLabel>
                    <select
                      name="pnCompanyId"
                      onChange={(e) => setpnCompanyId(e.target.value)}
                      style={{ height: '50px' }}
                    >
                      <option value="">Select</option>
                      {company.map((e) => <option key={e.pnCompanyId} value={e.pnCompanyId}>{e.pnCompanyId}</option>)}
                    </select>
                    {companyError && <FormHelperText style={{ color: 'red' }}>Please select a company</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={branchError}>
                    <InputLabel shrink>BranchId</InputLabel>
                    <select
                      name="pnBranchId"
                      onChange={(e) => setBranchId(e.target.value)}
                      style={{ height: '50px' }}
                      inputlabelprops={{ shrink: true }}
                    >
                      <option value="">Select</option>
                      {branch.map((e) => <option key={e.pn} value={e.pnBranchId}>{e.pnBranchId}</option>)}
                    </select>
                    {branchError && <FormHelperText style={{ color: 'red' }}>Please select a branch</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={shiftNameError}>
                    <TextField
                      name="vShiftName"
                      label="Shift Name"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setVshiftName(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                    {shiftNameError && <FormHelperText style={{ color: 'red' }}>Invalid Shift Name</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={shiftFromError}>
                    <TextField
                      name="vShiftFrom"
                      label="Shift From"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setVshiftFrom(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                    {shiftFromError && <FormHelperText style={{ color: 'red' }}>Invalid Shift From</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={shiftToError}>
                    <TextField
                      name="vShiftTo"
                      label="Shift To"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setVshiftTo(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                    {shiftToError && <FormHelperText style={{ color: 'red' }}>Invalid Shift To</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={statusError}>
                    <TextField
                      name="status"
                      label="Status"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setStatus(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                    {statusError && <FormHelperText style={{ color: 'red' }}>Invalid Status</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={shiftCategoryError}>
                    <TextField
                      name="vShiftCategory"
                      label="Shift Category"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setVshiftCategory(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                    {shiftCategoryError && <FormHelperText style={{ color: 'red' }}>Invalid Shift Category</FormHelperText>}
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={1} paddingTop={'10px'}>
                <Grid item xs={12} align="right">
                  <Button style={margin} type="reset" variant='outlined' color='primary'>RESET</Button>
                  <Button type="submit" variant='contained' color='primary'>SAVE</Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}
