import React, { useState } from 'react';
import {
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    Paper,
    Grid,
    InputAdornment
} from '@mui/material';

const data = [
    { empCode: '001734', empName: 'P. ArunKumar', date: '01/02/2019', day: 'Fri', shiftCode: 'G', startTime: '08:24', breakTime: '', breakTime2: '', endTime: '17:57', otHrs: '', leaveName: '', status: 'XX' },
    { empCode: 'SVT0005', empName: 'BalaMurugan', date: '01/02/2019', day: 'Fri', shiftCode: 'G', startTime: '08:31', breakTime: '', breakTime2: '', endTime: '17:40', otHrs: '', leaveName: '', status: 'XX' },
    // Add more data rows here
];

const NewDailyTimeCard1 = () => {
    const [attendanceDate, setAttendanceDate] = useState('');

    const handleAttendanceDateChange = (event) => {
        setAttendanceDate(event.target.value);
    };

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
                Daily Time Card
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="employee-type">Employee Type</InputLabel>
                        <Select
                            labelId="employee-type-label"
                            id="employee-type"
                            label="Employee Type"
                        >
                            <MenuItem value="all">Month</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="selection-type">Selection Type</InputLabel>
                        <Select
                            labelId="selection-type-label"
                            id="selection-type"
                            label="Selection Type"
                        >
                            <MenuItem value="all">All</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={3}>
                    <Button variant="contained">Import From Time Machine</Button>
                </Grid>
                </Grid>

<Grid container spacing={2} mt={2} alignItems="center">
                <Grid item xs={3}>
                    <TextField
                        fullWidth
                        label="Attendance Date"
                        type="date"
                        value={attendanceDate}
                        onChange={handleAttendanceDateChange}
                        InputLabelProps={{ shrink: true }} // Ensures label does not overlap
                    />
                </Grid>


                <Grid item xs={3}>
                    <Button variant="contained">View</Button>
                </Grid>
            </Grid>

            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Emp Code</TableCell>
                            <TableCell>Emp Name</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Day</TableCell>
                            <TableCell>Shift Code</TableCell>
                            <TableCell>Start Time</TableCell>
                            <TableCell>Break Time</TableCell>
                            <TableCell>Break Time (I)</TableCell>
                            <TableCell>End Time</TableCell>
                            <TableCell>OT (Hrs)</TableCell>
                            <TableCell>Leave Name</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.empCode}</TableCell>
                                <TableCell>{row.empName}</TableCell>
                                <TableCell>{row.date}</TableCell>
                                <TableCell>{row.day}</TableCell>
                                <TableCell>{row.shiftCode}</TableCell>
                                <TableCell>{row.startTime}</TableCell>
                                <TableCell>{row.breakTime}</TableCell>
                                <TableCell>{row.breakTime2}</TableCell>
                                <TableCell>{row.endTime}</TableCell>
                                <TableCell>{row.otHrs}</TableCell>
                                <TableCell>{row.leaveName}</TableCell>
                                <TableCell>{row.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                    <Grid item>
                        <Button variant="contained">Save</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained">Edit</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained">Clear</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained">Leave App</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained">Reports</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained">Show</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained">Saturday Half</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained">Exit</Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default NewDailyTimeCard1;
