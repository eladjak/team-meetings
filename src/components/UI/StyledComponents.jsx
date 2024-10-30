import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const StyledEventBox = styled(Box)`
  padding: 4px;
  border-radius: 4px;
  background-color: ${props => props.theme.palette.primary.light};
  color: ${props => props.theme.palette.primary.contrastText};
  
  &:hover {
    background-color: ${props => props.theme.palette.primary.main};
  }
`; 