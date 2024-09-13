import React, { useState, useEffect } from "react";
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { REPORTS } from '../../serverconfiguration/controllers';
import { postRequest } from '../../serverconfiguration/requestcomp';
import { 
  Table, 
  TableContainer,
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Stack,
  Paper,
  Avatar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EmployeeProfilePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [profiles, setProfiles] = useState([]);
  const navigate = useNavigate();

  // Function to fetch employee profiles data
  const fetchProfiles = async () => {
    try {
      const query = `SELECT * FROM paym_employee_profile1;`;

      const response = await postRequest(ServerConfig.url, REPORTS, { query });

      if (response.status === 200) {
        console.log('Fetched employee profiles:', response.data);
        setProfiles(response.data || []);
      } else {
        console.error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching employee profiles data:', error);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  // Filter profiles based on search term
  const filteredProfiles = profiles.filter(profile => {
    return Object.values(profile).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleAddNewProfileClick = () => {
    navigate('/EmployeeProfileForm');
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'left' }}>
        Employee Profiles
      </Typography>
      <Typography variant="body2" gutterBottom>
        All Employee Profile Lists
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center" mb={2} sx={{ justifyContent: "space-between" }}>
        <TextField
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: 300 }} // adjust the width value as needed
        />

        <Button variant="contained" color="primary" onClick={handleAddNewProfileClick}>
          Add New Profile
        </Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: "lightgrey" }}>
            <TableRow>
              <TableCell sx={{ fontSize: 15, fontWeight: 'bold' }}>Company ID</TableCell>
              <TableCell sx={{ fontSize: 15, fontWeight: 'bold' }}>Branch ID</TableCell>
              <TableCell sx={{ fontSize: 15, fontWeight: 'bold' }}>Employee ID</TableCell>
              <TableCell sx={{ fontSize: 15, fontWeight: 'bold' }}>Division ID</TableCell>
              <TableCell sx={{ fontSize: 15, fontWeight: 'bold' }}>Department ID</TableCell>
              <TableCell sx={{ fontSize: 15, fontWeight: 'bold' }}>Designation ID</TableCell>
              <TableCell sx={{ fontSize: 15, fontWeight: 'bold' }}>Grade ID</TableCell>
              <TableCell sx={{ fontSize: 15, fontWeight: 'bold' }}>Shift ID</TableCell>
              <TableCell sx={{ fontSize: 15, fontWeight: 'bold' }}>Category ID</TableCell>
              <TableCell sx={{ fontSize: 15, fontWeight: 'bold' }}>Job Status ID</TableCell>
              <TableCell sx={{ fontSize: 15, fontWeight: 'bold' }}>Level ID</TableCell>
              <TableCell sx={{ fontSize: 15, fontWeight: 'bold' }}>Project Site ID</TableCell>
              <TableCell sx={{ fontSize: 15, fontWeight: 'bold' }}>Date</TableCell>
              <TableCell sx={{ fontSize: 15, fontWeight: 'bold' }}>Reason</TableCell>
              <TableCell sx={{ fontSize: 15, fontWeight: 'bold' }}>Department</TableCell>
              <TableCell sx={{ fontSize: 15, fontWeight: 'bold' }}>Father's Name</TableCell>
              <TableCell sx={{ fontSize: 15, fontWeight: 'bold' }}>Profile Image</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProfiles.map((profile) => (
              <TableRow key={profile.pn_EmployeeID}>
                <TableCell>{profile.pn_CompanyID}</TableCell>
                <TableCell>{profile.pn_BranchID}</TableCell>
                <TableCell>{profile.pn_EmployeeID}</TableCell>
                <TableCell>{profile.pn_DivisionId}</TableCell>
                <TableCell>{profile.pn_DepartmentId}</TableCell>
                <TableCell>{profile.pn_DesingnationId}</TableCell>
                <TableCell>{profile.pn_GradeId}</TableCell>
                <TableCell>{profile.pn_ShiftId}</TableCell>
                <TableCell>{profile.pn_CategoryId}</TableCell>
                <TableCell>{profile.pn_JobStatusId}</TableCell>
                <TableCell>{profile.pn_LevelID}</TableCell>
                <TableCell>{profile.pn_projectsiteID}</TableCell>
                <TableCell>{new Date(profile.d_Date).toLocaleDateString()}</TableCell>
                <TableCell>{profile.v_Reason}</TableCell>
                <TableCell>{profile.r_Department}</TableCell>
                <TableCell>{profile.father_name}</TableCell>
                <TableCell>
                  {profile.Emp_Profile_Image ? (
                    <Avatar src={`data:image/jpeg;base64,${profile.Emp_Profile_Image}`} alt="Profile Image" />
                  ) : (
                    'No Image'
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default EmployeeProfilePage;
