import { Box, CircularProgress, Typography } from '@mui/material';
import PropTypes from 'prop-types';

function Loading({ message = 'טוען...' }) {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '200px'
    }}>
      <CircularProgress />
      <Typography sx={{ mt: 2 }}>{message}</Typography>
    </Box>
  );
}

Loading.propTypes = {
  message: PropTypes.string
};

export default Loading; 