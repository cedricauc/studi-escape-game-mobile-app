import React, {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'
import api from "../../services/api";
import {Box, Container, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import {theme} from "../../utils/style/theme";

const StyledContainer = styled(Container)(() => ({
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: theme.palette.primary.main
}))

const StyledBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    height: '100%',
}))

function Room() {
    const location = useLocation()

    const id = parseInt(location.pathname.split('/')[2])

    const [game, setGame] = useState('');

    useEffect(() => {
        // 👇️ set isMounted to true
        let isMounted = true;

        async function fetchData() {
            await api.get('/games/'+ id + '/',
            ).then(
                result => {
                    setGame(result.data)
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

    return(
        <Box component="main" position="static">
            <StyledContainer position="static">
                <Typography>
                    {game.start_time}
                </Typography>
            </StyledContainer>
        </Box>
    )
}

export default Room