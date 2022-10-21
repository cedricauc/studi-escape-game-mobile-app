import React from 'react'
import { useNavigate } from 'react-router-dom';
import {Box, Card, CardActionArea, CardContent, Link, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import {theme} from "../../utils/style/theme";

const StyledCard = styled(Card)(() => ({
    color: theme.palette.dark.main,
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.light.main,
    },
    '&.active': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.light.main,
    },
    display: 'flex',
    borderRadius: 20,
    margin: 5,
    padding: 5,

}))

const StyledTypography = styled(Typography)(() => ({
    marginBottom: '15px'
}))

function GameItem({id, in_progress, is_complete, game_start_time, scenario_id, scenario_title}) {
    const navigate = useNavigate()

    const handleCardClick = () => {
         if(!is_complete) {
             navigate('/room/' + id + '/' + scenario_id, {replace: true})
         }
    }

    const dt = new Date(game_start_time)
    const start_formatted = dt.getHours() + ':' + String(dt.getMinutes()).padStart(2, '0')

    return(
        <Box>
            <StyledCard sx={{ backgroundColor: is_complete ? 'info.main' : 'light.main'}}>
                <CardActionArea
                    component={Link}
                    onClick={() => handleCardClick()}
                >
                    <CardContent>
                        <StyledTypography component="h2" variant="h5">
                            {scenario_title}
                        </StyledTypography>
                        <StyledTypography component="h3" variant="h4">
                            {start_formatted}
                        </StyledTypography>
                    </CardContent>
                </CardActionArea>
            </StyledCard>
        </Box>
    )
}

export default GameItem