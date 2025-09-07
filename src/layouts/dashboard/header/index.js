// import PropTypes from 'prop-types';
// // @mui
// import { styled } from '@mui/material/styles';
// import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
// // utils
// import { bgBlur } from '../../../utils/cssStyles';
// // components
// import Iconify from '../../../components/iconify';
// //
// import Searchbar from './Searchbar';
// import AccountPopover from './AccountPopover';
// import LanguagePopover from './LanguagePopover';
// import NotificationsPopover from './NotificationsPopover';

// // ----------------------------------------------------------------------

// const NAV_WIDTH = 280;

// const HEADER_MOBILE = 64;

// const HEADER_DESKTOP = 92;

// const StyledRoot = styled(AppBar)(({ theme }) => ({
//   ...bgBlur({ color: theme.palette.background.default }),
//   boxShadow: 'none',
//   [theme.breakpoints.up('lg')]: {
//     width: `calc(100% - ${NAV_WIDTH + 1}px)`,
//   },
// }));

// const StyledToolbar = styled(Toolbar)(({ theme }) => ({
//   minHeight: HEADER_MOBILE,
//   [theme.breakpoints.up('lg')]: {
//     minHeight: HEADER_DESKTOP,
//     padding: theme.spacing(0, 5),
//   },
// }));

// // ----------------------------------------------------------------------

// Header.propTypes = {
//   onOpenNav: PropTypes.func,
// };

// export default function Header({ onOpenNav }) {
//   return (
//     <StyledRoot>
//       <StyledToolbar>
//         <IconButton
//           onClick={onOpenNav}
//           sx={{
//             mr: 1,
//             color: 'text.primary',
//             display: { lg: 'none' },
//           }}
//         >
//           <Iconify icon="eva:menu-2-fill" />
//         </IconButton>

//         <Searchbar />
//         <Box sx={{ flexGrow: 1 }} />

//         <Stack
//           direction="row"
//           alignItems="center"
//           spacing={{
//             xs: 0.5,
//             sm: 1,
//           }}
//         >
//           <LanguagePopover />
//           <NotificationsPopover />
//           <AccountPopover />
//         </Stack>
//       </StyledToolbar>
//     </StyledRoot>
//   );
// }


import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// components
import Iconify from '../../../components/iconify';
//
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import NotificationsPopover from './NotificationsPopover';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {
  return (
    <StyledRoot>
      <StyledToolbar>
        {/* Hamburger for mobile */}
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        {/* Search Bar */}
        <Searchbar />

        {/* Navigation links - fill the whole gap */}
        <Stack
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          sx={{
            flexGrow: 1,
            display: { xs: 'none', sm: 'flex' }, // hidden on extra-small
          }}
        >
          {['Home', 'About', 'Contact', 'Details'].map((text) => (
            <Typography
              key={text}
              variant="h6"
              sx={{
              
                color: 'black',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'color 0.3s',
                '&:hover': {
                  color: 'blue',
                },
              }}
            >
              {text}
            </Typography>
          ))}
        </Stack>

        {/* Right side icons */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <LanguagePopover />
          <NotificationsPopover />
          <AccountPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
