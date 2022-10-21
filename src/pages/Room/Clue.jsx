import React from 'react'
import {Box, Card, CardActionArea, CardContent, ListItem, Stack, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";

const StyledListItem = styled(ListItem)(({theme}) => ({
    [theme.breakpoints.down('md')]: {
        sm: '0',
    },
    [theme.breakpoints.up('md')]: {
        md: '4'
    }
}))

function  Clue({room_num, clue}) {
 return (
     <StyledListItem>
         <Stack  direction="column"  justifyContent="space-between">
             <Box sx={{textAlign:'center',mb:4, color:'dark.main'}}>
                 <Typography component="h2" variant="h4" >
                     Salle n°{room_num}
                 </Typography>
             </Box>
             <Card>
                 <CardActionArea>
                     <CardContent sx={{textAlign:'center',my:4}}>
                         {clue}
                     </CardContent>
                 </CardActionArea>
             </Card>
         </Stack>
     </StyledListItem>
 )
}

export default Clue