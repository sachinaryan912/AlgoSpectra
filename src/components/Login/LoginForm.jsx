import React from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  width: '100%',
  maxWidth: 400,
  margin: 'auto',
  marginTop: theme.spacing(10),
  borderRadius: '16px',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(1.5),
  borderRadius: '12px',
  fontWeight: 'bold',
  fontSize: '1rem',
}));

const LoginForm = () => {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f7fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <StyledPaper elevation={3}>
        <Typography variant="h5" component="h1" align="center" fontWeight="bold" gutterBottom>
          Welcome Back
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" mb={3}>
          Please sign in to continue
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
          />
          <StyledButton
            variant="contained"
            color="primary"
            fullWidth
          >
            Sign In
          </StyledButton>
        </Box>
      </StyledPaper>
    </Box>
  );
};

export default LoginForm;
