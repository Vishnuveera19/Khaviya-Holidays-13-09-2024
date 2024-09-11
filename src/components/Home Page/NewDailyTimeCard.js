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
    { empCode: '001734', empName: 'P. ArunKumar', date: '01/02/2019', day: 'Fri', shiftCode: 'G', inTime: '08:24', breakOut: '', breakIn: '', outTime: '17:57', otHrs: '', leaveName: '', status: 'XX' },
    { empCode: 'SVT0005', empName: 'BalaMurugan', date: '01/02/2019', day: 'Fri', shiftCode: 'G', inTime: '08:31', breakOut: '', breakIn: '', outTime: '17:40', otHrs: '', leaveName: '', status: 'XX' },
    // Add more data rows here
];

const NewDailyTimeCard1 = () => {
    

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom align="left" style={{ fontWeight: 'bold' }}>
                Daily Time Card
            </Typography>
            

            <TableContainer component={Paper} sx={{ mt: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Employee Code</TableCell>
                            <TableCell>Employee Name</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Day</TableCell>
                            <TableCell>Shift Code</TableCell>
                            <TableCell>In Time</TableCell>
                            <TableCell>Break Out</TableCell>
                            <TableCell>Break In</TableCell>
                            <TableCell>Out Time</TableCell>
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
                                <TableCell>{row.inTime}</TableCell>
                                <TableCell>{row.breakOut}</TableCell>
                                <TableCell>{row.breakIn}</TableCell>
                                <TableCell>{row.outTime}</TableCell>
                                <TableCell>{row.otHrs}</TableCell>
                                <TableCell>{row.leaveName}</TableCell>
                                <TableCell>{row.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            
        </Box>
    );
};

export default NewDailyTimeCard1;
