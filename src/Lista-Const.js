import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

export default function Lista({ items, Icon }) {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

  return (
    <Container id="features2" sx={{ py: { xs: 4, sm: 7 } }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          gap: 2,
        }}
      >
        {items.map(({ name, info, user, likes }, index) => (
          <Box
            key={index}
            component={Button}
            sx={[
              (theme) => ({
                p: 2,
                height: '100%',
                width: '100%',
                justifyContent: 'flex-start',
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              }),
            ]}
          >
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 1,
                textAlign: 'left',
                textTransform: 'none',
                color: 'text.secondary',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row', // Display icon, name, and likes in a row
                  alignItems: 'center', // Vertically center icon, name, and likes
                  gap: 1,
                  textAlign: 'left',
                  textTransform: 'none',
                  color: 'text.secondary',
                }}
              >
                {Icon && <Icon />} {/* Display the passed Icon component */}
                <Typography variant="h6">{name}</Typography> {/* Name of the item */}
                
                {/* Display likes next to the name */}
                {typeof likes === 'number' && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <FavoriteBorderIcon fontSize="small" sx={{ color: 'green' }} />
                    <Typography variant="body2">{likes}</Typography>
                  </Box>
                )}
              </Box>

            </Box>

              <Typography variant="body2" color="text.primary">
                {info} {/* Display the info parameter */}
              </Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
}


// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Container from '@mui/material/Container';
// import Typography from '@mui/material/Typography';
// import ViewQuiltRoundedIcon from '@mui/icons-material/ViewQuiltRounded';
// import PublicIcon from '@mui/icons-material/Public';
// import InsightsIcon from '@mui/icons-material/Insights';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

// export default function Lista({ items, Icon }) {
//   const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

//   return (
//     <Container id="features" sx={{ py: { xs: 4, sm: 7 } }}>
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           width: '100%',
//           gap: 2,
//         }}
//       >
//         {items.map(({ name, info, user, likes, dislikes }, index) => (
//           <Box
//             key={index}
//             component={Button}
//             sx={[
//               (theme) => ({
//                 p: 2,
//                 height: '100%',
//                 width: '100%',
//                 justifyContent: 'flex-start',
//                 '&:hover': {
//                   backgroundColor: theme.palette.action.hover,
//                 },
//               }),
//             ]}
//           >
//             <Box
//               sx={{
//                 width: '100%',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'flex-start',
//                 gap: 1,
//                 textAlign: 'left',
//                 textTransform: 'none',
//                 color: 'text.secondary',
//               }}
//             >
//             <Box
//               sx={{
//                 width: '100%',
//                 display: 'flex',
//                 flexDirection: 'row', // Display icon and name in a row
//                 alignItems: 'center', // Vertically center icon and name
//                 gap: 1,
//                 textAlign: 'left',
//                 textTransform: 'none',
//                 color: 'text.secondary',
//             }}
//             >
//               {Icon && <Icon />} {/* Display the passed Icon component */}
//               <Typography variant="h6">{name}</Typography> {/* Name of the item */}
//                     {/* Optional Likes/Dislikes */}
//                     {typeof likes === 'number' && (
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//                             <FavoriteBorderIcon fontSize="small" sx={{ color: 'green' }} /> 
//                             <Typography variant="body2">{likes}</Typography>
//                         </Box>
//                         )}

                        
//               {/* <PublicIcon /> */}
//             </Box>
//                 <Typography variant="body2" color="text.primary">
//                   {info} {/* Display the info parameter */}
//                 </Typography>
//             </Box>
//           </Box>
//         ))}
//       </Box>
//     </Container>
//   );
// }
