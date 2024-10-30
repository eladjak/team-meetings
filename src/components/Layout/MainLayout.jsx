import { Box, AppBar, Toolbar, Typography, Container } from '@mui/material';
import PropTypes from 'prop-types';

function MainLayout({ children }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            ניהול פגישות צוות
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container component="main" sx={{ 
        flex: 1, 
        py: 4,
        display: 'flex',
        flexDirection: 'column'
      }}>
        {children}
      </Container>

      <Box component="footer" sx={{ 
        py: 3, 
        px: 2, 
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[200]
      }}>
        <Container maxWidth="sm">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} מערכת ניהול פגישות צוות
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout; 