import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import './Spinner.css';

export function Spinner() {
    return (
        <Box className="spinner-container">
            <CircularProgress size={60} />
        </Box>
    );
}