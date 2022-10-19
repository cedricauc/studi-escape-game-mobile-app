import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {Box, Card, CardActionArea, CardContent, CardMedia, Link, Typography} from "@mui/material";
import api from "../../services/api";
import {styled} from "@mui/material/styles";
import {theme} from "../../utils/style/theme";

const StyledCard = styled(Card)(() => ({
    color: theme.palette.dark.main,
    '&:hover': {
        color: theme.palette.primary.main,
    },
}))

function GameItem({id, start_time, scenario}) {
    const navigate = useNavigate()

    const handleCardClick = (id) => {
        navigate('/room/' + id, {replace: true})
    }

    const [script, setScenario] = useState('');

    const headers = 'Bearer '.concat(localStorage.getItem('access_token'));

    useEffect(() => {
        // 👇️ set isMounted to true
        let isMounted = true;

        async function fetchData() {
            await api.get(scenario,
            ).then(
                result => {
                    setScenario(result.data)
                }
            ).catch (error => {
                throw error;
            })
        }
        fetchData();

        return () => {
            // 👇️ when component unmounts, set isMounted to false
            isMounted = false;
        };

    }, [])

    const dt = new Date(start_time)
    const start_formatted = dt.getHours() + ':' + String(dt.getMinutes()).padStart(2, '0')

    return(
        <Box>
            <StyledCard>
                <CardActionArea
                    component={Link}
                    onClick={() => handleCardClick(id)}
                    sx={{
                        display: 'flex',
                        backgroundColor: theme.palette.secondary.main,
                    }}
                >
                    <CardContent>
                        <Typography>
                            {script.title}
                        </Typography>
                        <Typography>
                            {start_formatted}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </StyledCard>
        </Box>
    )
}

export default GameItem