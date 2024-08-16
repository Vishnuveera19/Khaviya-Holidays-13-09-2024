import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Container } from "@material-ui/core";
import Navbar from "../Home Page/Navbar";
import Sidenav from "../Home Page/Sidenav";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    container: {
        maxWidth: '1000px',
        width: '100%',
        margin: 'auto',
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2),
        },
    },
}));

export default function CompanyMasters() {
  const classes = useStyles();

  return (
    <Grid container>
      {/* Navbar and Sidebar */}
      <Grid item xs={12}>
        <div style={{ backgroundColor: "#fff" }}>
          <Navbar />
          <Box height={30} />
          <Box sx={{ display: "flex" }}>
            <Sidenav />
            <Grid item xs={12} sm={10} md={9} lg={8} xl={7} style={{ marginLeft: "auto", marginRight: "auto" }}>
              <Container className={classes.container}>
                <Box sx={{ p: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <FormControlLabel control={<Checkbox />} label="Company" />
                    <FormControlLabel control={<Checkbox />} label="Branch" />
                  </Box>

                  <Box
                    sx={{
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 1,
                      p: 8,
                      mb: 8,
                      width: "100%",
                      maxWidth: "1000px",
                      margin: "auto",
                      justifyContent: "center",
                    }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Typography variant="h6" gutterBottom sx={{ flex: 1 }}>
                        Enter Company Details
                      </Typography>
                      <Button variant="outlined" color="primary">
                        View Existing Details
                      </Button>
                    </Box>

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={3}>
                        <TextField
                          label="Company name"
                          variant="outlined"
                          size="small"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <TextField
                          label="Address Line 1"
                          variant="outlined"
                          size="small"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <TextField
                          label="Address Line 2"
                          variant="outlined"
                          size="small"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <TextField
                          label="City"
                          variant="outlined"
                          size="small"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <TextField
                          label="State"
                          variant="outlined"
                          size="small"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <TextField
                          label="Country"
                          variant="outlined"
                          size="small"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <TextField
                          label="Phone No"
                          variant="outlined"
                          size="small"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <TextField
                          label="Email id"
                          variant="outlined"
                          size="small"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <TextField
                          label="Email"
                          variant="outlined"
                          size="small"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <TextField
                          label="Pf No"
                          variant="outlined"
                          size="small"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <TextField
                          label="ESIC"
                          variant="outlined"
                          size="small"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <TextField
                          label="Start Date"
                          variant="outlined"
                          size="small"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <TextField
                          label="End Date"
                          variant="outlined"
                          size="small"
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                    <Stack
                      direction="row"
                      justifyContent="flex-end"
                      spacing={2}
                      sx={{ mt: 2 }}>
                      <Button variant="contained">Add More Fields</Button>
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                      <Switch />
                      <Typography variant="body1">Automate Shift Rotation</Typography>
                    </Stack>

                    <Divider sx={{ mb: 2 }} />

                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                      <Button variant="contained" color="success">
                        Save
                      </Button>
                      <Button variant="contained" color="error">
                        Cancel
                      </Button>
                      <Button variant="contained" color="primary">
                        Reset
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Container>
            </Grid>
          </Box>
        </div>
      </Grid>
    </Grid>
  );
}
