import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';

function DashboardItem(props) {
  return (
    <Box
      sx={{
        m: 2,
        p: 2,
        alignContent: "center",
        backgroundColor: props.backgroundColor,
        borderRadius: "20px",
        width: 250,
        height: 150,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        {props.value}
      </Typography>
      <Typography variant="body2" sx={{ textAlign: "center" }}>
        {props.label}
      </Typography>
      <IconButton aria-label="icon-button" sx={{ ml: 2 }}>
        {props.icon}
      </IconButton>
    </Box>
  );
}

export default DashboardItem;