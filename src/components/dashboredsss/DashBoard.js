import React, { useState, useEffect } from 'react';
import PeopleIcon from '@mui/icons-material/People';
import PregnantWomanIcon from '@mui/icons-material/PregnantWoman';
import "../../App.css"
import { createMuiTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import "../../index.css"
import EventIcon from '@mui/icons-material/Event';
import CancelIcon from '@mui/icons-material/Cancel';
import ScheduleIcon from '@mui/icons-material/Schedule';
import TimerIcon from '@mui/icons-material/Timer';
import DashboardIcon from '@mui/icons-material/Dashboard'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from 'recharts';

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Grid,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  InputAdornment,
  SvgIcon,
  Tooltip,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import {
  Person as PersonIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  AttachMoney as AttachMoneyIcon,
  CalendarToday as CalendarTodayIcon,
  LocalOffer as LocalOfferIcon,
  ExitToApp as ExitToAppIcon,
  AccessTime as AccessTimeIcon,
  Speed as SpeedIcon,
  SignalCellularConnectedNoInternet0Bar as SignalCellularConnectedNoInternet0BarIcon,
  SignalCellularNull as SignalCellularNullIcon,
  Computer as ComputerIcon,
  Smartphone as SmartphoneIcon,
  BarChart as BarChartIcon,
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon,
  AssignmentInd as AssignmentIndIcon,
  Group as GroupIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  AddCircleOutline as AddCircleOutlineIcon,
} from '@mui/icons-material';
import { grey } from '@mui/material/colors';
import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { REPORTS } from '../../serverconfiguration/controllers';
import { useLocation } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import GraphCheckBox1 from './GraphCheckBox';
import Masonry from '@mui/lab/Masonry';


const theme = createMuiTheme({
  typography: {
    fontSize: 10,
    // Set the font size to 12px
  },
});

const Dashboard = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [absentData, setAbsentData] = React.useState({ Absent: 0 });
  const [leaveData, setLeaveData] = React.useState({ Leave: 0 });
  const [halfDayData, setHalfDayData] = React.useState({ HalfDay: 0 });
  const [presentData, setPresentData] = React.useState({ Present: 0 });
  const [totalEmployeesData, setTotalEmployeesData] = React.useState({ TotalEmployees: 0 });
  const [selectAllCounts, setSelectAllCounts] = useState(false);
const [selectAllGraphs, setSelectAllGraphs] = useState(false);

  const [openDialog, setOpenDialog] = React.useState(false);

 

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };



  useEffect(() => {
    async function getAbsentData() {
      try {
        const query = `SELECT COUNT(*) as Absent FROM [dbo].[time_card] WHERE CAST([dates] AS DATE) = CAST(GETDATE() AS DATE) AND [status] = 'A'`;
        const response = await postRequest(ServerConfig.url, REPORTS, { query });
        console.log('API Response:', response); // Log the API response
        if (response.data) {
          console.log(response.data[0])
          setAbsentData({ Absent: response.data[0].Absent });
        } else {
          console.error('No absent count found in API response');
        }
      } catch (error) {
        console.error('Error fetching absent data:', error);
      }
    }
    getAbsentData();
  }, []);

  useEffect(() => {
    async function getLeaveData() {
      try {
        const query = `SELECT COUNT(*) as Leave FROM [dbo].[time_card] WHERE CAST([dates] AS DATE) = CAST(GETDATE() AS DATE) AND [status] = 'L'`;
        const response = await postRequest(ServerConfig.url, REPORTS, { query });
        console.log('API Response:', response); // Log the API response
        if (response.data) {
          console.log(response.data[0])
          setLeaveData({ Leave: response.data[0].Leave });
        } else {
          console.error('No leave count found in API response');
        }
      } catch (error) {
        console.error('Error fetching leave data:', error);
      }
    }
    getLeaveData();
  }, []);

  useEffect(() => {
    async function getHalfDayData() {
      try {
        const query = `SELECT COUNT(*) as HalfDay FROM [dbo].[time_card] WHERE CAST([dates] AS DATE) = CAST(GETDATE() AS DATE) AND [status] = 'H'`;
        const response = await postRequest(ServerConfig.url, REPORTS, { query });
        console.log('API Response:', response); // Log the API response
        if (response.data) {
          console.log(response.data[0])
          setHalfDayData({ HalfDay: response.data[0].HalfDay });
        } else {
          console.error('No half-day count found in API response');
        }
      } catch (error) {
        console.error('Error fetching half-day data:', error);
      }
    }
    getHalfDayData();
  }, []);

  useEffect(() => {
    async function getPresentData() {
      try {
        const query =  `SELECT COUNT(*) as Present FROM [dbo].[time_card] WHERE CAST([dates] AS DATE) = CAST(GETDATE() AS DATE) AND [status] = 'P'`;
        const response = await postRequest(ServerConfig.url, REPORTS, { query });
        console.log('API Response:', response); // Log the API response
        if (response.data) {
          console.log(response.data[0])
          setPresentData({ Present: response.data[0].Present });
        } else {
          console.error('No present count found in API response');
        }
      } catch (error) {
        console.error('Error fetching present data:', error);
      }
    }
    getPresentData();
  }, []);

  useEffect(() => {
    async function getTotalEmployeesData() {
      try {
        const query = `SELECT COUNT(*) AS TotalEmployees FROM [dbo].[paym_Employee]`;
        const response = await postRequest(ServerConfig.url, REPORTS, { query });
        console.log('API Response:', response); // Log the API response
        if (response.data) {
          console.log(response.data[0])
          setTotalEmployeesData({ TotalEmployees: response.data[0].TotalEmployees });
        } else {
          console.error('No total employees count found in API response');
        }
      } catch (error) {
        console.error('Error fetching total employees data:', error);
      }
    }
    getTotalEmployeesData();
  }, []);


  const [permissionData, setPermissionData] = useState({ Permission: 0 });

  useEffect(() => {
    async function getPermissionData() {
      try {
        const query = `SELECT COUNT(*) as Permission FROM [dbo].[time_card] WHERE CAST([dates] AS DATE) = CAST(GETDATE() AS DATE) AND [status] = 'PER'`;
        const response = await postRequest(ServerConfig.url, REPORTS, { query });
        console.log('API Response:', response);

        if (response.data && response.data.length > 0) {
          setPermissionData({ Permission: response.data[0].Permission });
        } else {
          console.error('No permission count found in API response');
        }
      } catch (error) {
        console.error('Error fetching permission data:', error);
      }
    }
    getPermissionData();
  }, []);



  const [maternityData, setMaternityData] = useState({ Maternity: 0 });

  useEffect(() => {
    async function getMaternityData() {
      try {
        const query = `SELECT COUNT(*) as Maternity FROM [dbo].[time_card] WHERE CAST([dates] AS DATE) = CAST(GETDATE() AS DATE) AND [status] = 'M'`;
        const response = await postRequest(ServerConfig.url, REPORTS, { query });
        console.log('API Response:', response);

        if (response.data && response.data.length > 0) {
          setMaternityData({ Maternity: response.data[0].Maternity });
        } else {
          console.error('No maternity count found in API response');
        }
      } catch (error) {
        console.error('Error fetching maternity data:', error);
      }
    }
    getMaternityData();
  }, []);


  const [travelData, setTravelData] = useState({ Travel: 0 });

  useEffect(() => {
    async function getTravelData() {
      try {
        const query = `SELECT COUNT(*) as Travel FROM [dbo].[time_card] WHERE CAST([dates] AS DATE) = CAST(GETDATE() AS DATE) AND [status] = 'T'`;
        const response = await postRequest(ServerConfig.url, REPORTS, { query });
        console.log('API Response:', response);

        if (response.data && response.data.length > 0) {
          setTravelData({ Travel: response.data[0].Travel });
        } else {
          console.error('No travel count found in API response');
        }
      } catch (error) {
        console.error('Error fetching travel data:', error);
      }
    }
    getTravelData();
  }, []);


  const [workFromHomeData, setWorkFromHomeData] = useState({ WorkFromHome: 0 });

  useEffect(() => {
    async function getWorkFromHomeData() {
      try {
        const query = `SELECT COUNT(*) as WorkFromHome FROM [dbo].[time_card] WHERE CAST([dates] AS DATE) = CAST(GETDATE() AS DATE) AND [status] = 'W'`;
        const response = await postRequest(ServerConfig.url, REPORTS, { query });
        console.log('API Response:', response);

        if (response.data && response.data.length > 0) {
          setWorkFromHomeData({ WorkFromHome: response.data[0].WorkFromHome });
        } else {
          console.error('No work from home count found in API response');
        }
      } catch (error) {
        console.error('Error fetching work from home data:', error);
      }
    }
    getWorkFromHomeData();
  }, []);


  const [otData, setOtData] = useState({ OT_Count: 0 });

  useEffect(() => {
    async function getOtData() {
      try {
        const query = `SELECT COUNT(CASE WHEN ot_hrs IS NOT NULL AND CONVERT(DATE, dates) = CONVERT(DATE, GETDATE()) THEN 1 END) AS OT_Count FROM [dbo].[time_card]`;
        const response = await postRequest(ServerConfig.url, REPORTS, { query });
        console.log('API Response:', response);

        if (response.data && response.data.length > 0) {
          setOtData({ OT_Count: response.data[0].OT_Count });
        } else {
          console.error('No OT count found in API response');
        }
      } catch (error) {
        console.error('Error fetching OT data:', error);
      }
    }
    getOtData();
  }, []);





  const [absentMonthlyWiseData, setAbsentMonthlyWiseData] = useState({});

  useEffect(() => {
    async function getAbsentMonthlyWiseData() {
      try {
        const query = `SELECT MONTH(dates) AS [Month], COUNT(CASE WHEN status = 'A' THEN 1 END) AS AbsentDays FROM [dbo].[time_card] WHERE YEAR(dates) = YEAR(GETDATE()) GROUP BY MONTH(dates)`;
        const response = await postRequest(ServerConfig.url, REPORTS, { query });
        console.log('API Response:', response);
  
        if (response.data && response.data.length > 0) {
          const absentDataObj = {};
          response.data.forEach((item) => {
            absentDataObj[item.Month] = item.AbsentDays;
          });
          setAbsentMonthlyWiseData(absentDataObj);
        } else {
          console.error('No absent days data found in API response');
        }
      } catch (error) {
        console.error('Error fetching absent days data:', error);
      }
    }
    getAbsentMonthlyWiseData();
  }, []);



  const [leaveMonthlyWiseData, setLeaveMonthlyWiseData] = useState({}); // Define leaveMonthlyWiseData state variable

  useEffect(() => {
    async function getLeaveMonthlyWiseData() {
      try {
        const query = `SELECT MONTH(dates) AS [Month], COUNT(CASE WHEN status = 'L' THEN 1 END) AS LeaveDays FROM [dbo].[time_card] WHERE YEAR(dates) = YEAR(GETDATE()) GROUP BY MONTH(dates)`;
        const response = await postRequest(ServerConfig.url, REPORTS, { query });
        console.log('API Response:', response);

        if (response.data && response.data.length > 0) {
          const leaveDataObj = {};
          response.data.forEach((item) => {
            leaveDataObj[item.Month] = item.LeaveDays;
          });
          setLeaveMonthlyWiseData(leaveDataObj);
        } else {
          console.error('No leave days data found in API response');
        }
      } catch (error) {
        console.error('Error fetching leave days data:', error);
      }
    }
    getLeaveMonthlyWiseData();
  }, []);



  const [salaryMonthlyWiseData, setSalaryMonthlyWiseData] = useState({});

  useEffect(() => {
    async function getSalaryMonthlyWiseData() {
      try {
        const query = `SELECT MONTH(d_date) AS Month, SUM(NetPay) AS TotalNetPay FROM [dbo].[paym_paybill] GROUP BY MONTH(d_date)`;
        const response = await postRequest(ServerConfig.url, REPORTS, { query });
        console.log('API Response:', response);

        if (response.data && response.data.length > 0) {
          const salaryDataObj = {};
          response.data.forEach((item) => {
            salaryDataObj[item.Month] = item.TotalNetPay;
          });
          setSalaryMonthlyWiseData(salaryDataObj);
        } else {
          console.error('No salary data found in API response');
        }
      } catch (error) {
        console.error('Error fetching salary data:', error);
      }
    }
    getSalaryMonthlyWiseData();
  }, []);



  console.log('Total Employees Data:', totalEmployeesData); // Log the total employees data state

  const location = useLocation();
  const selectedOptions = location.state.selectedOptions;

  


  const filteredData = selectedOptions.flatMap((option) => {
    if (option === 'Select All Counts') {
      return [
        {
          title: 'Total Employees',
          icon: <GroupIcon sx={{ fontSize: '40px', color: 'black' }} />,
          value: totalEmployeesData.TotalEmployees,
        },
        {
          title: 'Present',
          icon: <CheckCircleIcon sx={{ fontSize: '40px', color: 'green' }} />,
          value: presentData.Present,
        },
        {
          title: 'Absent',
          icon: <CancelIcon sx={{ fontSize: '40px', color: 'red' }} />,
          value: absentData.Absent,
        },
        {
          title: 'Half-Day',
          icon: <ScheduleIcon sx={{ fontSize: '40px', color: 'orange' }} />,
          value: halfDayData.HalfDay,
        },
        {
          title: 'Leave',
          icon: <EventIcon sx={{ fontSize: '40px', color: 'blue' }} />,
          value: leaveData.Leave,
        },
        {
          title: 'Permission',
          icon: <AssignmentIndIcon sx={{ fontSize: '40px', color: 'salmon' }} />,
          value: permissionData.Permission,
        },
        {
          title: 'OT',
          icon: <TimerIcon sx={{
            fontSize: '40px',
            color: 'gold',
            width: '50px',
            height: '50px'
          }} />,
          value: otData.OT_Count,
        },
        {
          title: 'Work From Home',
          icon: <ComputerIcon sx={{ fontSize: '40px', color: 'aqua' }} />,
          value: workFromHomeData.WorkFromHome,
        },
        {
          title: 'Travel',
          icon: <LocalOfferIcon sx={{ fontSize: '40px', color: 'maroon' }} />,
          value: travelData.Travel,
        },
        {
          title: 'Maternity',
          icon: <PregnantWomanIcon sx={{ fontSize: '40px', color: 'violet' }} />,
          value: maternityData.Maternity,
        },
      ];
    } else if (option === 'Select All Graphs') {
      return [
        {
          title: 'Absent Monthly Wise',
          icon: <BarChartIcon sx={{ fontSize: '40px', color: 'black' }} />,
          data: Object.entries(absentMonthlyWiseData).map(([month, absentDays]) => ({
            month,
            absentDays,
          })),
        },
        {
          title: 'Leave Monthly Wise',
          icon: <BarChartIcon sx={{ fontSize: '40px', color: 'blue' }} />,
          data: Object.entries(leaveMonthlyWiseData).map(([month, leaveDays]) => ({
            month,
            leaveDays,
          })),
        },
        {
          title: 'Salary Monthly Wise',
          icon: <BarChartIcon sx={{ fontSize: '40px', color: 'green' }} />,
          data: Object.entries(salaryMonthlyWiseData).map(([month, salary]) => ({
            month,
            salary,
          })),
        },
      ];
        }else {
          switch (option) {
          case 'Total Employees':
        return {
          title: 'Total Employees',
          icon: <GroupIcon sx={{ fontSize: '40px', color: 'black' }} />,
          value: totalEmployeesData.TotalEmployees,
        };
      case 'Present':
        return {
          title: 'Present',
          icon: <CheckCircleIcon sx={{ fontSize: '40px', color: 'green' }} />,
          value: presentData.Present,
        };
      case 'Absent':
        return {
          title: 'Absent',
          icon: <CancelIcon sx={{ fontSize: '40px', color: 'red' }} />,
          value: absentData.Absent,
        };
      case 'Half-Day':
        return{
          title: 'Half-Day',
          icon: <ScheduleIcon sx={{ fontSize: '40px', color: 'orange' }} />,
          value: halfDayData.HalfDay, // Display the half-day count
        };
       case 'Leave':
        
        return{
          title: 'Leave',
          icon: <EventIcon sx={{ fontSize: '40px', color: 'blue' }} />,
          value: leaveData.Leave, // Display the leave count
        };
        
        
        case 'Permission':
        return{
          title: 'Permission',
          icon: <AssignmentIndIcon sx={{ fontSize: '40px', color: 'salmon' }} />,
          value: permissionData.Permission,
        };
        case 'OT':
          return {
          title: 'OT',
          icon: <TimerIcon sx={{
            fontSize: '40px',
            color: 'gold',
            width: '50px',
            height: '50px'
          }} />,
          value: otData.OT_Count,
         
        };
        case 'Work From Home':
       return {
          title: 'Work From Home',
          icon: <ComputerIcon sx={{ fontSize: '40px', color: 'aqua' }} />,
          value: workFromHomeData.WorkFromHome,
        };
        case 'Travel':
        return{
          title: 'Travel',
          icon: <LocalOfferIcon sx={{ fontSize: '40px', color: 'maroon' }} />,
          value: travelData.Travel,
        }
        
        case 'Maternity':
       return {
          title: 'Maternity',
          icon: <PregnantWomanIcon sx={{ fontSize: '40px', color: 'violet' }} />,
          value: maternityData.Maternity,
        };
        case 'Absent Monthly Wise':
          return {
            title: 'Absent Monthly Wise',
            icon: <BarChartIcon sx={{ fontSize: '40px', color: 'black' }} />,
            data: Object.entries(absentMonthlyWiseData).map(([month, absentDays]) => ({
              month,
              absentDays,
            })),
          };
          case 'Leave Monthly Wise':
            return {
              title: 'Leave Monthly Wise',
              icon: <BarChartIcon sx={{ fontSize: '40px', color: 'blue' }} />,
              data: Object.entries(leaveMonthlyWiseData).map(([month, leaveDays]) => ({
                month,
                leaveDays,
              })),
            };
          case 'Salary Monthly Wise':
            return {
              title: 'Salary Monthly Wise',
              icon: <BarChartIcon sx={{ fontSize: '40px', color: 'green' }} />,
              data: Object.entries(salaryMonthlyWiseData).map(([month, salary]) => ({
                month,
                salary,
              })),
            };
          }
    }
  }).filter((item) => item !== null);
  

  return (
    <div className="header-head">
      
      <Grid container>
        <ThemeProvider theme={theme}>
          <Grid container maxWidth="lg" margin="auto">
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              {/* Your dashboard title or logo */}
            </Grid>
            <Grid item sx={{ position: 'absolute', top: 0, right: 0 }}>
              <IconButton
                aria-label="more"
                onClick={handleDialogOpen}
              >
                <MoreVertIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Dialog open={openDialog} onClose={handleDialogClose}>
  <DialogContent>
    <GraphCheckBox1 onSave={handleDialogClose} />
  </DialogContent>
</Dialog>
              {/* Render Count fields if any are selected */}
              {filteredData.some((item) => !item.data) && (
                <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Card sx={{ width: '70%', height: '300px', bgcolor: 'rgb(236, 237, 240)', display: 'flex', justifyContent: 'center', alignItems: 'center', mx: 'auto', my: 'auto' }}>
                <Grid container spacing={2} sx={{ padding: "20px", width: '100%', height: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {filteredData.map((item, index) => (
                          // Display only count fields (not graphs)
                          !item.data && (
                            <Grid item xs={12} sm={6} md={2} lg={2} key={index}>
                              <Card sx={{ maxWidth: 130, maxHeight: 110, }}>
                                <CardContent>
                                  <Grid container alignItems="flex-start">
                                    <Typography gutterTop variant="h7" padding={'5px'} component="div" textAlign='center' >
                                      {item.title}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                      {item.icon}
                                      <Box sx={{ ml: 2 }}>
                                        <Typography variant="h8" color="text.primary">
                                          {item.value}
                                        </Typography>
                                      </Box>
                                    </Box>
                                  </Grid>
                                </CardContent>
                              </Card>
                            </Grid>
                          )
                        ))}
                      </Grid>
                    </Card>
                  </Grid>
                </Grid>
              )}
              
              {/* Render graphs if any are selected */}
              {filteredData.some((item) => item.data) && (
                <Grid container spacing={2} sx={{ marginTop: 3 }}>
                  {filteredData.map((item, index) => (
                    // Display only graph fields (not counts)
                    item.data && (
                      <Grid item xs={4} key={index}>
                        <Card sx={{ height: '90%', bgcolor: 'rgb(236, 237, 240)' }}>
                          <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                              {item.title}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <BarChartIcon sx={{ fontSize: '20px', color: 'black' }} />
                              <Typography variant="body2" color="text.secondary">
                                Jan - Dec
                              </Typography>
                            </Box>
                            <Box sx={{ height: 200, width: '80%' }}>
                              <BarChart
                                width={350}
                                height={180}
                                data={item.data}
                                margin={{
                                  top: 5,
                                  right: 30,
                                  left: 20,
                                  bottom: 5,
                                }}
                                barSize={30}
                              >
                                <CartesianGrid strokeDasharray="2 2" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                {item.title === 'Absent Monthly Wise' && (
                <Bar dataKey="absentDays" fill="#FF0000" />
              )}
              {item.title === 'Leave Monthly Wise' && (
                <Bar dataKey="leaveDays" fill="blue" />
              )}
              {item.title === 'Salary Monthly Wise' && (
                <Bar dataKey="salary" fill="#008000" />
              )}
                              </BarChart>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    )
                  ))}
                </Grid>
              )}
           
            </ThemeProvider>
          </Grid>
     
    </div>
  );
};

export default Dashboard;