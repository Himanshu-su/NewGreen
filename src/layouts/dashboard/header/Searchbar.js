import { Input, InputAdornment, Box } from '@mui/material';
import Iconify from '../../../components/iconify';

export default function Searchbar() {
  return (
    <Box
      sx={{
        width: { xs: '100%', sm: 200 }, // responsive width
        height: 50,                     // fixed height = 50px
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #ccc',
        borderRadius: 2,
        px: 1,
        backgroundColor: 'background.paper',
        mt: 2,                          // margin-top = theme.spacing(2) ≈ 16px
      }}
    >
      <Input
        fullWidth
        disableUnderline
        placeholder="Search…"
        startAdornment={
          <InputAdornment position="start">
            <Iconify
              icon="eva:search-fill"
              sx={{ color: 'text.disabled', width: 20, height: 20 }}
            />
          </InputAdornment>
        }
        sx={{
          height: '100%',               // matches parent height (50px)
          fontWeight: 'fontWeightBold',
        }}
      />
    </Box>
  );
}
